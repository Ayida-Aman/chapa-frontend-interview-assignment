'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/context/AuthContext';
import Header from '@/components/common/Header/Header';
import WalletBalance from '@/components/user/WalletBalance';
import TransactionList from '@/components/user/TransactionList';
import TransactionForm from '@/components/user/TransactionForm';

export default function UserDashboard() {
  const { role } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (role !== 'User') {
      router.push('/login');
    }
  }, [role, router]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="container mx-auto p-4 flex-grow">
        <h1 className="text-2xl font-bold mb-4 text-base-content">User Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <WalletBalance />
          <TransactionList />
        </div>
        <div className="mt-4">
          <TransactionForm />
        </div>
      </div>
    </div>
  );
}