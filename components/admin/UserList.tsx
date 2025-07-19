'use client';
import { useEffect, useState } from 'react';
import { getUsers, toggleUserStatus } from '@/lib/api';

interface User {
  id: number;
  name: string;
  email: string;
  status: string;
  totalPayments: number;
}

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [togglingId, setTogglingId] = useState<number | null>(null);

  useEffect(() => {
    setIsLoading(true);
    getUsers()
      .then((data) => {
        setUsers(data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  const handleToggleStatus = async (id: number, currentStatus: string) => {
    setSuccessMessage('');
    setErrorMessage('');
    setTogglingId(id);
    try {
      const response = await toggleUserStatus(id, currentStatus);
      setUsers((prev) =>
        prev.map((user) =>
          user.id === id ? { ...user, status: response.status } : user
        )
      );
      setSuccessMessage(`User ${id} status updated to ${response.status}`);
      setTimeout(() => setSuccessMessage(''), 3000); // Clear toast after 3 seconds
    } catch {
      setErrorMessage('Failed to update user status. Please try again.');
    } finally {
      setTogglingId(null);
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl user-list">
      <div className="card-body">
        <h2 className="card-title text-base-content">Manage Users</h2>
        {isLoading ? (
          <div className="animate-pulse">
            <div className="h-4 bg-base-300 rounded w-full mb-2"></div>
            <div className="h-4 bg-base-300 rounded w-full mb-2"></div>
          </div>
        ) : users.length === 0 ? (
          <p className="text-base-content">No users found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full table-zebra">
              <thead>
                <tr>
                  <th className="text-base-content text-sm md:text-base">ID</th>
                  <th className="text-base-content text-sm md:text-base">Name</th>
                  <th className="text-base-content text-sm md:text-base">Email</th>
                  <th className="text-base-content text-sm md:text-base">Status</th>
                  <th className="text-base-content text-sm md:text-base min-w-[120px]">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="text-base-content text-sm md:text-base">{user.id}</td>
                    <td className="text-base-content text-sm md:text-base truncate max-w-[100px]">
                      {user.name}
                    </td>
                    <td className="text-base-content text-sm md:text-base truncate max-w-[150px]">
                      {user.email}
                    </td>
                    <td className="text-base-content text-sm md:text-base">
                      <span
                        className={`badge ${
                          user.status === 'Active' ? 'badge-success' : 'badge-warning'
                        } text-xs md:text-sm whitespace-nowrap`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="text-base-content">
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => handleToggleStatus(user.id, user.status)}
                        disabled={togglingId === user.id}
                      >
                        {togglingId === user.id ? (
                          <span className="loading loading-spinner"></span>
                        ) : (
                          `Set ${user.status === 'Active' ? 'Inactive' : 'Active'}`
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {successMessage && (
          <div className="toast toast-top toast-center">
            <div className="alert alert-success">
              <span>{successMessage}</span>
            </div>
          </div>
        )}
        {errorMessage && (
          <div className="toast toast-top toast-center">
            <div className="alert alert-error">
              <span>{errorMessage}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}