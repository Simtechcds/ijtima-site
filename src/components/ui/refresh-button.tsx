import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { useState } from "react";

interface RefreshButtonProps {
  onRefresh: () => Promise<void> | void;
  className?: string;
}

export function RefreshButton({ onRefresh, className = "" }: RefreshButtonProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await onRefresh();
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleRefresh}
      disabled={isRefreshing}
      className={`flex items-center gap-2 ${className}`}
    >
      <RotateCcw 
        className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} 
      />
      <span className="hidden sm:inline">Refresh</span>
    </Button>
  );
}