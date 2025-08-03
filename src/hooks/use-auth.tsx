'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { app } from '@/lib/firebase';
import { Skeleton } from '@/components/ui/skeleton';

const auth = getAuth(app);
const ADMIN_EMAIL = 'admin@thiraitech.ai';


interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAdmin: false,
  loading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAdmin(currentUser?.email === ADMIN_EMAIL);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
       <div className="flex flex-col min-h-dvh bg-background">
         <header className="sticky top-0 z-50 w-full bg-transparent">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                <div className="flex items-center gap-2">
                    <Skeleton className="h-8 w-8 rounded-md" />
                    <Skeleton className="h-6 w-24 rounded-md hidden sm:block" />
                </div>
                 <div className="flex items-center gap-2">
                     <Skeleton className="h-10 w-10 rounded-full" />
                     <Skeleton className="h-10 w-20 rounded-md" />
                </div>
            </div>
        </header>
        <main className="flex-grow">
           <Skeleton className="h-[calc(100dvh-4rem)] w-full" />
        </main>
       </div>
    )
  }

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
