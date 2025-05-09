// ../components/ui/dialog.js (or your chosen path)
import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils'; // Assuming this path is correct
// You might want a Button component for DialogTrigger if it's not a direct child
// import { Button } from './button'; // If DialogTrigger is a Button variant

const Dialog = forwardRef(function Dialog(props, ref) {
  // This component is often a conceptual wrapper in libraries like Radix or HeadlessUI,
  // with DialogContent being the visible modal.
  // For simplicity, if 'open' prop is used, it could control rendering of children.
  const { children, open, onOpenChange, ...otherProps } = props;
  // If you are not using a library to manage the dialog state,
  // the 'open' prop would control the visibility of DialogContent.
  // This basic version doesn't implement overlay or portal logic itself.
  // It assumes 'children' will likely include DialogContent which is conditionally rendered by the parent.
  return open ? <>{children}</> : null; // Or just a fragment <>{children}</> if parent handles open
});
Dialog.displayName = 'Dialog';

const DialogTrigger = forwardRef(function DialogTrigger(props, ref) {
  const { className, children, ...otherProps } = props;
  // Often, DialogTrigger is just a button. You could use your existing Button component.
  // For a generic trigger, it can be a simple button or a span that receives an onClick.
  return (
    <button ref={ref} className={cn('', className)} {...otherProps}>
      {children}
    </button>
  );
});
DialogTrigger.displayName = 'DialogTrigger';

const DialogContent = forwardRef(function DialogContent(props, ref) {
  const { className, children, ...otherProps } = props;
  // This is the actual modal window.
  // For a real dialog, you'd add fixed positioning, overlay, etc.
  // This is a simplified version for structure.
  return (
    <div
      ref={ref}
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center p-4', // Basic overlay and centering
        className // Allows override of positioning if needed
      )}
      // onClick={(e) => e.stopPropagation()} // To prevent closing when clicking inside content if overlay handles close
    >
      <div
        className={cn(
            'bg-white rounded-lg border shadow-xl p-6 w-full max-w-md', // Default content styling
            'dark:bg-gray-800 dark:border-gray-700' // Optional dark mode styling
        )}
        {...otherProps}
      >
        {children}
      </div>
    </div>
  );
});
DialogContent.displayName = 'DialogContent';

const DialogHeader = forwardRef(function DialogHeader(props, ref) {
  const { className, children, ...otherProps } = props;
  return (
    <div ref={ref} className={cn('mb-4 text-center sm:text-left', className)} {...otherProps}>
      {children}
    </div>
  );
});
DialogHeader.displayName = 'DialogHeader';

const DialogTitle = forwardRef(function DialogTitle(props, ref) {
  const { className, children, ...otherProps } = props;
  return (
    <h2 ref={ref} className={cn('text-xl font-semibold leading-tight', className)} {...otherProps}>
      {children}
    </h2>
  );
});
DialogTitle.displayName = 'DialogTitle';

const DialogDescription = forwardRef(function DialogDescription(props, ref) {
  const { className, children, ...otherProps } = props;
  return (
    <p ref={ref} className={cn('text-sm text-gray-500 mt-1', className)} {...otherProps}>
      {children}
    </p>
  );
});
DialogDescription.displayName = 'DialogDescription';

const DialogFooter = forwardRef(function DialogFooter(props, ref) {
  const { className, children, ...otherProps } = props;
  return (
    <div ref={ref} className={cn('mt-6 flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 space-y-2 space-y-reverse sm:space-y-0', className)} {...otherProps}>
      {children}
    </div>
  );
});
DialogFooter.displayName = 'DialogFooter';

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
};