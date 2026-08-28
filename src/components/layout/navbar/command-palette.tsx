import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Command, ArrowRight, CornerDownLeft } from 'lucide-react';
import { useUIStore } from '@/store/ui-store';
import { navigationConfig } from '@/config/navigation';
import { cn } from '@/lib/utils';

export const CommandPalette: React.FC = () => {
  const { commandPaletteOpen, setCommandPaletteOpen } = useUIStore();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  // Extract all searchable items from navigation config
  const searchableItems = React.useMemo(() => {
    const items: { label: string; path: string; section: string }[] = [];
    navigationConfig.forEach((sec) => {
      sec.items.forEach((item) => {
        if (item.path && !item.external) {
          items.push({ label: item.label, path: item.path, section: sec.title });
        }
        if (item.children) {
          item.children.forEach((child) => {
            if (child.path && !child.external) {
              items.push({ label: `${item.label} > ${child.label}`, path: child.path, section: sec.title });
            }
          });
        }
      });
    });
    return items;
  }, []);

  const filteredItems = React.useMemo(() => {
    if (!query) return searchableItems;
    return searchableItems.filter((i) =>
      i.label.toLowerCase().includes(query.toLowerCase())
    );
  }, [searchableItems, query]);

  // Shortcut Listener (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(!commandPaletteOpen);
      }
      if (e.key === 'Escape' && commandPaletteOpen) {
        setCommandPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [commandPaletteOpen, setCommandPaletteOpen]);

  // Arrow Key Navigation
  const handleKeyNavigation = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % (filteredItems.length || 1));
    } else if (e.key === 'Enter' && filteredItems[selectedIndex]) {
      e.preventDefault();
      handleSelect(filteredItems[selectedIndex].path);
    }
  };

  const handleSelect = (path: string) => {
    setCommandPaletteOpen(false);
    setQuery('');
    navigate(path);
  };

  if (!commandPaletteOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={() => setCommandPaletteOpen(false)}
      />

      {/* Palette Container */}
      <div
        onKeyDown={handleKeyNavigation}
        className="relative z-50 w-full max-w-xl rounded-md border border-border bg-card shadow-2xl overflow-hidden animate-in zoom-in-95"
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border">
          <Search className="h-5 w-5 text-muted-foreground shrink-0" />
          <input
            autoFocus
            type="text"
            placeholder="Type a command or search modules... (Press Esc to exit)"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            className="w-full bg-transparent text-sm text-foreground focus:outline-none placeholder:text-muted-foreground"
          />
          <div className="flex items-center gap-1 text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded-md font-mono">
            <Command className="h-3 w-3" /> K
          </div>
        </div>

        {/* Results List */}
        <div className="max-h-72 overflow-y-auto p-2 space-y-1">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center text-sm text-muted-foreground">
              No matching pages or modules found for "<strong className="text-foreground">{query}</strong>".
            </div>
          ) : (
            filteredItems.map((item, idx) => (
              <div
                key={item.path + idx}
                onClick={() => handleSelect(item.path)}
                className={cn(
                  'flex items-center justify-between px-3 py-2.5 rounded-md text-xs font-medium cursor-pointer transition-colors',
                  idx === selectedIndex ? 'bg-primary text-primary-foreground font-semibold' : 'hover:bg-accent text-foreground'
                )}
              >
                <div className="flex items-center gap-2">
                  <ArrowRight className="h-3.5 w-3.5 shrink-0 opacity-70" />
                  <span>{item.label}</span>
                  <span className="text-[10px] opacity-60 ml-2 font-mono">({item.section})</span>
                </div>
                <CornerDownLeft className="h-3.5 w-3.5 opacity-60 shrink-0" />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
