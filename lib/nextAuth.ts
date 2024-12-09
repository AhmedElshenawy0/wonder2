import bcrypt from "bcryptjs";
import { type AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/utils/db";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: (process.env.GOOGLE_CLIENT_ID as string) || "",
      clientSecret: (process.env.GOOGLE_CLIENT_SECRET as string) || "",
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials?.email },
          });
          if (!user) {
            return `/register?error=userNotExist`; // This triggers the error page
          }
          const isPasswordValid = await bcrypt.compare(
            credentials!.password,
            user!.password
          );
          if (!isPasswordValid) throw new Error("Invalid password");
          return {
            ...user,
            isAdmin: user?.isAdmin,
          };
        } catch (error) {
          console.log("error: ", error);
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 1 * 24 * 60 * 60, // 1 day
  },

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        // Check if the user exists in the database
        let dbUser = await prisma.user.findUnique({
          where: { email: profile!.email },
        });

        if (!dbUser) {
          return `/register?error=notFound`; // This triggers the error page
        }
        if (dbUser && !dbUser.verified) {
          return `/login?error=notVerified`; // This triggers the error page
        }

        // Allow sign-in
        return true;
      }

      return true; // Default for other providers
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.isAdmin;
      } else if (token.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: token.email },
        });
        if (dbUser) {
          token.role = dbUser.isAdmin;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) session.user.isAdmin = token.role;
      return session;
    },
  },
};
