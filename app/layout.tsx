import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VaniNivesh AI - Vernacular FD Advisor",
  description: "Blostem Hackathon 2026 Submission by Solo Builder",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 min-h-screen selection:bg-blostem-100 selection:text-blostem-900`}>
        {children}
      </body>
    </html>
  );
}
