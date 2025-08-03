'use client';
import { useAuth } from '@/hooks/use-auth';
import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import { getUser } from '@/app/auth/actions';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';

interface UserProfile {
    uid: string;
    email: string;
    displayName: string;
    photoURL?: string;
    createdAt?: string;
    lastLoginAt?: string;
    lastLogoutAt?: string;
}

export default function ProfilePage() {
    const { user, loading: authLoading } = useAuth();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (authLoading) return;
        if (!user) {
            redirect('/login');
            return;
        }

        const fetchUser = async () => {
            setLoading(true);
            const { user: userData, error: userError } = await getUser(user.uid);
            if (userError) {
                setError(userError);
            } else {
                setProfile(userData);
            }
            setLoading(false);
        };

        fetchUser();
    }, [user, authLoading]);
    
    const formatDate = (dateString?: string) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleString();
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
                    {(loading || authLoading) ? (
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
                    ) : error ? (
                        <Card>
                            <CardHeader>
                                <CardTitle>Error</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-destructive">{error}</p>
                            </CardContent>
                        </Card>
                    ) : profile ? (
                        <Card>
                            <CardHeader className="items-center text-center pb-8">
                                <Avatar className="h-24 w-24 mb-4 border-4 border-primary">
                                    <AvatarImage src={profile.photoURL} alt={profile.displayName} />
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
                                <div className="py-4 grid grid-cols-3 gap-4">
                                    <dt className="font-medium text-muted-foreground">Last Logout</dt>
                                    <dd className="col-span-2">{formatDate(profile.lastLogoutAt)}</dd>
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
