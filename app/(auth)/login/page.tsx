'use client';
import { useAuth } from '@/lib/context/AuthContext';
import './login.css'
export default function LoginPage() {
  const { setRole } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="outer-card bg-base-100 shadow-xl">
        <div className="card-body">
          <h1 className="text-2xl font-bold">Select Role</h1>
          <div className="dropdown dropdown-hover  no-overflow mt-2">
            <label tabIndex={0} className="btn btn-primary w-full">
              Choose Role
            </label>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-full z-50">
              <li>
                <button onClick={() => setRole('User')} className="text-left">
                  User
                </button>
              </li>
              <li>
                <button onClick={() => setRole('Admin')} className="text-left">
                  Admin
                </button>
              </li>
              <li>
                <button onClick={() => setRole('Super Admin')} className="text-left">
                  Super Admin
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}