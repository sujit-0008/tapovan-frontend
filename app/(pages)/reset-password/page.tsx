'use client';

import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import Link from 'next/link';
import { useState, Suspense } from 'react';
import { useResetPassword } from '../../hooks/useResetPassword';
import { useSearchParams, useRouter } from 'next/navigation';

interface CustomError extends Error {
  response?: {
    data?: {
      message?: string;
    };
  };
}

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { mutate: resetPassword, isPending, error } = useResetPassword();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (token) {
      resetPassword(
        { token, newPassword: password },
        {
          onSuccess: () => {
            alert('Password reset successful. Please login with your new password.');
            router.push('/login');
          },
        }
      );
    }
  };

  return (
    <div className="min-h-screen from-hostel-gold/90 to-hostel-secondary/90 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl rounded-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-hostel-textDark">
              Reset Password
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-hostel-textDark"
                >
                  New Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white/80 focus:outline-none focus:ring-2 focus:ring-hostel-secondary"
                  disabled={isPending}
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium text-hostel-textDark"
                >
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                disabled={isPending || !token}
                className="w-full py-2 rounded-lg bg-hostel-secondary text-white font-semibold hover:bg-hostel-secondary/90 transition disabled:opacity-50"
              >
                {isPending ? 'Resetting...' : 'Reset Password'}
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

export default function ResetPassword() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ResetPasswordContent />
    </Suspense>
  );
}