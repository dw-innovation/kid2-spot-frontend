import jsonwebtoken from "jsonwebtoken";
import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
  ],
  callbacks: {
    async jwt({ token, session }) {
      const jwt = jsonwebtoken.sign(token, process.env.NEXTAUTH_SECRET || "");
      return { jwt, ...session };
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
};
