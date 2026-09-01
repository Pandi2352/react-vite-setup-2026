import React, { useState } from 'react';
import { X, Palette, Type, Sun, Moon, Laptop, Check, Search, RotateCcw } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { useUIStore } from '@/store/ui-store';
import { RightResizeHandle } from '@/components/layout/right-sidebar/right-resize-handle';
import { COLOR_SCHEMES_CATALOG } from '@/lib/theme';
import { GOOGLE_FONTS_LIST } from '@/lib/fonts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export const ThemeCustomizerDrawer: React.FC = () => {
  const {
    theme,
    setTheme,
    colorPalette,
    setColorPalette,
    fontId,
    setFontId,
    isCustomizerOpen,
    setIsCustomizerOpen,
  } = useTheme();

  const { rightPanelWidth, isRightResizing } = useUIStore();

  const [activeTab, setActiveTab] = useState<'colors' | 'fonts' | 'mode'>('colors');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isCustomizerOpen) return null;

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
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Soft Light Backdrop overlay */}
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-[2px] transition-opacity animate-in fade-in duration-200"
        onClick={() => setIsCustomizerOpen(false)}
      />

      {/* Right Drawer Content Panel */}
      <div
        style={{ width: `${rightPanelWidth}px` }}
        className={cn(
          'relative w-full max-w-[90vw] h-full bg-card/95 backdrop-blur-md border-l border-border flex flex-col z-10 animate-in slide-in-from-right overflow-visible',
          isRightResizing ? 'transition-none' : 'transition-[width] duration-300 ease-in-out'
        )}
      >
        <RightResizeHandle />
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-card">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-md bg-primary/10 text-primary">
              <Palette className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-foreground">Theme & Font Customizer</h2>
              <p className="text-[11px] text-muted-foreground">30 Website Color Schemes & 20 Google Fonts</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleResetDefaults}
              className="h-8 text-xs text-muted-foreground hover:text-foreground gap-1 px-2"
              title="Reset to Default Red & Black Theme"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCustomizerOpen(false)}
              className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-border bg-muted/40 p-1 gap-1">
          <button
            onClick={() => setActiveTab('colors')}
            className={cn(
              'flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer',
              activeTab === 'colors'
                ? 'bg-card text-foreground border border-border'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <Palette className="h-3.5 w-3.5 text-primary" />
            <span>30 Colors</span>
          </button>

          <button
            onClick={() => setActiveTab('fonts')}
            className={cn(
              'flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer',
              activeTab === 'fonts'
                ? 'bg-card text-foreground border border-border'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <Type className="h-3.5 w-3.5 text-violet-500" />
            <span>20 Fonts</span>
          </button>

          <button
            onClick={() => setActiveTab('mode')}
            className={cn(
              'flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer',
              activeTab === 'mode'
                ? 'bg-card text-foreground border border-border'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <Sun className="h-3.5 w-3.5 text-amber-500" />
            <span>Mode</span>
          </button>
        </div>

        {/* Search Bar */}
        {(activeTab === 'colors' || activeTab === 'fonts') && (
          <div className="p-3 border-b border-border bg-card">
            <Input
              placeholder={`Search ${activeTab === 'colors' ? '30 color schemes...' : '20 Google fonts...'}`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="h-4 w-4" />}
            />
          </div>
        )}

        {/* Drawer Body Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
          {/* TAB 1: 30 Color Schemes Catalog */}
          {activeTab === 'colors' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-muted-foreground font-medium">
                <span>Select from 30 Professional Color Schemes</span>
                <Badge variant="outline" className="text-[10px]">{filteredSchemes.length} Available</Badge>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {filteredSchemes.map((scheme) => {
                  const isSelected = colorPalette === scheme.id;
                  return (
                    <button
                      key={scheme.id}
                      onClick={() => setColorPalette(scheme.id)}
                      className={cn(
                        'flex items-center justify-between p-3 rounded-lg border text-left transition-all cursor-pointer group',
                        isSelected
                          ? 'border-primary bg-primary/10 ring-1 ring-primary'
                          : 'border-border bg-card hover:bg-muted/40'
                      )}
                    >
                      <div className="space-y-1 min-w-0 pr-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-foreground truncate">{scheme.name}</span>
                          <Badge variant="secondary" className="text-[9px] px-1 py-0">{scheme.category}</Badge>
                        </div>
                        <div className="flex items-center gap-1.5 pt-0.5">
                          <span className="text-[10px] font-mono text-muted-foreground">{scheme.primary}</span>
                          <span className="text-[10px] text-muted-foreground">•</span>
                          <span className="text-[10px] font-mono text-muted-foreground">{scheme.secondary}</span>
                        </div>
                      </div>

                      {/* 3-Color Swatch Preview Pills */}
                      <div className="flex items-center gap-1 shrink-0">
                        <div className="flex -space-x-1.5 overflow-hidden p-1">
                          <span
                            className="inline-block h-5 w-5 rounded-full border border-white/20"
                            style={{ backgroundColor: scheme.primary }}
                            title={`Primary ${scheme.primary}`}
                          />
                          <span
                            className="inline-block h-5 w-5 rounded-full border border-white/20"
                            style={{ backgroundColor: scheme.secondary }}
                            title={`Secondary ${scheme.secondary}`}
                          />
                          <span
                            className="inline-block h-5 w-5 rounded-full border border-white/20"
                            style={{ backgroundColor: scheme.accent }}
                            title={`Accent ${scheme.accent}`}
                          />
                        </div>
                        {isSelected && <Check className="h-4 w-4 text-primary ml-1 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: 20 Google Fonts Selector */}
          {activeTab === 'fonts' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-muted-foreground font-medium">
                <span>Select from 20 Top Google Web Fonts</span>
                <Badge variant="outline" className="text-[10px]">{filteredFonts.length} Fonts</Badge>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {filteredFonts.map((font) => {
                  const isSelected = fontId === font.id;
                  return (
                    <button
                      key={font.id}
                      onClick={() => setFontId(font.id)}
                      className={cn(
                        'flex items-center justify-between p-3 rounded-lg border text-left transition-all cursor-pointer',
                        isSelected
                          ? 'border-primary bg-primary/10 ring-1 ring-primary'
                          : 'border-border bg-card hover:bg-muted/40'
                      )}
                    >
                      <div className="space-y-1 min-w-0 pr-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-foreground">{font.name}</span>
                          <Badge variant="info" className="text-[9px] px-1 py-0">{font.category}</Badge>
                        </div>
                        {/* Live Font Sample Preview */}
                        <p
                          className="text-sm text-foreground/90 truncate pt-1"
                          style={{ fontFamily: font.family }}
                        >
                          The quick brown fox jumps over the lazy dog.
                        </p>
                      </div>
                      {isSelected && <Check className="h-4 w-4 text-primary shrink-0 stroke-[3]" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: Appearance Light / Dark Mode */}
          {activeTab === 'mode' && (
            <div className="space-y-4">
              <div className="text-xs text-muted-foreground font-medium">
                Choose light, dark, or system preference mode
              </div>

              <div className="grid grid-cols-1 gap-3">
                {[
                  { id: 'light', label: 'Light Theme Mode', desc: 'Clean high-contrast light mode', icon: <Sun className="h-5 w-5 text-amber-500" /> },
                  { id: 'dark', label: 'Dark Theme Mode', desc: 'Pitch black #000000 high-contrast dark mode', icon: <Moon className="h-5 w-5 text-indigo-400" /> },
                  { id: 'system', label: 'System Automatic Mode', desc: 'Automatically match OS dark/light preference', icon: <Laptop className="h-5 w-5 text-emerald-500" /> },
                ].map((item) => {
                  const isSelected = theme === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setTheme(item.id as any)}
                      className={cn(
                        'flex items-center gap-3 p-3.5 rounded-lg border text-left transition-all cursor-pointer',
                        isSelected
                          ? 'border-primary bg-primary/10 ring-1 ring-primary'
                          : 'border-border bg-card hover:bg-muted/40'
                      )}
                    >
                      <div className="p-2 rounded-md bg-muted">{item.icon}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-foreground">{item.label}</p>
                        <p className="text-[11px] text-muted-foreground">{item.desc}</p>
                      </div>
                      {isSelected && <Check className="h-4 w-4 text-primary shrink-0 stroke-[3]" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-border bg-card flex items-center justify-between">
          <span className="text-[11px] text-muted-foreground font-medium">
            Active Theme: <strong className="text-foreground font-bold capitalize">{colorPalette.replace('-', ' ')}</strong>
          </span>
          <Button variant="primary" size="sm" onClick={() => setIsCustomizerOpen(false)}>
            Done & Apply
          </Button>
        </div>
      </div>
    </div>
  );
};
