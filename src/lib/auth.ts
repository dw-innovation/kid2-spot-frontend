import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_APP_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_APP_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "kid2" },
        password: { label: "Password", type: "password", placeholder: "kid2" },
      },
      async authorize(credentials) {
        const { username, password } = credentials || {};
        const user = { id: "1", name: "kid2", email: "kid2" };

        if (username === "kid2" && password === "kid2") {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
};
