import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';

const Button = forwardRef(function Button(props, ref) {
  const { variant, size, className, children, ...otherProps } = props;

  const baseClasses = cn(
    'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
    // Default variant
    variant === 'default' &&
      'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500',
    // Secondary variant
    variant === 'secondary' &&
      'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-300',
    // Outline variant
    variant === 'outline' &&
      'border border-gray-300 text-gray-800 hover:bg-gray-100 focus:ring-blue-500',
    // Ghost variant
    variant === 'ghost' &&
      'text-gray-800 hover:bg-gray-100 focus:ring-blue-500',
    // Destructive variant
    variant === 'destructive' &&
      'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500',
    // Sizes
    size === 'sm' && 'px-3 py-1.5 text-sm',
    size === 'lg' && 'px-6 py-3 text-lg',
    size === 'icon' && 'p-2 rounded-full',
    // Default size
    !size && 'px-4 py-2',
    className
  );

  return (
    <button ref={ref} className={baseClasses} {...otherProps}>
      {children}
    </button>
  );
});
Button.displayName = 'Button';

export { Button };