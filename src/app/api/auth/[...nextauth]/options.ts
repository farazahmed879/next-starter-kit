import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "email",
          type: "email",
          placeholder: "your-Email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "*******",
        },
      },
      async authorize(credentials) {
        //where I will get the user data from either database or from somewhere else

        //https://next-auth.js.org/configuration/providers/credentials use this link to check it

        if (!credentials) {
          return null;
        }

        try {
          const response = await fetch("http://localhost:8080/users/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials.username,
              password: credentials.password,
            }),
          });

          if (!response.ok) {
            console.error("Failed to authneticate user:", response.statusText);
            return null;
          }

          const data = await response.json();

          if (data && data.token) {
            return {
              id: data.id,
              name: data.name,
              email: data.email,
              token: data.token,
            };
          } else {
            return null;
          }
        } catch (error) {
          console.error("Error authneticating user", error);
          return null;
        }
      },
    }),
  ],

  // I will use this as I need to because I am using a custom sign in page not the one from next auth

  pages: {
    signIn: "/auth/login",
    signOut: "/auth/register",
    error: "/auth/error", // Error code passed in query string as ?error=
    verifyRequest: "/auth/verify-request", // (used for check email message)
    newUser: "/auth/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
  },

  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;

        token.token = user.token ?? "";
      }
      return token;
    },
    async session({ session, token, user }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.token = token.token;
        session.user.token = token.token ?? "";
      }
      return session
    },
  },
};
