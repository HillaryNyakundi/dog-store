'use server';

import { signIn, signOut } from 'next-auth/react';
import { authApi } from '@/lib/auth/auth-api';
import { SignupCredentials, LoginCredentials } from '@/types/auth';
import { revalidatePath } from 'next/cache';

export type ActionResult<T = any> = {
  success: boolean;
  data?: T;
  error?: string;
};

export async function signInAction(credentials: LoginCredentials): Promise<ActionResult> {
  try {
    const result = await signIn('credentials', {
      username: credentials.username,
      password: credentials.password,
      redirect: false,
    });

    if (result?.error) {
      return {
        success: false,
        error: 'Invalid username or password',
      };
    }

    revalidatePath('/dashboard');
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Authentication failed',
    };
  }
}

export async function signUpAction(data: SignupCredentials): Promise<ActionResult> {
  try {
    const response = await authApi.signup(data);
    
    // After successful signup, sign in the user
    const signInResult = await signIn('credentials', {
      username: data.username,
      password: data.password,
      redirect: false,
    });

    if (signInResult?.error) {
      return {
        success: false,
        error: 'Account created but login failed. Please sign in manually.',
      };
    }

    revalidatePath('/dashboard');
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Signup failed',
    };
  }
}

export async function signOutAction(): Promise<void> {
  await signOut({ redirect: true, callbackUrl: '/' });
}