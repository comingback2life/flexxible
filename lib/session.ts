import { getServerSession } from 'next-auth/next';
import { NextAuthOptions, User } from 'next-auth';
import { AdapterUser } from 'next-auth/adapters';
import GoogleProvider from 'next-auth/providers/google';
import { JWT } from 'next-auth/jwt';
import { SessionInterface, UserProfile } from '@/common.types';
import { createUser, getUser } from './actions';
import * as jsonwebtoken from 'jsonwebtoken';

export const authOption: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  jwt: {
    encode: ({ secret, token }) => {
      return jsonwebtoken.sign(
        {
          ...token,
          iss: 'grafbase',
          exp: Math.floor(Date.now() / 1000) + 60 * 60, //add 1 hour to the current date.s
        },
        secret
      );
    },

    decode: async ({ secret, token }) => {
      return jsonwebtoken.verify(token!, secret) as JWT;
    },
  },
  theme: {
    colorScheme: 'light',
    logo: '/logo.png',
  },
  callbacks: {
    async session({ session }) {
      const email = session.user?.email as string;
      try {
        const data = (await getUser(email)) as { user?: UserProfile };
        const newSession = {
          ...session,
          user: {
            ...session?.user,
            ...data?.user,
          },
        };
        return newSession;
      } catch (error) {
        console.log('Error retreiving user data', error);
        return session;
      }
    },
    async signIn({ user }: { user: AdapterUser | User }) {
      try {
        const userExists = (await getUser(user?.email as string)) as {
          user?: UserProfile;
        };
        if (!userExists?.user) {
          await createUser(
            user.name as string,
            user.email as string,
            user.image as string
          );
        }
        return true;
      } catch (error: any) {
        console.log('Error', error);
        return false;
      }
    },
  },
};
export async function getCurrentUser() {
  const session = (await getServerSession(authOption)) as SessionInterface;
  return session;
}
