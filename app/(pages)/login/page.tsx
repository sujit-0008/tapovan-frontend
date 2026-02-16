'use client';

import { Card, CardContent, CardHeader } from '../../components/ui/card';
import Link from 'next/link';
import { useState } from 'react';
import { useLogin } from '../../hooks/useLogin';



interface CustomError extends Error {
  response?: {
    data?: {
      message?: string;
      errors?: string[];
    };
  };
}

export default function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const { mutate: login, isPending, error } = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(credentials);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-hostel-gold/90 to-hostel-secondary/90 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl rounded-3xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-2">
            <h1 className="text-3xl font-bold text-hostel-secondary mb-2">Welcome Back</h1>
            <p className="text-hostel-textLight">Sign in to your account</p>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-hostel-textDark ml-1">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={credentials.email}
                  onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-hostel-gold/50 transition-all duration-200"
                  disabled={isPending}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-hostel-textDark ml-1">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-hostel-gold/50 transition-all duration-200"
                  disabled={isPending}
                />
              </div>
              
              <div className="flex justify-end">
                <Link 
                  href="/forgot-password"
                  className="text-sm font-medium text-hostel-secondary hover:text-hostel-gold transition-colors duration-200"
                >
                  Forgot Password?
                </Link>
              </div>

              {error && (
                <div className="p-3 rounded-xl bg-red-50 text-red-500 text-sm font-medium text-center border border-red-100">
                  {(error as CustomError).response?.data?.errors?.[0] || 'An error occurred'}
                </div>
              )}

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