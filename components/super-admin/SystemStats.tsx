'use client';
import { useEffect, useState } from 'react';
import { getSystemStats } from '@/lib/api';

interface SystemStats {
  totalPayments: number;
  activeUsers: number;
  totalAdmins: number;
  inactiveUsers: number;
  totalUsers: number;
}

export default function SystemStats() {
  const [stats, setStats] = useState<SystemStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getSystemStats()
      .then((data) => {
        setStats(data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  return (
    <div className="card bg-base-100 shadow-xl system-stats">
      <div className="card-body">
        <h2 className="card-title text-base-content">System Statistics</h2>
        {isLoading ? (
          <div className="animate-pulse">
            <div className="h-16 bg-base-300 rounded w-full mb-2"></div>
            <div className="h-16 bg-base-300 rounded w-full mb-2"></div>
            <div className="h-16 bg-base-300 rounded w-full"></div>
          </div>
        ) : !stats ? (
          <p className="text-base-content">No statistics available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="stat">
              <div className="stat-title text-base-content">Total Payments</div>
              <div className="stat-value text-primary">${stats.totalPayments.toFixed(2)}</div>
              <div className="stat-desc text-base-content">Across all users</div>
            </div>
            <div className="stat">
              <div className="stat-title text-base-content">Active Users</div>
              <div className="stat-value text-primary">{stats.activeUsers}</div>
              <div className="stat-desc text-base-content">Users with active status</div>
            </div>
            <div className="stat">
              <div className="stat-title text-base-content">Total Admins</div>
              <div className="stat-value text-primary">{stats.totalAdmins}</div>
              <div className="stat-desc text-base-content">Current administrators</div>
            </div>
            <div className="stat">
              <div className="stat-title text-base-content">Inactive Users</div>
              <div className="stat-value text-primary">{stats.inactiveUsers}</div>
              <div className="stat-desc text-base-content">Users with inactive status</div>
            </div>
            <div className="stat">
              <div className="stat-title text-base-content">Total Users</div>
              <div className="stat-value text-primary">{stats.totalUsers}</div>
              <div className="stat-desc text-base-content">All registered users</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}