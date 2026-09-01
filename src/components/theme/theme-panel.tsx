import React, { useState } from 'react';
import { X, Palette, Type, Sun, Moon, Laptop, Check, Search, RotateCcw } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { useUIStore } from '@/store/ui-store';
import { COLOR_SCHEMES_CATALOG } from '@/lib/theme';
import { GOOGLE_FONTS_LIST } from '@/lib/fonts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tooltip } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

export const ThemePanel: React.FC = () => {
  const {
    theme,
    setTheme,
    colorPalette,
    setColorPalette,
    fontId,
    setFontId,
  } = useTheme();

  const { setActiveRightPanel } = useUIStore();

  const [activeTab, setActiveTab] = useState<'colors' | 'fonts' | 'mode'>('colors');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSchemes = COLOR_SCHEMES_CATALOG.filter((scheme) =>
    scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    scheme.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredFonts = GOOGLE_FONTS_LIST.filter((font) =>
    font.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    font.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleResetDefaults = () => {
    setTheme('system');
    setColorPalette('red-black');
    setFontId('inter');
  };

  return (
    <div className="flex flex-col h-full bg-card text-card-foreground">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-border bg-card/80 backdrop-blur-xs">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Palette className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-xs font-bold text-foreground">Theme & Font Engine</h2>
            <p className="text-[10px] text-muted-foreground">30 Schemes & 20 Google Fonts</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Tooltip content="Reset to Default Red & Black Theme" position="bottom">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleResetDefaults}
              className="h-7 text-xs text-muted-foreground hover:text-foreground gap-1 px-2"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reset</span>
            </Button>
          </Tooltip>

          <Tooltip content="Close panel" position="bottom">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveRightPanel(null)}
              className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" />
            </Button>
          </Tooltip>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border bg-muted/30 p-1 gap-1">
        <button
          type="button"
          onClick={() => setActiveTab('colors')}
          className={cn(
            'flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer',
            activeTab === 'colors'
              ? 'bg-card text-foreground border border-border shadow-2xs'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          <Palette className="h-3.5 w-3.5 text-primary" />
          <span>30 Colors</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('fonts')}
          className={cn(
            'flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer',
            activeTab === 'fonts'
              ? 'bg-card text-foreground border border-border shadow-2xs'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          <Type className="h-3.5 w-3.5 text-violet-500" />
          <span>20 Fonts</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('mode')}
          className={cn(
            'flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer',
            activeTab === 'mode'
              ? 'bg-card text-foreground border border-border shadow-2xs'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          <Sun className="h-3.5 w-3.5 text-amber-500" />
          <span>Mode</span>
        </button>
      </div>

      {/* Search Input */}
      {(activeTab === 'colors' || activeTab === 'fonts') && (
        <div className="p-3 border-b border-border bg-card">
          <Input
            placeholder={`Search ${activeTab === 'colors' ? '30 color schemes...' : '20 Google fonts...'}`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search className="h-3.5 w-3.5" />}
            className="h-8 text-xs"
          />
        </div>
      )}

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-3.5 space-y-3 custom-scrollbar">
        {/* TAB 1: 30 Colors */}
        {activeTab === 'colors' && (
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs text-muted-foreground font-medium">
              <span>Select Color Palette</span>
              <Badge variant="outline" className="text-[9px]">{filteredSchemes.length} Available</Badge>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {filteredSchemes.map((scheme) => {
                const isSelected = colorPalette === scheme.id;
                return (
                  <button
                    key={scheme.id}
                    type="button"
                    onClick={() => setColorPalette(scheme.id)}
                    className={cn(
                      'flex items-center justify-between p-2.5 rounded-lg border text-left transition-all cursor-pointer group',
                      isSelected
                        ? 'border-primary bg-primary/10 ring-1 ring-primary'
                        : 'border-border bg-card hover:bg-muted/40'
                    )}
                  >
                    <div className="space-y-0.5 min-w-0 pr-2">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-foreground truncate">{scheme.name}</span>
                        <Badge variant="secondary" className="text-[8px] px-1 py-0">{scheme.category}</Badge>
                      </div>
                      <div className="flex items-center gap-1 pt-0.5">
                        <span className="text-[10px] font-mono text-muted-foreground">{scheme.primary}</span>
                        <span className="text-[10px] text-muted-foreground">•</span>
                        <span className="text-[10px] font-mono text-muted-foreground">{scheme.secondary}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <div className="flex -space-x-1.5 overflow-hidden p-1">
                        <span
                          className="inline-block h-4 w-4 rounded-full border border-white/20"
                          style={{ backgroundColor: scheme.primary }}
                        />
                        <span
                          className="inline-block h-4 w-4 rounded-full border border-white/20"
                          style={{ backgroundColor: scheme.secondary }}
                        />
                        <span
                          className="inline-block h-4 w-4 rounded-full border border-white/20"
                          style={{ backgroundColor: scheme.accent }}
                        />
                      </div>
                      {isSelected && <Check className="h-3.5 w-3.5 text-primary ml-1 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: 20 Fonts */}
        {activeTab === 'fonts' && (
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs text-muted-foreground font-medium">
              <span>Select Web Font</span>
              <Badge variant="outline" className="text-[9px]">{filteredFonts.length} Fonts</Badge>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {filteredFonts.map((font) => {
                const isSelected = fontId === font.id;
                return (
                  <button
                    key={font.id}
                    type="button"
                    onClick={() => setFontId(font.id)}
                    className={cn(
                      'flex items-center justify-between p-2.5 rounded-lg border text-left transition-all cursor-pointer',
                      isSelected
                        ? 'border-primary bg-primary/10 ring-1 ring-primary'
                        : 'border-border bg-card hover:bg-muted/40'
                    )}
                  >
                    <div className="space-y-0.5 min-w-0 pr-2">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-foreground">{font.name}</span>
                        <Badge variant="info" className="text-[8px] px-1 py-0">{font.category}</Badge>
                      </div>
                      <p
                        className="text-xs text-foreground/90 truncate pt-0.5"
                        style={{ fontFamily: font.family }}
                      >
                        The quick brown fox jumps over the lazy dog.
                      </p>
                    </div>
                    {isSelected && <Check className="h-3.5 w-3.5 text-primary shrink-0 stroke-[3]" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: Light / Dark Mode */}
        {activeTab === 'mode' && (
          <div className="space-y-3">
            <div className="text-xs text-muted-foreground font-medium">
              Select appearance mode preference
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {[
                { id: 'light', label: 'Light Theme Mode', desc: 'Clean high-contrast light mode', icon: <Sun className="h-4 w-4 text-amber-500" /> },
                { id: 'dark', label: 'Dark Theme Mode', desc: 'Pitch black #000000 high-contrast dark mode', icon: <Moon className="h-4 w-4 text-indigo-400" /> },
                { id: 'system', label: 'System Automatic Mode', desc: 'Automatically match OS preference', icon: <Laptop className="h-4 w-4 text-emerald-500" /> },
              ].map((item) => {
                const isSelected = theme === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setTheme(item.id as any)}
                    className={cn(
                      'flex items-center gap-2.5 p-3 rounded-lg border text-left transition-all cursor-pointer',
                      isSelected
                        ? 'border-primary bg-primary/10 ring-1 ring-primary'
                        : 'border-border bg-card hover:bg-muted/40'
                    )}
                  >
                    <div className="p-1.5 rounded-md bg-muted">{item.icon}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-foreground">{item.label}</p>
                      <p className="text-[10px] text-muted-foreground">{item.desc}</p>
                    </div>
                    {isSelected && <Check className="h-3.5 w-3.5 text-primary shrink-0 stroke-[3]" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-border bg-card flex items-center justify-between">
        <span className="text-[11px] text-muted-foreground font-medium">
          Active Theme: <strong className="text-foreground font-bold capitalize">{colorPalette.replace('-', ' ')}</strong>
        </span>
        <Button variant="primary" size="sm" onClick={() => setActiveRightPanel(null)} className="h-7 text-xs">
          Done & Apply
        </Button>
      </div>
    </div>
  );
};
