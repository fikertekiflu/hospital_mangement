// ../components/ui/dialog.js
import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';
// import { X } from 'lucide-react'; // Optional: if you want a close button in DialogContent

const Dialog = forwardRef(function Dialog(props, ref) {
  const { children, open, onOpenChange, ...otherProps } = props;
  // This component will render its children (which should include DialogContent)
  // only when the 'open' prop is true.
  // The onOpenChange prop is used by the parent page to control the 'open' state.
  if (!open) {
    return null;
  }
  return <div ref={ref} {...otherProps}>{children}</div>; // Render children directly when open
});
Dialog.displayName = 'Dialog';

const DialogTrigger = forwardRef(function DialogTrigger(props, ref) {
  const { className, children, ...otherProps } = props;
  // This is a basic trigger. In your RoomManagementPage, you're using a separate
  // Button to control the dialog's open state, which is also perfectly fine.
  return (
    <button ref={ref} className={cn('', className)} {...otherProps}>
      {children}
    </button>
  );
});
DialogTrigger.displayName = 'DialogTrigger';

const DialogContent = forwardRef(function DialogContent(props, ref) {
  const { className, children, onOverlayClick, // Example prop if you want overlay click to close
    ...otherProps } = props;

  return (
    // This outer div is the semi-transparent overlay and centering container.
    // MODIFICATION: Changed 'fixed' to 'absolute' and added overlay background.
    <div
      ref={ref}
      className={cn(
        'absolute inset-0 z-40 flex items-center justify-center p-4 bg-black bg-opacity-50', // Changed to 'absolute', added bg
        className
      )}
      onClick={onOverlayClick} // Call this if overlay click should close the dialog
    >
      {/* This inner div is the actual modal panel. */}
      <div
        className={cn(
          'bg-white rounded-lg border shadow-xl p-6 w-full max-w-md relative', // Added 'relative' for potential internal absolutely positioned elements (e.g., a close button)
          // 'dark:bg-gray-800 dark:border-gray-700' // Optional dark mode
        )}
        onClick={(e) => e.stopPropagation()} // Prevents clicks inside the modal from bubbling up to the overlay
        {...otherProps}
      >
        {/* Optional: Add a close button inside the modal panel
        {onOverlayClick && ( // Assuming onOverlayClick is also your close handler
          <button
            onClick={onOverlayClick}
            className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100"
            aria-label="Close dialog"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>
        )}
        */}
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