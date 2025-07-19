'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/context/AuthContext';
import Header from '@/components/common/Header/Header';
import UserList from '@/components/admin/UserList';
import UserPaymentSummary from '@/components/admin/PaymentSummary';

export default function AdminDashboard() {
  const { role } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (role !== 'Admin') {
      router.push('/login');
    }
  }, [role, router]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="container mx-auto p-4 flex-grow">
        <h1 className="text-2xl font-bold mb-4 text-base-content">Admin Dashboard</h1>
        <div className="gap-4">
          <UserList />
          <UserPaymentSummary />
        </div>
      </div>
    </div>
  );
}