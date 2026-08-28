import React from 'react';
import { Database, X } from 'lucide-react';
import { Button } from '../button';

export interface DataTableEmptyProps {
  title?: string;
  description?: string;
  onClearFilters?: () => void;
}

export const DataTableEmpty: React.FC<DataTableEmptyProps> = ({
  title = 'No records found',
  description = 'Try adjusting your search query or filters to find what you are looking for.',
  onClearFilters,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted/60 text-muted-foreground mb-3">
        <Database className="h-6 w-6" />
      </div>
      <h3 className="text-sm font-bold text-foreground">{title}</h3>
      <p className="text-xs text-muted-foreground mt-1 max-w-sm">{description}</p>
      {onClearFilters && (
        <Button
          variant="outline"
          size="sm"
          onClick={onClearFilters}
          className="mt-4"
          leftIcon={<X className="h-3.5 w-3.5" />}
        >
          Clear Search Filter
        </Button>
      )}
    </div>
  );
};
