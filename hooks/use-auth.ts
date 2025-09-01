'use client';

import { useSession, signIn, signOut } from 'next-auth/react';

export function useAuth() {
  const { data: session, status, update } = useSession();

  return {
    user: session?.user,
    isAuthenticated: !!session,
    isLoading: status === 'loading',
    accessToken: session?.accessToken,
    refreshToken: session?.refreshToken,
    signIn,
    signOut,
    update,
  };
}