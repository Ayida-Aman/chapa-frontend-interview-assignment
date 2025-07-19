'use client';
import { useEffect, useState } from 'react';
import { getAdmins, addAdmin, removeAdmin } from '@/lib/api';

interface Admin {
  id: number;
  name: string;
  email: string;
}

export default function AdminManagement() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [removingId, setRemovingId] = useState<number | null>(null);

  useEffect(() => {
    setIsLoading(true);
    getAdmins()
      .then((data) => {
        setAdmins(data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');
    setIsSubmitting(true);

    if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMessage('Please enter a valid name and email.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await addAdmin({ name, email });
      setSuccessMessage(response.message);
      setName('');
      setEmail('');
      setTimeout(() => setSuccessMessage(''), 3000); 
      
    } catch {
      setErrorMessage('Failed to add admin. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemoveAdmin = async (id: number) => {
    setSuccessMessage('');
    setErrorMessage('');
    setRemovingId(id);
    try {
      const response = await removeAdmin(id);
      setSuccessMessage(response.message);
      setTimeout(() => setSuccessMessage(''), 3000); 
      setAdmins((prev) => prev.filter((admin) => admin.id !== id));
    } catch {
      setErrorMessage('Failed to remove admin. Please try again.');
    } finally {
      setRemovingId(null);
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl admin-management">
      <div className="card-body">
        <h2 className="card-title text-base-content">Manage Admins</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <form onSubmit={handleAddAdmin} className='lg:pr-52 sm:pr-0'>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base-content py-3">Name</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter admin name"
                  className="input focus:border-b-emerald-400 w-full"
                  disabled={isSubmitting}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base-content py-3">Email</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter admin email"
                  className="input focus:border-b-emerald-400 w-full"
                  disabled={isSubmitting}
                />
              </div>
              <div className="form-control mt-4">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    'Add Admin'
                  )}
                </button>
              </div>
            </form>
          </div>
          <div>
            {isLoading ? (
              <div className="animate-pulse">
                <div className="h-4 bg-base-300 rounded w-full mb-2"></div>
                <div className="h-4 bg-base-300 rounded w-full mb-2"></div>
              </div>
            ) : admins.length === 0 ? (
              <p className="text-base-content">No admins found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="table w-full table-zebra">
                  <thead>
                    <tr>
                      <th className="text-base-content text-sm md:text-base">ID</th>
                      <th className="text-base-content text-sm md:text-base">Name</th>
                      <th className="text-base-content text-sm md:text-base">Email</th>
                      <th className="text-base-content text-sm md:text-base min-w-[120px]">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {admins.map((admin) => (
                      <tr key={admin.id}>
                        <td className="text-base-content text-sm md:text-base">{admin.id}</td>
                        <td className="text-base-content text-sm md:text-base truncate max-w-[150px]">
                          {admin.name}
                        </td>
                        <td className="text-base-content text-sm md:text-base truncate max-w-[150px]">
                          {admin.email}
                        </td>
                        <td className="text-base-content">
                          <button
                            className="btn btn-sm btn-error"
                            onClick={() => handleRemoveAdmin(admin.id)}
                            disabled={removingId === admin.id}
                          >
                            {removingId === admin.id ? (
                              <span className="loading loading-spinner"></span>
                            ) : (
                              'Remove'
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
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