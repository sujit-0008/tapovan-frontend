'use client';

import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import Link from 'next/link';
import { useState } from 'react';
import { useLogin } from '../../hooks/useLogin';

export default function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const { mutate: login, isPending, error } = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(credentials);
  };

  return (
    <div className="min-h-screen from-hostel-gold/90 to-hostel-secondary/90 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl rounded-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-hostel-textDark">Welcome Back</CardTitle>
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
                  value={credentials.email}
                  onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white/80 focus:outline-none focus:ring-2 focus:ring-hostel-secondary"
                  disabled={isPending}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-hostel-textDark">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white/80 focus:outline-none focus:ring-2 focus:ring-hostel-secondary"
                  disabled={isPending}
                />
              </div>
              {error && (
                <div className="text-red-500 text-sm">
                  {error.response?.data?.errors?.[0] || 'An error occurred'}
                </div>
              )}
              <div className="text-left">
                <Link
                  href="/forgot-password"
                  className="text-hostel-secondary hover:text-hostel-secondary/80 text-sm font-medium"
                >
                  Forgot Password?
                </Link>
              </div>
              <button
                type="submit"
                disabled={isPending}
                className="w-full py-2 rounded-lg bg-hostel-secondary text-white font-semibold hover:bg-hostel-secondary/90 transition disabled:opacity-50"
              >
                {isPending ? 'Logging in...' : 'Login'}
              </button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}