import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../public/assets/fonts/pretendard/pretendard.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Play Highlight",
  description: "Video streaming sites",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
