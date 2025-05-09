import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';

const Table = forwardRef(function Table(props, ref) {
  const { className, children, ...otherProps } = props;
  return (
    <table ref={ref} className={cn('w-full', className)} {...otherProps}>
      {children}
    </table>
  );
});
Table.displayName = 'Table';

const TableHeader = forwardRef(function TableHeader(props, ref) {
  const { className, children, ...otherProps } = props;
  return (
    <thead ref={ref} className={cn('', className)} {...otherProps}>
      {children}
    </thead>
  );
});
TableHeader.displayName = 'TableHeader';

const TableBody = forwardRef(function TableBody(props, ref) {
  const { className, children, ...otherProps } = props;
  return (
    <tbody ref={ref} className={cn('', className)} {...otherProps}>
      {children}
    </tbody>
  );
});
TableBody.displayName = 'TableBody';

const TableRow = forwardRef(function TableRow(props, ref) {
  const { className, children, ...otherProps } = props;
  return (
    <tr ref={ref} className={cn('', className)} {...otherProps}>
      {children}
    </tr>
  );
});
TableRow.displayName = 'TableRow';

const TableHead = forwardRef(function TableHead(props, ref) {
  const { className, children, ...otherProps } = props;
  return (
    <th
      ref={ref}
      className={cn(
        'px-4 py-2 font-medium text-left',
        className
      )}
      scope="col"
      {...otherProps}
    >
      {children}
    </th>
  );
});
TableHead.displayName = 'TableHead';

const TableCell = forwardRef(function TableCell(props, ref) {
  const { className, children, ...otherProps } = props;
  return (
    <td ref={ref} className={cn('px-4 py-2', className)} {...otherProps}>
      {children}
    </td>
  );
});
TableCell.displayName = 'TableCell';

export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell };