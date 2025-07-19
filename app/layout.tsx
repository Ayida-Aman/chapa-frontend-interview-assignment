import type { Metadata } from 'next';
import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from '@/lib/context/AuthContext';
import './globals.css';

export const metadata: Metadata = {
  title: 'Chapa PSP Dashboard',
  description: 'A role-based dashboard for a fictional Payment Service Provider',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="forest">
      <body >
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}