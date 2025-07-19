'use client';
import { useEffect, useState } from 'react';
import { getWalletBalance } from '@/lib/api';

export default function WalletBalance() {
  const [balance, setBalance] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getWalletBalance()
      .then((data) => {
        setBalance(data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  return (
    <div className="card bg-base-100 shadow-xl wallet-card">
      <div className="card-body">
        <h2 className="card-title text-base-content">Available Balance</h2>
        {isLoading ? (
          <div className="animate-pulse">
            <div className="h-8 bg-base-300 rounded w-1/2"></div>
          </div>
        ) : (
          <p className="text-3xl font-bold text-base-content">${balance?.toFixed(2) ?? '0.00'}</p>
        )}
      </div>
    </div>
  );
}