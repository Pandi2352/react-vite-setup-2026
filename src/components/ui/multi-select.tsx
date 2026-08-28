import React, { useState, useRef, useEffect } from 'react';
import { Check, ChevronDown, X, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from './badge';

export interface MultiSelectOption {
  value: string;
  label: string;
}

export interface MultiSelectProps {
  label?: string;
  options: MultiSelectOption[];
  value?: string[];
  onChange?: (selected: string[]) => void;
  placeholder?: string;
  error?: string;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  label,
  options,
  value = [],
  onChange,
  placeholder = 'Select options...',
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string[]>(value);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelected(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOption = (val: string) => {
    const next = selected.includes(val)
      ? selected.filter((item) => item !== val)
      : [...selected, val];
    setSelected(next);
    if (onChange) onChange(next);
  };

  const removeTag = (val: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const next = selected.filter((item) => item !== val);
    setSelected(next);
    if (onChange) onChange(next);
  };

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div ref={containerRef} className="w-full space-y-1.5 relative">
      {label && <label className="block text-sm font-medium text-foreground">{label}</label>}

      {/* Main Select Button Box */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex min-h-[40px] w-full flex-wrap items-center justify-between gap-1.5 rounded-md border border-input bg-card px-3 py-1.5 text-sm ring-offset-background cursor-pointer hover:border-primary/50 transition-colors',
          isOpen && 'border-primary ring-2 ring-ring ring-offset-1',
          error && 'border-destructive'
        )}
      >
        <div className="flex flex-wrap gap-1 items-center flex-1">
          {selected.length === 0 ? (
            <span className="text-muted-foreground">{placeholder}</span>
          ) : (
            selected.map((val) => {
              const labelText = options.find((o) => o.value === val)?.label || val;
              return (
                <Badge key={val} variant="secondary" className="gap-1 pr-1 text-xs">
                  <span>{labelText}</span>
                  <button
                    type="button"
                    onClick={(e) => removeTag(val, e)}
                    className="rounded-full hover:bg-muted-foreground/20 p-0.5 cursor-pointer"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              );
            })
          )}
        </div>
        <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
      </div>

      {/* Dropdown Options List */}
      {isOpen && (
        <div className="absolute z-50 mt-1 w-full rounded-md border border-border bg-card p-2 shadow-xl animate-in zoom-in-95">
          <div className="flex items-center gap-2 px-2 pb-2 border-b border-border">
            <Search className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
            <input
              type="text"
              placeholder="Search choices..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-xs text-foreground focus:outline-none placeholder:text-muted-foreground"
            />
          </div>

          <div className="max-h-48 overflow-y-auto pt-1 space-y-0.5">
            {filteredOptions.length === 0 ? (
              <p className="p-2 text-center text-xs text-muted-foreground">No options found</p>
            ) : (
              filteredOptions.map((opt) => {
                const isChecked = selected.includes(opt.value);
                return (
                  <div
                    key={opt.value}
                    onClick={() => toggleOption(opt.value)}
                    className={cn(
                      'flex items-center justify-between px-3 py-1.5 text-xs rounded-md cursor-pointer transition-colors',
                      isChecked ? 'bg-primary/10 font-semibold text-primary' : 'hover:bg-accent text-foreground'
                    )}
                  >
                    <span>{opt.label}</span>
                    {isChecked && <Check className="h-3.5 w-3.5 text-primary shrink-0" />}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
};
