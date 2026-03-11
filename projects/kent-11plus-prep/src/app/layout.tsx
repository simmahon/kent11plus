import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Nav } from "@/components/nav";
import { UserProvider } from "@/contexts/user-context";
import { ServiceWorkerRegister } from "@/components/sw-register";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kent 11+ Trainer",
  description:
    "Interactive practice app for the Kent 11+ Grammar School entrance exam. Covers verbal reasoning, non-verbal reasoning, mathematics, and English.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "11+ Trainer",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0f",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="apple-touch-icon" href="/icon" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased grid-bg min-h-screen`}
      >
        <UserProvider>
          <Nav />

          <main className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 sm:py-8">
            {children}
          </main>
        </UserProvider>
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
