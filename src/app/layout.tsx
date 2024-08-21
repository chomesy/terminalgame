import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GameStateProvider } from '@/app/context/GameStateContext';

const inter = Inter({ subsets: ["latin", "latin-ext"] });

export const metadata: Metadata = {
  title: "The Terminal",
  description: "A project by Nick Chomut",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GameStateProvider>
          {children}
        </GameStateProvider>
      </body>
    </html>
  );
}
