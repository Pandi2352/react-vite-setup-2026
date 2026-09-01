import React, { useState } from 'react';
import { useI18nStore } from '../store/i18n-store';
import { LanguageGrid } from './language-grid';
import { RtlControlCard } from './rtl-control-card';
import { I18nDictionaryInspector } from './i18n-dictionary-inspector';
import { Globe, ArrowRightLeft, BookOpen, X, Sparkles } from 'lucide-react';
import { useUIStore } from '@/store/ui-store';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export const I18nPanel: React.FC = () => {
  const { currentLanguage, isRtl, forceRtl, setLanguage, setForceRtl, t } = useI18nStore();
  const { setActiveRightPanel } = useUIStore();
  const [activeTab, setActiveTab] = useState<'languages' | 'rtl' | 'dictionary'>('languages');

  return (
    <div className="flex flex-col h-full bg-card text-card-foreground">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-border bg-card/80 backdrop-blur-xs">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Globe className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-xs font-bold text-foreground">i18n & RTL Layout Suite</h2>
              <Badge variant="outline" className="text-[9px] font-mono px-1 py-0">
                {currentLanguage.toUpperCase()} {isRtl ? '• RTL' : '• LTR'}
              </Badge>
            </div>
            <p className="text-[10px] text-muted-foreground">8 Global Locales & Bidirectional Engine</p>
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setActiveRightPanel(null)}
          className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground"
          aria-label="Close panel"
        >
          <X className="h-3.5 w-3.5" />
        </Button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-border bg-muted/30 p-1 gap-1">
        <button
          type="button"
          onClick={() => setActiveTab('languages')}
          className={cn(
            'flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer',
            activeTab === 'languages'
              ? 'bg-card text-foreground border border-border shadow-2xs'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          <Globe className="h-3.5 w-3.5 text-primary" />
          <span>Locales</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('rtl')}
          className={cn(
            'flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer',
            activeTab === 'rtl'
              ? 'bg-card text-foreground border border-border shadow-2xs'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          <ArrowRightLeft className="h-3.5 w-3.5 text-amber-500" />
          <span>RTL Mirror</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('dictionary')}
          className={cn(
            'flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer',
            activeTab === 'dictionary'
              ? 'bg-card text-foreground border border-border shadow-2xs'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          <BookOpen className="h-3.5 w-3.5 text-blue-500" />
          <span>Dictionary</span>
        </button>
      </div>

      {/* Tab Body */}
      <div className="flex-1 overflow-y-auto p-3.5 space-y-3.5 custom-scrollbar">
        {/* Live UI Translation Sample Card */}
        <div className="p-3 rounded-lg border border-primary/30 bg-primary/5 space-y-2">
          <div className="flex items-center gap-1.5 text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            <span className="text-xs font-bold">Live Translated Preview</span>
          </div>

          <div className="space-y-1">
            <p className="text-xs font-semibold text-foreground">
              {t('common.welcome')}, Admin 👋
            </p>
            <p className="text-[10px] text-muted-foreground">
              {t('nav.dashboard')} • {t('nav.users')} • {t('common.securityHealth')} ({t('status.optimal')})
            </p>
          </div>
        </div>

        {activeTab === 'languages' && (
          <LanguageGrid
            currentLanguage={currentLanguage}
            onSelectLanguage={setLanguage}
          />
        )}

        {activeTab === 'rtl' && (
          <RtlControlCard
            isRtl={isRtl}
            forceRtl={forceRtl}
            onSetForceRtl={setForceRtl}
          />
        )}

        {activeTab === 'dictionary' && (
          <I18nDictionaryInspector currentLanguage={currentLanguage} />
        )}
      </div>

      {/* Footer */}
      <div className="p-2.5 border-t border-border bg-card flex items-center justify-between">
        <span className="text-[10px] text-muted-foreground font-mono">
          HTML dir=&quot;{isRtl ? 'rtl' : 'ltr'}&quot; lang=&quot;{currentLanguage}&quot;
        </span>
        <Button variant="primary" size="sm" onClick={() => setActiveRightPanel(null)} className="h-6 text-xs px-3">
          Done
        </Button>
      </div>
    </div>
  );
};
