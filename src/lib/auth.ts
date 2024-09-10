import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";

const parseEnvCredentials = (envCreds: string) => {
  const credsArray = envCreds.split(";").map((cred) => {
    const [username, password] = cred.split(":");
    return { username, password };
  });
  return credsArray;
};

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
        const envCreds = process.env.CREDENTIALS;

        if (!envCreds) {
          throw new Error("Credentials environment variable not set");
        }

        const parsedCredentials = parseEnvCredentials(envCreds);

        const user = parsedCredentials.find(
          (userCred) =>
            userCred.username === username && userCred.password === password
        );

        if (user) {
          return {
            id: user.username,
            name: user.username,
            email: user.username,
          };
        } else {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
};
