import { NextApiHandler } from "next";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { prisma } from "lib/prisma";

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;

const options = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  adapter: PrismaAdapter(prisma),

  secret: process.env.SECRET,
  callbacks: {
    async session({ session, user }) {
      const resolvedUser = await prisma.user.findUnique({
        where: {
          email: user.email,
        },
      });

      if (!resolvedUser) {
        return Promise.resolve(session);
      }

      return Promise.resolve({
        ...session,
        user: {
          ...session.user,
          id: resolvedUser.id,
        },
      });
    },
  },
};
