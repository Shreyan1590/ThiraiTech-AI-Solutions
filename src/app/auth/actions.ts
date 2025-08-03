
'use server';

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from 'firebase/auth';
import { redirect } from 'next/navigation';
import { app } from '@/lib/firebase';
import { getApps, initializeApp, cert, App } from 'firebase-admin/app';
import { getAuth as getAdminAuth } from 'firebase-admin/auth';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import { cookies } from 'next/headers';
import { FieldValue } from 'firebase-admin/firestore';


const auth = getAuth(app);

const ADMIN_EMAIL = 'admin@thiraitech.ai';

// Centralized Admin App Initialization
let adminApp: App | undefined;
let adminDb: Firestore | undefined;

function initializeAdmin() {
    if (adminApp) {
        return { adminApp, adminDb: adminDb! };
    }

    const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
        ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
        : undefined;

    const existingApp = getApps().find(app => app.name === 'admin');
    if (existingApp) {
        adminApp = existingApp;
        adminDb = getFirestore(adminApp);
        return { adminApp, adminDb };
    }

    if (serviceAccount) {
        adminApp = initializeApp({
            credential: cert(serviceAccount),
            databaseURL: `https://${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseio.com`,
        }, 'admin');
        adminDb = getFirestore(adminApp);
        return { adminApp, adminDb };
    }
    
    // Return undefined if not configured
    return { adminApp: undefined, adminDb: undefined };
}


export async function createSessionCookie(idToken: string) {
  const { adminApp, adminDb } = initializeAdmin();
  if (!adminApp || !adminDb) {
    // If admin SDK isn't configured, we can't create a session cookie.
    // The client will rely on its local auth state.
    return { status: 'success_no_cookie' };
  }

  const adminAuth = getAdminAuth(adminApp);

  try {
    const decodedIdToken = await adminAuth.verifyIdToken(idToken, true);
    
    const userRef = adminDb.collection("users").doc(decodedIdToken.uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
        await userRef.set({
            uid: decodedIdToken.uid,
            email: decodedIdToken.email,
            displayName: decodedIdToken.name || decodedIdToken.email?.split('@')[0],
            photoURL: decodedIdToken.picture || null,
            createdAt: FieldValue.serverTimestamp(),
            lastLoginAt: FieldValue.serverTimestamp(),
        }, { merge: true });
    } else {
        await userRef.update({
            lastLoginAt: FieldValue.serverTimestamp()
        });
    }

    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
    const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });
    cookies().set('session', sessionCookie, { maxAge: expiresIn, httpOnly: true, secure: true });
    
    if (decodedIdToken.email === ADMIN_EMAIL) {
        return { status: 'success', isAdmin: true };
    }

    return { status: 'success', isAdmin: false };
  } catch (error: any) {
    console.error("Session cookie creation failed:", error);
    return { status: 'error', message: error.message };
  }
}

export async function signup(previousState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
      return { error: 'Email and password are required.'};
  }

  if (email === ADMIN_EMAIL) {
      return { error: 'This email is reserved for administration.' };
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const { adminDb } = initializeAdmin();
    if(adminDb) {
        await adminDb.collection("users").doc(user.uid).set({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || user.email?.split('@')[0],
            photoURL: user.photoURL,
            createdAt: FieldValue.serverTimestamp(),
            lastLoginAt: FieldValue.serverTimestamp(),
        }, { merge: true });
    }

    const idToken = await user.getIdToken();
    const result = await createSessionCookie(idToken);
    
    if (result.status === 'success' || result.status === 'success_no_cookie') {
        redirect('/');
    } else {
        return { error: result.message };
    }
  } catch (e: any) {
     if (e.code === 'auth/email-already-in-use') {
        return { error: 'An account already exists with this email. Please try logging in.' };
    }
    if (e.code === 'auth/account-exists-with-different-credential') {
        return { error: 'An account already exists with this email. Please sign in using Google.' };
    }
    return { error: e.message };
  }
}

export async function login(previousState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  
  if (!email || !password) {
      return { error: 'Email and password are required.'};
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const { adminDb } = initializeAdmin();
    if (adminDb) {
        await adminDb.collection('users').doc(user.uid).set({
            lastLoginAt: FieldValue.serverTimestamp()
        }, { merge: true });
    }

    const idToken = await user.getIdToken();
    const result = await createSessionCookie(idToken);

    if (result.status === 'error') {
       return { error: result.message };
    }
    
    if (result.isAdmin) {
        redirect('/admin');
    } else {
        redirect('/');
    }

  } catch (e: any) {
    if (e.code === 'auth/wrong-password' || e.code === 'auth/user-not-found' || e.code === 'auth/invalid-credential') {
        return { error: 'Invalid email or password.' };
    }
    if (e.code === 'auth/account-exists-with-different-credential') {
         return { error: 'An account for this email was created using a different sign-in method. Please sign in with Google.' };
    }
    return { error: e.message };
  }
}

export async function logout() {
    const cookieStore = cookies();
    const sessionCookie = cookieStore.get('session')?.value;
    const { adminApp, adminDb } = initializeAdmin();
    
    if (sessionCookie && adminApp && adminDb) {
        try {
            const adminAuth = getAdminAuth(adminApp);
            const decodedToken = await adminAuth.verifySessionCookie(sessionCookie);
            await adminDb.collection("users").doc(decodedToken.uid).update({
                lastLogoutAt: FieldValue.serverTimestamp()
            });
            await adminAuth.revokeRefreshTokens(decodedToken.sub);
        } catch (error) {
            // Session cookie is invalid or expired.
            // No need to do anything, just clear it.
            console.error('Error during logout:', error);
        }
    }
    
    cookies().delete('session');
    redirect('/login');
}

export async function getUsers() {
    const { adminDb } = initializeAdmin();
    if (!adminDb) {
        return { error: 'Admin functionality is not configured.' };
    }

    try {
        const usersSnapshot = await adminDb.collection('users').orderBy('createdAt', 'desc').get();
        const users = usersSnapshot.docs.map(doc => {
             const data = doc.data();
             // Convert Timestamps to serializable format
             return JSON.parse(JSON.stringify(data, (key, value) => {
                if (value && value.toDate) { // Check for Timestamp object
                   return value.toDate().toISOString();
                }
                return value;
             }));
        });

        return { users };
    } catch (e: any) {
        console.error('Error fetching users:', e);
        return { error: 'Failed to fetch users. Is the admin service account configured correctly?' };
    }
}

export async function getUser(uid: string) {
    const { adminDb } = initializeAdmin();
    
    if (!adminDb) {
      return { error: 'Could not retrieve user profile data. The service is temporarily unavailable.' };
    }
    
    try {
        const userDocRef = adminDb.collection('users').doc(uid);
        const userDoc = await userDocRef.get();

        if (!userDoc.exists) {
            return { error: 'User not found.' };
        }

        const userData = userDoc.data();
        if (!userData) {
             return { error: 'User data is empty.' };
        }
        
        const serializableData = JSON.parse(JSON.stringify(userData, (key, value) => {
            if (value && value.toDate) { // Check for Timestamp object
                return value.toDate().toISOString();
            }
            return value;
        }));
        
        return { user: serializableData };
    } catch(e: any) {
        console.error('Error fetching user:', e);
        return { error: 'Failed to fetch user data.' };
    }
}
