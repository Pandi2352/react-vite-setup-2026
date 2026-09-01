import React from 'react';
import { SUPPORTED_LANGUAGES } from '../locales/dictionaries';
import { LanguageCode } from '../types/i18n.types';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface LanguageGridProps {
  currentLanguage: LanguageCode;
  onSelectLanguage: (code: LanguageCode) => void;
}

export const LanguageGrid: React.FC<LanguageGridProps> = ({
  currentLanguage,
  onSelectLanguage,
}) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold text-foreground">Global Languages (8 Locales)</h3>
        <Badge variant="outline" className="text-[9px] font-mono px-1.5 py-0">
          Auto RTL Enabled
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {SUPPORTED_LANGUAGES.map((lang) => {
          const isSelected = currentLanguage === lang.code;

          return (
            <button
              key={lang.code}
              type="button"
              onClick={() => onSelectLanguage(lang.code)}
              className={cn(
                'flex flex-col justify-between p-3 rounded-lg border text-left transition-all cursor-pointer relative',
                isSelected
                  ? 'border-primary bg-primary/10 shadow-2xs'
                  : 'border-border bg-card/60 hover:bg-card hover:border-primary/40'
              )}
            >
              <div className="flex items-start justify-between gap-1 w-full">
                <div className="flex items-center gap-2">
                  <span className="text-xl leading-none">{lang.flag}</span>
                  <div>
                    <p className={cn(
                      'text-xs font-bold leading-tight',
                      isSelected ? 'text-primary' : 'text-foreground'
                    )}>
                      {lang.nativeName}
                    </p>
                    <p className="text-[10px] text-muted-foreground leading-tight">
                      {lang.name}
                    </p>
                  </div>
                </div>

                {isSelected && (
                  <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Check className="h-2.5 w-2.5" />
                  </div>
                )}
              </div>

              {/* Direction & Coverage */}
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-border/50 text-[9px] w-full text-muted-foreground">
                <span className={cn(
                  'font-mono font-bold uppercase',
                  lang.direction === 'rtl' ? 'text-amber-500' : 'text-muted-foreground'
                )}>
                  {lang.direction.toUpperCase()}
                </span>
                <span className="font-mono">{lang.coveragePct}% Complete</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
