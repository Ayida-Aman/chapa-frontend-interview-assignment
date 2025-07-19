'use client';
import { useState } from 'react';
import { submitTransaction } from '@/lib/api';

export default function TransactionForm() {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');
    setIsSubmitting(true);

    const amountNum = parseFloat(amount);
    if (!recipient || isNaN(amountNum) || amountNum <= 0) {
      setErrorMessage('Please enter a valid recipient and amount.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await submitTransaction({ recipient, amount: amountNum });
      setSuccessMessage(response.message);
      setRecipient('');
      setAmount('');
      setTimeout(() => setSuccessMessage(''), 3000); // Clear toast after 3 seconds
    } catch {
      setErrorMessage('Failed to send transaction. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl transaction-form sm:w-full lg:w-1/3 pl-5 pr-20">
      <div className="card-body">
        <h2 className="card-title text-base-content">Send Money</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-base-content py-3">Recipient</span>
            </label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="Enter recipient name"
              className="input w-full focus:border-b-emerald-400"
              disabled={isSubmitting}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-base-content py-3">Amount ($)</span>
            </label>
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="input focus:border-b-emerald-400 w-full"
              min="0.01"
              step="0.01"
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
                'Send'
              )}
            </button>
          </div>
        </form>
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