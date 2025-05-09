// ../components/ui/input.js (or your chosen path)
import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils'; // Assuming this path is correct

const Input = forwardRef(function Input(props, ref) {
  const { className, type, ...otherProps } = props;

  const baseClasses = cn(
    'flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
    // You can add more specific styles based on type if needed, e.g.,
    // type === 'file' && 'file:border-0 file:bg-transparent file:text-sm file:font-medium',
    className
  );

  return (
    <input
      type={type}
      className={baseClasses}
      ref={ref}
      {...otherProps}
    />
  );
});
Input.displayName = 'Input';

export { Input };