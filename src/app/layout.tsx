import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'sURLs - Simple URL Shortener',
  description: 'A simple URL shortener built with Next.js and Tailwind CSS.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <div className="flex items-center justify-center h-screen">
      <main className='max-w-md'>
        {children}
      </main>
    </div>
        </body>
    </html>
  );
}
