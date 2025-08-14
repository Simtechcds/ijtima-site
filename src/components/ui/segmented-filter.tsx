import React from 'react';
import { cn } from '@/lib/utils';

interface SegmentedFilterProps {
  sortOrder: 'asc' | 'desc';
  filterType: 'all' | 'with-audio' | 'pending';
  onSortChange: (order: 'asc' | 'desc') => void;
  onFilterChange: (filter: 'all' | 'with-audio' | 'pending') => void;
  onClearAll: () => void;
}

export const SegmentedFilter: React.FC<SegmentedFilterProps> = ({
  sortOrder,
  filterType,
  onSortChange,
  onFilterChange,
  onClearAll,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-4">
      {/* Sort Controls */}
      <div className="segmented">
        <button
          className={cn("seg", sortOrder === 'asc' && "seg-active")}
          data-state={sortOrder === 'asc' ? 'active' : 'inactive'}
          onClick={() => onSortChange('asc')}
        >
          Asc
        </button>
        <button
          className={cn("seg", sortOrder === 'desc' && "seg-active")}
          data-state={sortOrder === 'desc' ? 'active' : 'inactive'}
          onClick={() => onSortChange('desc')}
        >
          Desc
        </button>
      </div>

      {/* Filter Controls */}
      <div className="segmented flex-1">
        <button
          className={cn("seg", filterType === 'all' && "seg-active")}
          data-state={filterType === 'all' ? 'active' : 'inactive'}
          onClick={() => onFilterChange('all')}
        >
          All Items
        </button>
        <button
          className={cn("seg", filterType === 'with-audio' && "seg-active")}
          data-state={filterType === 'with-audio' ? 'active' : 'inactive'}
          onClick={() => onFilterChange('with-audio')}
        >
          Audios
        </button>
        <button
          className={cn("seg", filterType === 'pending' && "seg-active")}
          data-state={filterType === 'pending' ? 'active' : 'inactive'}
          onClick={() => onFilterChange('pending')}
        >
          Pending
        </button>
      </div>

      {/* Clear All Button */}
      <button
        onClick={onClearAll}
        className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground bg-secondary hover:bg-secondary/80 rounded-md border border-border transition-colors"
      >
        Clear All
      </button>
    </div>
  );
};