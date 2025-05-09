import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';

const Card = forwardRef(function Card(props, ref) {
  const { className, children, ...otherProps } = props;
  return (
    <div ref={ref} className={cn('bg-white rounded-lg border shadow-md', className)} {...otherProps}>
      {children}
    </div>
  );
});
Card.displayName = 'Card';

const CardHeader = forwardRef(function CardHeader(props, ref) {
  const { className, children, ...otherProps } = props;
  return (
    <div ref={ref} className={cn('p-6', className)} {...otherProps}>
      {children}
    </div>
  );
});
CardHeader.displayName = 'CardHeader';

const CardTitle = forwardRef(function CardTitle(props, ref) {
  const { className, children, ...otherProps } = props;
  return (
    <div ref={ref} className={cn('text-2xl font-semibold', className)} {...otherProps}>
      {children}
    </div>
  );
});
CardTitle.displayName = 'CardTitle';

const CardDescription = forwardRef(function CardDescription(props, ref) {
  const { className, children, ...otherProps } = props;
  return (
    <div ref={ref} className={cn('text-gray-500', className)} {...otherProps}>
      {children}
    </div>
  );
});
CardDescription.displayName = 'CardDescription';

const CardContent = forwardRef(function CardContent(props, ref) {
  const { className, children, ...otherProps } = props;
  return (
    <div ref={ref} className={cn('p-6', className)} {...otherProps}>
      {children}
    </div>
  );
});
CardContent.displayName = 'CardContent';

export { Card, CardHeader, CardTitle, CardDescription, CardContent };