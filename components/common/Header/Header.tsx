'use client';
import { useAuth } from '@/lib/context/AuthContext';
import { useState } from 'react';
import './Header.css'
import logo from './../../../public/images/image.png'
export default function Header() {
  const { role, setRole } = useAuth();
  const [logoutMessage, setLogoutMessage] = useState('');

  const handleLogout = () => {
    setLogoutMessage('Logged out successfully');
    setTimeout(() => {
      setRole(null); 
    }, 1000); 
  };

  return (
    <div className="navbar text-primary-content pr-5">
      <div className="flex-1">
<button className='logoWrapper'>
  <div className="svg-wrapper-1">
    <div className="svg-wrapper">
      <img src={logo.src} alt="" />
    </div>
  </div>
  <span className='text-gray-300 font-serif hover:text-emerald-400'>Chapa Dashboard</span>
</button>

      </div>
      <div className="flex-none">
        {role && (
          <>
            <button className="btn btn-outline btn-primary font-serif font-extrabold" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
      {logoutMessage && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>{logoutMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
}