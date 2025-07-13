import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 📌 Site-wide metadata (default SEO config)
export const metadata: Metadata = {
  title: {
    default: "Omni Game Hub",
    template: "%s | Omni Game Hub",
  },
  description: "Play and solve your favorite puzzle games online like Sudoku, FreeFlow, Wordle, and more — all in one place.",
  openGraph: {
    title: "Omni Game Hub",
    description: "Play and solve your favorite puzzle games online like Sudoku, FreeFlow, Wordle, and more — all in one place.",
    url: "https://yourdomain.com",
    siteName: "Omni Game Hub",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Omni Game Hub",
    description: "Solve Sudoku, Wordle, FreeFlow, and more online!",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
