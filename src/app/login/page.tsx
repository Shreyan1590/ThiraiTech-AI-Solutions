
'use client';

import { useActionState, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { signup, login, createSessionCookie } from '@/app/auth/actions';
import Link from 'next/link';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from '@/lib/firebase';
import { cn } from '@/lib/utils';
import { Code2 } from 'lucide-react';


const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export default function LoginPage() {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  
  const [signUpState, signUpAction] = useActionState(signup, { error: undefined });
  const [logInState, logInAction] = useActionState(login, { error: undefined });

  const [googleError, setGoogleError] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    try {
      setGoogleError(null);
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();
      const response = await createSessionCookie(idToken);
      
      if (response.status === 'success') {
          if (response.isAdmin) {
              window.location.href = '/admin';
          } else {
              window.location.href = '/';
          }
      } else if (response.status === 'success_no_cookie') {
        // This case handles client-side only auth (no admin sdk)
        // The onAuthStateChanged listener in use-auth.tsx will trigger the redirect
        window.location.href = '/';
      }
      else if (response.status === 'error'){
        setGoogleError(response.message || 'An unexpected error occurred.');
      }
    } catch (e: any) {
      if (e.code === 'auth/account-exists-with-different-credential') {
          setGoogleError("An account already exists with this email address. Please sign in with the method you used originally.");
      }
      // Don't show an error if the user closes the popup
      else if (e.code === 'auth/popup-closed-by-user') {
        return;
      } else {
        setGoogleError(e.message);
      }
    }
  };

  const MobileSwitch = () => (
      <div className="mt-6 text-center md:hidden">
        {isRightPanelActive ? (
            <p className="text-sm">
                Already have an account?{' '}
                <button type="button" onClick={() => setIsRightPanelActive(false)} className="font-semibold text-primary hover:underline">
                    Sign In
                </button>
            </p>
        ) : (
            <p className="text-sm">
                Don't have an account?{' '}
                <button type="button" onClick={() => setIsRightPanelActive(true)} className="font-semibold text-primary hover:underline">
                    Sign Up
                </button>
            </p>
        )}
    </div>
  )

  return (
    <div className="flex flex-col min-h-dvh bg-background items-center justify-center px-4">
        <div className="absolute top-0 left-0 p-4">
            <Link href="/" className="flex items-center gap-2">
                <Code2 className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold font-headline">ThiraiTech AI</span>
            </Link>
        </div>
      <div className={cn('login-container', { 'right-panel-active': isRightPanelActive })}>

        {/* Sign Up Form */}
        <div className="form-container sign-up-container">
          <form action={signUpAction} className="bg-card flex flex-col items-center justify-center h-full px-12 text-center">
            <h1 className="font-bold text-2xl font-headline mb-4">Create Account</h1>
            <Button
                variant="outline"
                type="button"
                className="w-full mb-4 border"
                onClick={handleGoogleSignIn}
              >
                <svg
                  className="mr-2 h-4 w-4"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_10_10)">
                    <path d="M44.5 20.95H24v8.5h11.4c-1.65 5.5-6.8 9.55-12.9 9.55-7.45 0-13.5-6.05-13.5-13.5s6.05-13.5 13.5-13.5c3.55 0 6.75 1.4 9.05 3.65l6.5-6.5C35.5 4.5 29.95 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11.1 0 20-8.1 21.7-18.5.3-1.85-.05-3.55-.2-5.55z" fill="#FFC107" />
                    <path d="M44.5 20.95H24v8.5h11.4c-1.65 5.5-6.8 9.55-12.9 9.55-7.45 0-13.5-6.05-13.5-13.5s6.05-13.5 13.5-13.5c3.55 0 6.75 1.4 9.05 3.65l6.5-6.5C35.5 4.5 29.95 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11.1 0 20-8.1 21.7-18.5.3-1.85-.05-3.55-.2-5.55z" fill="#FF3D00" />
                    <path d="M4.9 29.85c-1.8-3.3-2.8-7.1-2.8-11.1 0-4.05 1-7.8 2.8-11.1L2 14.95C.5 18.05 0 21.4 0 25s.5 6.95 2 10.05l2.9-5.2z" fill="#4CAF50" />
                    <path d="M44.5 20.95H24v8.5h11.4c-1.65 5.5-6.8 9.55-12.9 9.55-3.6 0-6.9-1.2-9.45-3.2L2.9 35.05C6.9 39.55 12.8 42 19.5 42c11.1 0 20-8.1 21.7-18.5.3-1.85-.05-3.55-.2-5.55z" fill="#1976D2" />
                  </g>
                  <defs>
                    <clipPath id="clip0_10_10">
                      <rect width="48" height="48" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                Sign up with Google
              </Button>
            <span className="text-xs text-muted-foreground mb-4">or use your email for registration</span>
            <Input name="email" type="email" placeholder="Email" className="w-full mb-2" required/>
            <Input name="password" type="password" placeholder="Password" className="w-full mb-4" required/>
            <Button type="submit">Sign Up</Button>
            {(signUpState?.error || googleError) && (
              <p className="text-sm text-destructive mt-2">{signUpState?.error || googleError}</p>
            )}
          </form>
        </div>

        {/* Sign In Form */}
        <div className="form-container sign-in-container">
          <form action={logInAction} className="bg-card flex flex-col items-center justify-center h-full px-12 text-center">
            <h1 className="font-bold text-2xl font-headline mb-4">Sign In</h1>
            <Button
                variant="outline"
                type="button"
                className="w-full mb-4 border"
                onClick={handleGoogleSignIn}
              >
                <svg
                  className="mr-2 h-4 w-4"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_10_10)">
                    <path d="M44.5 20.95H24v8.5h11.4c-1.65 5.5-6.8 9.55-12.9 9.55-7.45 0-13.5-6.05-13.5-13.5s6.05-13.5 13.5-13.5c3.55 0 6.75 1.4 9.05 3.65l6.5-6.5C35.5 4.5 29.95 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11.1 0 20-8.1 21.7-18.5.3-1.85-.05-3.55-.2-5.55z" fill="#FFC107" />
                    <path d="M44.5 20.95H24v8.5h11.4c-1.65 5.5-6.8 9.55-12.9 9.55-7.45 0-13.5-6.05-13.5-13.5s6.05-13.5 13.5-13.5c3.55 0 6.75 1.4 9.05 3.65l6.5-6.5C35.5 4.5 29.95 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11.1 0 20-8.1 21.7-18.5.3-1.85-.05-3.55-.2-5.55z" fill="#FF3D00" />
                    <path d="M4.9 29.85c-1.8-3.3-2.8-7.1-2.8-11.1 0-4.05 1-7.8 2.8-11.1L2 14.95C.5 18.05 0 21.4 0 25s.5 6.95 2 10.05l2.9-5.2z" fill="#4CAF50" />
                    <path d="M44.5 20.95H24v8.5h11.4c-1.65 5.5-6.8 9.55-12.9 9.55-3.6 0-6.9-1.2-9.45-3.2L2.9 35.05C6.9 39.55 12.8 42 19.5 42c11.1 0 20-8.1 21.7-18.5.3-1.85-.05-3.55-.2-5.55z" fill="#1976D2" />
                  </g>
                  <defs>
                    <clipPath id="clip0_10_10">
                      <rect width="48" height="48" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                Sign in with Google
            </Button>
            <span className="text-xs text-muted-foreground mb-4">or use your account</span>
            <Input name="email" type="email" placeholder="Email" className="w-full mb-2" required/>
            <Input name="password" type="password" placeholder="Password" className="w-full mb-4" required/>
            <Button type="submit">Sign In</Button>
            {(logInState?.error || googleError) && (
              <p className="text-sm text-destructive mt-2">{logInState?.error || googleError}</p>
            )}
          </form>
        </div>

        {/* Overlay Panels */}
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1 className="font-bold text-2xl font-headline mb-4">Welcome Back!</h1>
              <p className="text-sm mb-6">To keep connected with us please login with your personal info</p>
              <Button variant="outline" className="button-ghost" onClick={() => setIsRightPanelActive(false)}>Sign In</Button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1 className="font-bold text-2xl font-headline mb-4">Hello, Friend!</h1>
              <p className="text-sm mb-6">Enter your personal details and start your journey with us</p>
              <Button variant="outline" className="button-ghost" onClick={() => setIsRightPanelActive(true)}>Sign Up</Button>
            </div>
          </div>
        </div>

      </div>
      <MobileSwitch />
    </div>
  );
}
