import bcrypt from "bcryptjs";
import { DefaultUser, User, type AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/utils/db";
import { sendEmail } from "@/utils/mail";

interface NewUser extends DefaultUser {
  isAdmin?: boolean; // Add the isAdmin property
}

declare module "next-auth" {
  interface Session {
    user?: {
      isAdmin?: boolean;
      name?: string;
      email?: string;
      // other properties
    };
  }
}

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
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });
        if (!user?.email) {
          throw new Error("User does not exist");
        }

        const isPasswordValid = await bcrypt.compare(
          credentials!.password,
          user!.password
        );
        if (!isPasswordValid) throw new Error("Invalid password");
        if (user && !user.verified) {
          sendEmail(user?.email);
          throw new Error("User not verified");
        }

        const userWithAdmin = {
          id: user.id.toString(), // Ensure id is a string
          email: user.email,
          userName: user.userName,
          phone: user.phone,
          company: user.company,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          isAdmin: user.isAdmin,
          verified: user.verified,
        };
        return userWithAdmin as User;
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
        const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

        if (!dbUser) {
          return `${baseUrl}/register?error=notFound`; // This triggers the error page
        }
        if (dbUser && !dbUser.verified) {
          sendEmail(profile?.email!);
          return `${baseUrl}/login?error=notVerified`; // This triggers the error page
        }

        // Allow sign-in
        return true;
      }

      return true; // Default for other providers
    },
    async jwt({ token, user }) {
      if (user) {
        const newUser = user as NewUser;

        console.log("from jwt");

        // console.log(user);
        // console.log(token);

        token.role = (user as { isAdmin?: boolean }).isAdmin;
      } else if (token.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: token.email },
        });
        if (dbUser) {
          token.role = dbUser.isAdmin;
          token.beeb = dbUser.isAdmin;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        console.log("from session");
        // console.log(session);
        // console.log(token);
        const newSessionUser = session.user as NewUser;

        if (typeof token.role === "boolean") {
          session.user.isAdmin = token.role ?? false;
          session.user.name = token.name || "";
          session.user.email = token.email || "";
        }
      }
      return session;
    },
  },
};
