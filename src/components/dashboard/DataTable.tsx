'use client';

import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, CircularProgress, Typography } from '@mui/material';
import { ReactNode } from 'react';

export interface Column<T> {
  key: string;
  label: string;
  render?: (row: T) => ReactNode;
  align?: 'left' | 'right' | 'center';
  width?: string | number;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  rows: T[];
  keyField: keyof T;
  loading?: boolean;
  total?: number;
  page?: number;
  rowsPerPage?: number;
  onPageChange?: (page: number) => void;
  onRowsPerPageChange?: (rows: number) => void;
  emptyMessage?: string;
}

export default function DataTable<T extends object>({
  columns, rows, keyField, loading = false, total, page = 0, rowsPerPage = 10,
  onPageChange, onRowsPerPageChange, emptyMessage = 'موردی یافت نشد'
}: DataTableProps<T>) {
  return (
    <Paper sx={{ borderRadius: 2, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: '#1E2A4A' }}>
              {columns.map((col) => (
                <TableCell key={col.key} align={col.align || 'right'} sx={{ color: 'white', fontFamily: 'Vazirmatn, sans-serif', fontWeight: 600, fontSize: '0.8rem', width: col.width, borderBottom: 'none', py: 1.5 }}>
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={columns.length} align="center" sx={{ py: 6 }}><CircularProgress size={32} sx={{ color: '#C9A84C' }} /></TableCell></TableRow>
            ) : rows.length === 0 ? (
              <TableRow><TableCell colSpan={columns.length} align="center" sx={{ py: 6 }}><Typography sx={{ fontFamily: 'Vazirmatn, sans-serif', color: 'text.secondary' }}>{emptyMessage}</Typography></TableCell></TableRow>
            ) : rows.map((row, i) => (
              <TableRow key={String((row as Record<string, unknown>)[keyField as string])} sx={{ bgcolor: i % 2 === 0 ? 'white' : '#fafafa', '&:hover': { bgcolor: '#f0f4ff' }, transition: 'background 0.15s' }}>
                {columns.map((col) => (
                  <TableCell key={col.key} align={col.align || 'right'} sx={{ fontFamily: 'Vazirmatn, sans-serif', fontSize: '0.85rem', py: 1.5, borderBottom: '1px solid #f0f0f0' }}>
                    {col.render ? col.render(row) : String((row as Record<string, unknown>)[col.key] ?? '')}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {total !== undefined && onPageChange && (
        <TablePagination
          component="div" count={total} page={page} rowsPerPage={rowsPerPage}
          onPageChange={(_, p) => onPageChange(p)}
          onRowsPerPageChange={(e) => onRowsPerPageChange?.(parseInt(e.target.value))}
          rowsPerPageOptions={[10, 25, 50]}
          labelRowsPerPage="ردیف در صفحه:"
          labelDisplayedRows={({ from, to, count }) => `${from}–${to} از ${count}`}
          sx={{ fontFamily: 'Vazirmatn, sans-serif', borderTop: '1px solid #f0f0f0' }}
        />
      )}
    </Paper>
  );
}
