import CredentialsProvider from 'next-auth/providers/credentials';
import NextAuth, { NextAuthOptions } from 'next-auth';
import { UserModel } from 'models';

import bcrypt from 'bcryptjs';
import { IUser } from 'types/IUser';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const { username, email, isAdmin } = user;
        const newUser = { username, email, isAdmin };
        if (user) token.user = newUser as Partial<IUser>;
      }

      return token;
    },

    async session({ token, session }) {
      if (token?.user) session.user = token.user;
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        name: { label: 'Username', type: 'text' },
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const user = await UserModel.findOne({ email });
        if (user && bcrypt.compareSync(password, user.password)) {
          return user;
        }
        throw new Error('Invalid email or password');
      },
    }),
  ],
};
export default NextAuth(authOptions);
