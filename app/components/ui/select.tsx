
import { SelectHTMLAttributes } from 'react';
import { cn } from "../../lib/utils"

type SelectProps = SelectHTMLAttributes<HTMLSelectElement>

export function Select({ className, ...props }: SelectProps) {
  return (
    <select
      className={cn(
        'w-full px-3 py-2 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-hostel-gold focus:outline-none disabled:opacity-50',
        className
      )}
      {...props}
    />
  );
}
