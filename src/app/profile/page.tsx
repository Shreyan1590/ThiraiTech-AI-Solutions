
'use client';
import { useAuth } from '@/hooks/use-auth';
import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import type { User } from 'firebase/auth';

// A simplified profile type that can be derived from the auth user object
interface UserProfile {
    uid: string;
    email?: string | null;
    displayName?: string | null;
    photoURL?: string | null;
    createdAt?: string; // from user.metadata
    lastLoginAt?: string; // from user.metadata
}

export default function ProfilePage() {
    const { user, loading: authLoading } = useAuth();
    const [profile, setProfile] = useState<UserProfile | null>(null);

    useEffect(() => {
        if (authLoading) return;
        if (!user) {
            redirect('/login');
            return;
        }

        // Use the client-side user object directly
        setProfile({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            createdAt: user.metadata.creationTime,
            lastLoginAt: user.metadata.lastSignInTime,
        });

    }, [user, authLoading]);
    
    const formatDate = (dateString?: string) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return `${date.toLocaleDateString('en-GB')} at ${date.toLocaleTimeString('en-GB')}`;
    };

    const getAvatarFallback = () => {
        if (profile?.displayName) return profile.displayName.charAt(0).toUpperCase();
        if (profile?.email) return profile.email.charAt(0).toUpperCase();
        return '?';
    }

    return (
        <div className="flex flex-col min-h-dvh bg-background">
            <Header />
            <main className="flex-grow container mx-auto p-4 md:p-6 lg:p-8">
                <div className="max-w-4xl mx-auto">
                    {authLoading ? (
                        <Card>
                            <CardHeader className="items-center text-center">
                                <Skeleton className="h-24 w-24 rounded-full" />
                                <Skeleton className="h-8 w-48 mt-4" />
                                <Skeleton className="h-4 w-64 mt-2" />
                            </CardHeader>
                            <CardContent className="space-y-6 mt-6">
                                <div className="space-y-2">
                                     <Skeleton className="h-6 w-1/3" />
                                     <Skeleton className="h-4 w-2/3" />
                                </div>
                                <div className="space-y-2">
                                     <Skeleton className="h-6 w-1/3" />
                                     <Skeleton className="h-4 w-2/3" />
                                </div>
                                <div className="space-y-2">
                                     <Skeleton className="h-6 w-1/3" />
                                     <Skeleton className="h-4 w-2/3" />
                                </div>
                                 <div className="space-y-2">
                                     <Skeleton className="h-6 w-1/3" />
                                     <Skeleton className="h-4 w-2/3" />
                                </div>
                            </CardContent>
                        </Card>
                    ) : profile ? (
                        <Card>
                            <CardHeader className="items-center text-center pb-8">
                                <Avatar className="h-24 w-24 mb-4 border-4 border-primary">
                                    <AvatarImage src={profile.photoURL ?? undefined} alt={profile.displayName ?? ''} />
                                    <AvatarFallback className="text-4xl">{getAvatarFallback()}</AvatarFallback>
                                </Avatar>
                                <CardTitle className="text-3xl font-headline">{profile.displayName}</CardTitle>
                                <CardDescription className="text-lg">{profile.email}</CardDescription>
                            </CardHeader>
                            <CardContent className="divide-y">
                                <div className="py-4 grid grid-cols-3 gap-4">
                                    <dt className="font-medium text-muted-foreground">User ID</dt>
                                    <dd className="col-span-2">{profile.uid}</dd>
                                </div>
                                <div className="py-4 grid grid-cols-3 gap-4">
                                    <dt className="font-medium text-muted-foreground">Joined</dt>
                                    <dd className="col-span-2">{formatDate(profile.createdAt)}</dd>
                                </div>
                                <div className="py-4 grid grid-cols-3 gap-4">
                                    <dt className="font-medium text-muted-foreground">Last Login</dt>
                                    <dd className="col-span-2">{formatDate(profile.lastLoginAt)}</dd>
                                </div>
                            </CardContent>
                        </Card>
                    ) : null}
                </div>
            </main>
            <Footer />
        </div>
    );
}