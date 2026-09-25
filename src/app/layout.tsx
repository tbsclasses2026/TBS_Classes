import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TBS Classes | Learn Smarter. Code Better.",
  description: "Modern educational platform for B.Tech and Engineering students. Get notes, practical coding resources, and clear concepts.",
  keywords: ["B.Tech notes", "Engineering notes", "Programming tutorials", "C programming", "Java programming", "Semester exam preparation"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-light text-navy min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <ChatWidget />
        <Footer />
      </body>
    </html>
  );
}
