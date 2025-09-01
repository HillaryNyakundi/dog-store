import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { authApi } from '@/lib/auth/auth-api';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      id: number;
      email: string;
      name: string;
      username: string;
      role: string;
    };
    accessToken: string;
    refreshToken?: string;
  }

  interface User {
    id: number;
    email: string;
    name: string;
    username: string;
    role: string;
    accessToken: string;
    refreshToken?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string;
    refreshToken?: string;
    id: number;
    username: string;
    role: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        try {
          const tokenResponse = await authApi.login({
            username: credentials.username,
            password: credentials.password,
          });

          // Parse JWT to get user data
          const payload = authApi.parseJWT(tokenResponse.access_token);
          
          if (!payload) {
            return null;
          }

          return {
            id: payload.sub || payload.id,
            email: payload.email,
            name: payload.full_name || payload.name,
            username: payload.username || credentials.username,
            role: payload.role || 'user',
            accessToken: tokenResponse.access_token,
            refreshToken: tokenResponse.refresh_token,
          };
        } catch (error) {
          console.error('Authentication error:', error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.id = user.id;
        token.username = user.username;
        token.role = user.role;
        token.email = user.email;
        token.name = user.name;
      }

      // Handle token refresh
      if (trigger === 'update' && token.refreshToken) {
        try {
          const newAccessToken = await authApi.refresh(token.refreshToken);
          token.accessToken = newAccessToken;
        } catch (error) {
          console.error('Token refresh failed:', error);
        }
      }

      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id,
        email: token.email!,
        name: token.name!,
        username: token.username,
        role: token.role,
      };
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
  },
  debug: process.env.NODE_ENV === 'development',
};