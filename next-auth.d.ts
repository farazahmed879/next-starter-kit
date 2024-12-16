// next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: any;
    name: string;
    email: string;
    token?: string; // Add the token property
  }

  interface Session {
    user: any;

  }
}
