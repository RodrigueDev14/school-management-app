'use client';

import Sidebar from '@/components/Sidebar';
import TopNavbar from '@/components/TopNavbar';
import { SessionProvider } from 'next-auth/react';

export default function DirectorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <TopNavbar />
          <main className="flex-1 overflow-y-auto p-4">
            {children}
          </main>
        </div>
      </div>
    </SessionProvider>
  );
}
