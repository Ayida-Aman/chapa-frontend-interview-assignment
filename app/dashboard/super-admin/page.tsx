'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/context/AuthContext';
import Header from '@/components/common/Header/Header';
import UserList from '@/components/admin/UserList';
import UserPaymentSummary from '@/components/admin/PaymentSummary';
import AdminManagement from '@/components/super-admin/AdminManagement';
import SystemStats from '@/components/super-admin/SystemStats';

export default function SuperAdminDashboard() {
  const { role } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (role !== 'Super Admin') {
      router.push('/login');
    }
  }, [role, router]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="container mx-auto p-4 flex-grow">
        <h1 className="text-2xl font-bold mb-4 text-base-content">Super Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <UserList />
          <UserPaymentSummary />
        </div>
        <div className="mt-4 space-y-4">
          <SystemStats />
          <AdminManagement />
        </div>
      </div>
    </div>
  );
}