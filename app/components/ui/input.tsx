import { InputHTMLAttributes } from 'react';
import { cn } from "../../lib/utils"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        'w-full px-3 py-2 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-hostel-gold focus:outline-none disabled:opacity-50',
        className
      )}
      {...props}
    />
  );
}