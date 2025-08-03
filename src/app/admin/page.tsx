import { getUsers } from '@/app/auth/actions';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { getAuth as getAdminAuth } from 'firebase-admin/auth';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal, Inbox } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { initializeApp, getApps, cert } from 'firebase-admin/app';

const ADMIN_EMAIL = 'admin@thiraitech.ai';

// This function should only be called in server-side components/actions
// where admin privileges are required.
function initializeAdminApp() {
  const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
    ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
    : undefined;

  // Avoid re-initializing the app
  if (getApps().some(app => app.name === 'admin')) {
    return;
  }

  if (serviceAccount) {
    initializeApp({
      credential: cert(serviceAccount),
      databaseURL: `https://${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseio.com`,
    }, 'admin');
  }
}


export default async function AdminPage() {
    let isAdmin = false;
    let isConfigured = false;
    
    // Check if the service account key is present
    if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
        isConfigured = true;
        initializeAdminApp();
        
        const cookieStore = cookies();
        const sessionCookie = cookieStore.get('session')?.value;

        if (!sessionCookie) {
            redirect('/login');
        }

        try {
            const decodedToken = await getAdminAuth().verifySessionCookie(sessionCookie, true);
            if (decodedToken.email === ADMIN_EMAIL) {
                isAdmin = true;
            } else {
                redirect('/');
            }
        } catch (error) {
            console.error('Session cookie verification failed:', error);
            redirect('/login');
        }
    }

    if (!isConfigured) {
        // Render the "not configured" message but allow the page structure to load.
        // This makes it clear to the developer what needs to be done.
    } else if (!isAdmin) {
        // This case should be handled by the redirects, but as a fallback.
        return <p>You do not have permission to view this page.</p>;
    }
    
  const { users, error } = await getUsers();

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="min-h-screen bg-secondary/50">
        <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-lg border-b border-border/20">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                <h1 className="text-xl font-bold font-headline text-primary">Admin Dashboard</h1>
                <Link href="/">
                    <Button variant="outline">
                        Back to Home
                    </Button>
                </Link>
            </div>
        </header>
        <main className="container mx-auto p-4 md:p-6 lg:p-8 space-y-8">
            {error || !isConfigured ? (
                <Alert variant="destructive" className="max-w-xl mx-auto">
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>Admin Features Not Configured</AlertTitle>
                    <AlertDescription>
                        The admin dashboard requires a Firebase Service Account to function. Please configure the `FIREBASE_SERVICE_ACCOUNT_KEY` environment variable in your project settings to enable this feature.
                    </AlertDescription>
                </Alert>
            ) : (
                <>
                    <Card>
                        <CardHeader>
                            <CardTitle>User Management</CardTitle>
                            <CardDescription>A list of all registered users in the system.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-lg border overflow-x-auto">
                                <Table>
                                <TableHeader>
                                    <TableRow>
                                    <TableHead>User</TableHead>
                                    <TableHead className="min-w-[150px]">Email</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="min-w-[180px]">Created At</TableHead>
                                    <TableHead className="min-w-[180px]">Last Logged In</TableHead>
                                    <TableHead className="min-w-[180px]">Last Logged Out</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {users?.map((user: any) => (
                                    <TableRow key={user.uid}>
                                        <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar>
                                            <AvatarImage src={user.photoURL ?? undefined} alt={user.displayName ?? ''} />
                                            <AvatarFallback>{user.email?.[0].toUpperCase()}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                            <p className="font-medium">{user.displayName || 'N/A'}</p>
                                            <p className="text-sm text-muted-foreground break-all">{user.uid}</p>
                                            </div>
                                        </div>
                                        </TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>
                                        <Badge variant={user.disabled ? 'destructive' : 'default'}>
                                            {user.disabled ? 'Disabled' : 'Active'}
                                        </Badge>
                                        </TableCell>
                                        <TableCell>{formatDate(user.createdAt)}</TableCell>
                                        <TableCell>{formatDate(user.lastLoginAt)}</TableCell>
                                        <TableCell>{formatDate(user.lastLogoutAt)}</TableCell>
                                    </TableRow>
                                    ))}
                                </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Formspree Submissions</CardTitle>
                            <CardDescription>Messages sent via the contact form.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <Alert>
                                <Inbox className="h-4 w-4" />
                                <AlertTitle>Feature Coming Soon</AlertTitle>
                                <AlertDescription>
                                    To display Formspree submissions, you will need to provide a Formspree API Key. Please add a `FORMSPREE_API_KEY` to your environment variables to enable this feature in the future.
                                </AlertDescription>
                            </Alert>
                        </CardContent>
                    </Card>
                </>
            )}
        </main>
    </div>
  );
}
