'use client';
import { useEffect, useState } from 'react';
import { getTransactions } from '@/lib/api';

interface Transaction {
  id: number;
  date: string;
  recipient: string;
  amount: number;
  status: string;
}

export default function TransactionList() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getTransactions()
      .then((data) => {
        setTransactions(data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  return (
    <div className="card bg-base-100 shadow-xl transaction-list">
      <div className="card-body">
        <h2 className="card-title text-base-content">Recent Transactions</h2>
        {isLoading ? (
          <div className="animate-pulse">
            <div className="h-4 bg-base-300 rounded w-full mb-2"></div>
            <div className="h-4 bg-base-300 rounded w-full mb-2"></div>
          </div>
        ) : transactions.length === 0 ? (
          <p className="text-base-content">No transactions found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full table-zebra">
              <thead>
                <tr>
                  <th className="text-base-content text-sm md:text-base">Date</th>
                  <th className="text-base-content text-sm md:text-base">Recipient</th>
                  <th className="text-base-content text-sm md:text-base">Amount</th>
                  <th className="text-base-content text-sm md:text-base min-w-[100px]">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="text-base-content text-sm md:text-base truncate max-w-[100px]">
                      {transaction.date}
                    </td>
                    <td className="text-base-content text-sm md:text-base truncate max-w-[100px]">
                      {transaction.recipient}
                    </td>
                    <td className="text-base-content text-sm md:text-base">
                      ${transaction.amount.toFixed(2)}
                    </td>
                    <td className="text-base-content">
                      <span
                        className={`badge ${
                          transaction.status === 'Completed' ? 'badge-success' : 'badge-warning'
                        } text-xs md:text-sm whitespace-nowrap`}
                      >
                        {transaction.status}
                      </span>
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