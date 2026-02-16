'use client';

import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import Link from 'next/link';
import { useState } from 'react';
import { useRequestPasswordReset } from '../../hooks/useRequestPasswordReset';


interface CustomError extends Error {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const { mutate: requestReset, isPending, error } = useRequestPasswordReset();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    requestReset({ email });
  };

  return (
    <div className="min-h-screen from-hostel-gold/90 to-hostel-secondary/90 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl rounded-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-hostel-textDark">
              Forgot Password
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-hostel-textDark">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white/80 focus:outline-none focus:ring-2 focus:ring-hostel-secondary"
                  disabled={isPending}
                />
              </div>
              {error && (
                <div className="text-red-500 text-sm">
                  {(error as CustomError).response?.data?.message || 'An error occurred'}
                </div>
              )}
              <button
                type="submit"
                disabled={isPending}
                className="w-full py-2 rounded-lg bg-hostel-secondary text-white font-semibold hover:bg-hostel-secondary/90 transition disabled:opacity-50"
              >
                {isPending ? 'Submitting...' : 'Submit'}
              </button>
              <div className="text-center">
                <Link
                  href="/login"
                  className="text-hostel-secondary hover:text-hostel-secondary/80 text-sm font-medium"
                >
                  Back to Login
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}