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
    <div className="flex flex-col sm:flex-row gap-3 mb-4 p-4 bg-[hsl(var(--plum))]/28 rounded-xl border border-border/50 backdrop-blur-md">
      {/* Sort Controls */}
      <div className="flex gap-2">
        <button
          className={cn(
            "px-4 py-2 text-sm font-medium rounded-md border border-border/50 backdrop-blur-md transition-all text-shadow-soft",
            sortOrder === 'asc' 
              ? "bg-[hsl(var(--plum-deep))]/60 text-foreground border-foreground/30" 
              : "bg-[hsl(var(--plum))]/40 text-foreground/80 hover:bg-[hsl(var(--plum-deep))]/40"
          )}
          onClick={() => onSortChange('asc')}
        >
          Asc
        </button>
        <button
          className={cn(
            "px-4 py-2 text-sm font-medium rounded-md border border-border/50 backdrop-blur-md transition-all text-shadow-soft",
            sortOrder === 'desc' 
              ? "bg-[hsl(var(--plum-deep))]/60 text-foreground border-foreground/30" 
              : "bg-[hsl(var(--plum))]/40 text-foreground/80 hover:bg-[hsl(var(--plum-deep))]/40"
          )}
          onClick={() => onSortChange('desc')}
        >
          Desc
        </button>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-1 gap-2">
        <button
          className={cn(
            "flex-1 px-4 py-2 text-sm font-medium rounded-md border border-border/50 backdrop-blur-md transition-all text-shadow-soft",
            filterType === 'all' 
              ? "bg-[hsl(var(--plum-deep))]/60 text-foreground border-foreground/30" 
              : "bg-[hsl(var(--plum))]/40 text-foreground/80 hover:bg-[hsl(var(--plum-deep))]/40"
          )}
          onClick={() => onFilterChange('all')}
        >
          All Items
        </button>
        <button
          className={cn(
            "flex-1 px-4 py-2 text-sm font-medium rounded-md border border-border/50 backdrop-blur-md transition-all text-shadow-soft",
            filterType === 'with-audio' 
              ? "bg-[hsl(var(--plum-deep))]/60 text-foreground border-foreground/30" 
              : "bg-[hsl(var(--plum))]/40 text-foreground/80 hover:bg-[hsl(var(--plum-deep))]/40"
          )}
          onClick={() => onFilterChange('with-audio')}
        >
          Audios
        </button>
        <button
          className={cn(
            "flex-1 px-4 py-2 text-sm font-medium rounded-md border border-border/50 backdrop-blur-md transition-all text-shadow-soft",
            filterType === 'pending' 
              ? "bg-[hsl(var(--plum-deep))]/60 text-foreground border-foreground/30" 
              : "bg-[hsl(var(--plum))]/40 text-foreground/80 hover:bg-[hsl(var(--plum-deep))]/40"
          )}
          onClick={() => onFilterChange('pending')}
        >
          Pending
        </button>
      </div>

      {/* Clear All Button */}
      <button
        onClick={onClearAll}
        className="px-4 py-2 text-sm font-medium text-foreground hover:text-foreground/80 bg-[hsl(var(--plum-deep))]/60 hover:bg-[hsl(var(--plum-deep))]/80 rounded-md border border-border/50 transition-colors text-shadow-soft backdrop-blur-md"
      >
        Clear All
      </button>
    </div>
  );
};