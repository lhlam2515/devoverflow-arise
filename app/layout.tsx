import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

import "./globals.css";
import { auth } from "@/auth";
import { Toaster } from "@/components/ui/sonner";
import ThemeProvider from "@/context/Theme";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevFlow",
  description:
    "A community-driven platform for asking and answering programming questions. Get help, share knowledge, and collaborate with developers from around the world. Explore topics in web development, mobile app development, algorithms, data structures, and more.",
  icons: {
    icon: "/images/site-logo.svg",
  },
};

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  return (
    <html lang="en" suppressHydrationWarning>
      <SessionProvider session={session}>
        <body
          className={`${inter.className} ${spaceGrotesk.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
          <Toaster richColors />
        </body>
      </SessionProvider>
    </html>
  );
};

export default RootLayout;
