'use client';
import { useEffect, useState } from 'react';
import { getUsers } from '@/lib/api';

interface User {
  id: number;
  name: string;
  email: string;
  status: string;
  totalPayments: number;
}

export default function UserPaymentSummary() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getUsers()
      .then((data) => {
        setUsers(data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  return (
    <div className="card bg-base-100 shadow-xl user-payment-summary">
      <div className="card-body">
        <h2 className="card-title text-base-content">User Payment Summary</h2>
        {isLoading ? (
          <div className="animate-pulse">
            <div className="h-4 bg-base-300 rounded w-full mb-2"></div>
            <div className="h-4 bg-base-300 rounded w-full mb-2"></div>
          </div>
        ) : users.length === 0 ? (
          <p className="text-base-content">No user payments found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full table-zebra">
              <thead>
                <tr>
                  <th className="text-base-content text-sm md:text-base">ID</th>
                  <th className="text-base-content text-sm md:text-base">Name</th>
                  <th className="text-base-content text-sm md:text-base min-w-[120px]">
                    Total Payments ($)
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="text-base-content text-sm md:text-base">{user.id}</td>
                    <td className="text-base-content text-sm md:text-base truncate max-w-[150px]">
                      {user.name}
                    </td>
                    <td className="text-base-content text-sm md:text-base">
                      ${user.totalPayments.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}