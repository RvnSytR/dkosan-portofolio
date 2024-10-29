/* eslint-disable @typescript-eslint/no-empty-object-type */
import Credentials from "next-auth/providers/credentials";
import NextAuth, { DefaultSession, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";

import { state } from "./db/state";

type AuthCredentials = {
  id_user: string;
  username: string;
  email: string;
  image: string;
  log: Date;
};

// * Module Augmentation
declare module "next-auth" {
  interface User extends AuthCredentials {}

  interface Session {
    user: DefaultSession["user"] & AuthCredentials;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends AuthCredentials {}
}

// * Config
export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
} = NextAuth({
  secret: process.env.AUTH_SECRET,
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      authorize: async (credentials): Promise<User | null> => {
        if (!credentials?.email) throw new Error("Email is required");
        const [res] = await state.user.getEqEmail.execute({
          email: credentials.email as string,
        });
        if (!res) throw new Error("User does not exist!");
        return { ...res };
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      await state.user.updateLog.execute({ id_user: user.id_user });
      return true;
    },

    jwt({ token, user }): JWT | null {
      if (user) {
        token.id_user = user.id_user;
        token.username = user.username;
        token.email = user.email;
        token.image = user.image as string;
        token.log = user.log;
      }
      return token;
    },

    session({ session, token }): Session | DefaultSession {
      if (token.email) {
        session.user.id_user = token.id_user;
        session.user.username = token.username;
        session.user.email = token.email;
        session.user.image = token.image;
        session.user.log = token.log;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
