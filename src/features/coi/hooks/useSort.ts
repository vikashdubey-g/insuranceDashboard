import { useState, useMemo } from 'react';

export type SortDirection = 'asc' | 'desc' | null;

export const useSort = <T,>(data: T[], initialSortKey: keyof T | null = null, initialSortDir: SortDirection = null) => {
  const [sortKey, setSortKey] = useState<keyof T | null>(initialSortKey);
  const [sortDir, setSortDir] = useState<SortDirection>(initialSortDir);

  const requestSort = (key: keyof T) => {
    let newDir: SortDirection = 'asc';
    if (sortKey === key) {
      if (sortDir === 'asc') {
        newDir = 'desc';
      } else if (sortDir === 'desc') {
        newDir = null; // reset sort
      }
    }
    
    // If resetting sort, clear the key too
    if (newDir === null) {
      setSortKey(null);
      setSortDir(null);
    } else {
      setSortKey(key);
      setSortDir(newDir);
    }
  };

  const sortedData = useMemo(() => {
    if (!sortKey || !sortDir) return data;

    return [...data].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];

      // Handle nulls/undefined to be pushed to the bottom
      if (aVal === null || aVal === undefined) return 1;
      if (bVal === null || bVal === undefined) return -1;

      // Type checking for dates if needed or rely on string/number comparison
      if (aVal < bVal) {
        return sortDir === 'asc' ? -1 : 1;
      }
      if (aVal > bVal) {
        return sortDir === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortKey, sortDir]);

  return { sortKey, sortDir, requestSort, sortedData };
};
