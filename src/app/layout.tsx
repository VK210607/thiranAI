import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/providers/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ThiranAI — AI-Guided Career & Skill Navigation",
  description: "Anxiety-free, personalized career and skill navigation platform for students. Discover your genuine domain, build personalized roadmaps, and know your Next Big Action.",
  keywords: ["career guidance", "skill roadmap", "hackathons", "internships", "AI mentor", "student navigation"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#090d16] text-slate-100 antialiased selection:bg-indigo-500 selection:text-white`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
