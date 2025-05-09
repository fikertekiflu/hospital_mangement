// ../components/ui/select.js
import React, { useState, createContext, useContext, forwardRef } from 'react';
import { cn } from '../../lib/utils';
import { ChevronDown } from 'lucide-react'; // Import an icon

// 1. Create Context
const SelectContext = createContext(null);

const Select = forwardRef(function Select(props, ref) {
  const { className, children, value, onValueChange, defaultValue, ...otherProps } = props;
  const [isOpen, setIsOpen] = useState(false);

  // The 'value' prop makes this a controlled component.
  // 'onValueChange' is the callback to inform the parent of selection.

  const handleSelect = (itemValue) => {
    if (onValueChange) {
      onValueChange(itemValue);
    }
    setIsOpen(false); // Close dropdown after selection
  };

  const contextValue = {
    isOpen,
    setIsOpen,
    selectedValue: value, // Pass the controlled value to context
    handleSelect,
  };

  return (
    <SelectContext.Provider value={contextValue}>
      <div ref={ref} className={cn('relative', className)} {...otherProps}>
        {children}
      </div>
    </SelectContext.Provider>
  );
});
Select.displayName = 'Select';

const SelectTrigger = forwardRef(function SelectTrigger(props, ref) {
  const { className, children, ...otherProps } = props;
  const context = useContext(SelectContext);

  if (!context) {
    throw new Error("SelectTrigger must be used within a Select provider");
  }
  const { setIsOpen, isOpen } = context;

  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        'flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        // 'dark:bg-gray-700 dark:text-white dark:border-gray-600', // Optional dark mode
        className
      )}
      onClick={() => setIsOpen(prev => !prev)} // Toggle open state
      aria-haspopup="listbox"
      aria-expanded={isOpen}
      {...otherProps}
    >
      {children} {/* This will render SelectValue as passed from RoomForm */}
      <ChevronDown
        className={cn(
          "h-4 w-4 opacity-50 ml-2 transition-transform duration-200 ease-in-out",
          isOpen && "rotate-180"
        )}
      />
    </button>
  );
});
SelectTrigger.displayName = 'SelectTrigger';

const SelectValue = forwardRef(function SelectValue(props, ref) {
  const { className, children, placeholder, ...otherProps } = props;
  const context = useContext(SelectContext);

  if (!context) {
    throw new Error("SelectValue must be used within a Select provider");
  }
  const { selectedValue } = context;

  // If children are explicitly passed to SelectValue, they take precedence.
  // Otherwise, display the selectedValue from context, or the placeholder.
  // In your RoomForm, you pass <SelectValue placeholder="..." />, so children is undefined initially.
  const displayContent = children || selectedValue || <span className="text-gray-400">{placeholder}</span>;

  return (
    <span ref={ref} className={cn('truncate', className)} {...otherProps}>
      {displayContent}
    </span>
  );
});
SelectValue.displayName = 'SelectValue';

const SelectContent = forwardRef(function SelectContent(props, ref) {
  const { className, children, ...otherProps } = props;
  const context = useContext(SelectContext);

  if (!context) {
    throw new Error("SelectContent must be used within a Select provider");
  }
  const { isOpen } = context;

  if (!isOpen) { // Conditionally render or hide content
    return null;
  }

  return (
    <div
      ref={ref}
      className={cn(
        'absolute z-50 mt-1 w-full rounded-md border bg-white shadow-lg p-1 max-h-60 overflow-y-auto', // Added max-h and overflow
        // 'dark:bg-gray-800 dark:border-gray-700', // Optional dark mode
        className
      )}
      role="listbox"
      {...otherProps}
    >
      {children}
    </div>
  );
});
SelectContent.displayName = 'SelectContent';

const SelectItem = forwardRef(function SelectItem(props, ref) {
  const { className, children, value, ...otherProps } = props;
  const context = useContext(SelectContext);

  if (!context) {
    throw new Error("SelectItem must be used within a Select provider");
  }
  const { handleSelect, selectedValue } = context;
  const isSelected = selectedValue === value;

  return (
    <div
      ref={ref}
      className={cn(
        'relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 px-3 text-sm outline-none hover:bg-gray-100 focus:bg-gray-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        // 'dark:hover:bg-gray-700 dark:focus:bg-gray-700', // Optional dark mode
        isSelected && 'bg-blue-100 text-blue-700 font-medium', // Style for selected item
        className
      )}
      onClick={() => handleSelect(value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleSelect(value);
        }
      }}
      role="option"
      aria-selected={isSelected}
      tabIndex={0}
      data-value={value} // Useful for debugging or more advanced logic
      {...otherProps}
    >
      {/* You could add a checkmark icon here for selected item if desired */}
      {children}
    </div>
  );
});
SelectItem.displayName = 'SelectItem';

export {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
};