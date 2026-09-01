import React, { useState, useMemo } from 'react';
import { PLATFORM_FEATURES } from '../data/features-catalog';
import { DocCategory } from '../types/docs.types';
import { DocsFeatureCard } from './docs-feature-card';
import { DocsShortcutsCheatsheet } from './docs-shortcuts-cheatsheet';
import { DocsTechStackCard } from './docs-tech-stack-card';
import { BookOpen, Search, X, Layers } from 'lucide-react';
import { useUIStore } from '@/store/ui-store';
import { Button } from '@/components/ui/button';
import { IconButton } from '@/components/ui/icon-button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export const DocsPanel: React.FC = () => {
  const { setActiveRightPanel } = useUIStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<DocCategory>('all');

  const categories: { id: DocCategory; label: string }[] = [
    { id: 'all', label: 'All Features' },
    { id: 'drawers', label: 'Right Drawers' },
    { id: 'datagrid', label: 'Data Grid' },
    { id: 'navbar', label: 'Navbar Tools' },
    { id: 'layout', label: 'Layout & Nav' },
    { id: 'shortcuts', label: 'Shortcuts' },
    { id: 'architecture', label: 'Tech Stack' },
  ];

  const filteredFeatures = useMemo(() => {
    return PLATFORM_FEATURES.filter((feat) => {
      // Category match
      if (selectedCategory !== 'all' && feat.category !== selectedCategory) {
        return false;
      }
      // Search match
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        feat.title.toLowerCase().includes(q) ||
        feat.summary.toLowerCase().includes(q) ||
        feat.highlights.some((h) => h.toLowerCase().includes(q)) ||
        feat.techStack?.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="flex flex-col h-full bg-card text-card-foreground">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-border bg-card/80 backdrop-blur-xs">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <BookOpen className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-xs font-bold text-foreground">Platform Documentation & Features</h2>
              <Badge variant="outline" className="text-[9px] font-mono px-1 py-0">
                12 Modules
              </Badge>
            </div>
            <p className="text-[10px] text-muted-foreground">Complete architectural guide & feature catalog</p>
          </div>
        </div>

        <IconButton
          icon={<X className="h-3.5 w-3.5" />}
          aria-label="Close documentation panel"
          tooltip="Close panel"
          variant="ghost"
          size="sm"
          onClick={() => setActiveRightPanel(null)}
        />
      </div>

      {/* Search Input */}
      <div className="p-3 border-b border-border bg-muted/20 space-y-2">
        <div className="relative">
          <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search features, shortcuts, APIs, or tools..."
            className="w-full pl-8 pr-2.5 py-1 text-xs rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-1 overflow-x-auto custom-scrollbar pb-1">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={cn(
                  'px-2 py-0.5 rounded-full text-[10px] font-semibold whitespace-nowrap transition-colors cursor-pointer border',
                  isSelected
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-card text-muted-foreground border-border hover:text-foreground'
                )}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Body Content */}
      <div className="flex-1 overflow-y-auto p-3.5 space-y-3.5 custom-scrollbar">
        {/* If viewing shortcuts category */}
        {selectedCategory === 'shortcuts' && <DocsShortcutsCheatsheet />}

        {/* If viewing architecture category */}
        {selectedCategory === 'architecture' && <DocsTechStackCard />}

        {/* Feature Cards */}
        {selectedCategory !== 'shortcuts' && selectedCategory !== 'architecture' && (
          <>
            {filteredFeatures.map((feature) => (
              <DocsFeatureCard key={feature.id} feature={feature} />
            ))}

            {filteredFeatures.length === 0 && (
              <div className="p-8 text-center space-y-2">
                <Layers className="h-8 w-8 text-muted-foreground mx-auto opacity-40" />
                <p className="text-xs font-bold text-foreground">No features matching &quot;{searchQuery}&quot;</p>
                <p className="text-[11px] text-muted-foreground">Try searching for &quot;Telemetry&quot;, &quot;i18n&quot;, &quot;Clock&quot;, or &quot;Data Grid&quot;</p>
              </div>
            )}
          </>
        )}

        {/* Always display shortcuts and tech stack overview at bottom of 'all' */}
        {selectedCategory === 'all' && !searchQuery.trim() && (
          <>
            <DocsShortcutsCheatsheet />
            <DocsTechStackCard />
          </>
        )}
      </div>

      {/* Footer */}
      <div className="p-2.5 border-t border-border bg-card flex items-center justify-between">
        <span className="text-[10px] text-muted-foreground font-mono">
          Interactive Platform Guide
        </span>
        <Button variant="primary" size="sm" onClick={() => setActiveRightPanel(null)} className="h-6 text-xs px-3">
          Done
        </Button>
      </div>
    </div>
  );
};
