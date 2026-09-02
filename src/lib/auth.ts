import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/signin",
    newUser: "/onboarding",
  },
  providers: [
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
      ]
      : []),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "student@university.edu" },
        password: { label: "Password", type: "password" },
        isDemo: { label: "isDemo", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email) {
          throw new Error("Please enter your email address");
        }

        // Demo user fast login handler
        if (credentials.isDemo === "true" || credentials.email === "demo@thiran.ai") {
          let demoUser = await prisma.user.findUnique({
            where: { email: "demo@thiran.ai" },
            include: { profile: true },
          });

          if (!demoUser) {
            demoUser = await prisma.user.create({
              data: {
                name: "Alex Rivera",
                email: "demo@thiran.ai",
                role: "STUDENT",
                profile: {
                  create: {
                    targetDomain: "Full-Stack Web Development",
                    experienceLevel: "BEGINNER",
                    bio: "Sophomore CS student passionate about building accessible web apps and exploring AI tooling.",
                    skills: JSON.stringify([
                      { name: "JavaScript", level: "Intermediate", verified: true },
                      { name: "HTML & CSS", level: "Intermediate", verified: true },
                      { name: "React Basics", level: "Beginner", verified: false },
                      { name: "Git & GitHub", level: "Beginner", verified: true },
                    ]),
                    projects: JSON.stringify([
                      {
                        title: "Campus Study Buddy",
                        description: "A simple collaborative study group timer built with vanilla JS and local storage.",
                        techStack: ["JavaScript", "HTML", "CSS"],
                        link: "https://github.com/demo/study-buddy",
                      },
                    ]),
                    domainInterests: JSON.stringify(["Web Development", "AI Engineering", "UI/UX"]),
                  },
                },
              },
              include: { profile: true },
            });
          }

          return {
            id: demoUser.id,
            name: demoUser.name,
            email: demoUser.email,
            image: demoUser.image,
            role: demoUser.role,
          };
        }

        if (!credentials.password) {
          throw new Error("Please enter your password");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email.toLowerCase() },
          include: { profile: true },
        });

        if (!user || !user.passwordHash) {
          throw new Error("No account found with this email. Please sign up.");
        }

        const isValid = await bcrypt.compare(credentials.password, user.passwordHash);
        if (!isValid) {
          throw new Error("Incorrect password. Please try again.");
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      if (trigger === "update" && session) {
        token.name = session.name || token.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "thiran-ai-super-secret-development-jwt-key-2026-safe-guard",
};
