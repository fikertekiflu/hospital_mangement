// /src/components/ui/alert.jsx
import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils'; // Make sure this path is correct for your project

const Alert = forwardRef(function Alert(props, ref) {
  const { className, variant, children, ...otherProps } = props;

  const baseClasses = cn(
    'relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground',
    !variant && 'bg-background text-foreground',
    variant === 'default' && 'bg-background text-foreground border-gray-300',
    variant === 'destructive' &&
      'border-red-500/50 text-red-700 dark:border-red-500 [&>svg]:text-red-500 bg-red-50 dark:bg-red-900/30 dark:text-red-400 dark:[&>svg]:text-red-400',
    className
  );

  return (
    <div ref={ref} role="alert" className={baseClasses} {...otherProps}>
      {children}
    </div>
  );
});
Alert.displayName = 'Alert'; // Make sure 'Alert' here matches the const name

const AlertTitle = forwardRef(function AlertTitle(props, ref) {
  const { className, children, ...otherProps } = props;
  return (
    <h5
      ref={ref}
      className={cn('mb-1 font-medium leading-none tracking-tight', className)}
      {...otherProps}
    >
      {children}
    </h5>
  );
});
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = forwardRef(function AlertDescription(props, ref) {
  const { className, children, ...otherProps } = props;
  return (
    <div
      ref={ref}
      className={cn('text-sm [&_p]:leading-relaxed', className)}
      {...otherProps}
    >
      {children}
    </div>
  );
});
AlertDescription.displayName = 'AlertDescription';

// ---- THIS IS THE MOST IMPORTANT LINE FOR THE ERROR ----
export { Alert, AlertTitle, AlertDescription };
// ---------------------------------------------------------