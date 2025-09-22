
import { cn } from "../../lib/utils"
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
}

export function Button({ className, variant = 'default', ...props }: ButtonProps) {
  const baseStyles = 'px-4 py-2 rounded-xl font-medium text-sm sm:text-base transition';
  const variantStyles = {
    default: 'bg-hostel-gold text-white hover:bg-hostel-gold/90 disabled:opacity-50',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50',
    ghost: 'text-gray-700 hover:bg-gray-100 disabled:opacity-50',
  };

  return (
    <button
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    />  
  );
}


