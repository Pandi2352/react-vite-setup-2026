import React, { useState, useMemo } from 'react';
import { DICTIONARIES, SUPPORTED_LANGUAGES } from '../locales/dictionaries';
import { LanguageCode } from '../types/i18n.types';
import { Search, Key, Languages } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export interface I18nDictionaryInspectorProps {
  currentLanguage: LanguageCode;
}

export const I18nDictionaryInspector: React.FC<I18nDictionaryInspectorProps> = ({
  currentLanguage,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const currentDict = DICTIONARIES[currentLanguage] || DICTIONARIES.en;
  const englishDict = DICTIONARIES.en;
  const currentLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === currentLanguage);

  const keys = useMemo(() => {
    const allKeys = Object.keys(englishDict);
    if (!searchQuery.trim()) return allKeys;
    const q = searchQuery.toLowerCase();
    return allKeys.filter(
      (k) =>
        k.toLowerCase().includes(q) ||
        (currentDict[k] && currentDict[k].toLowerCase().includes(q)) ||
        (englishDict[k] && englishDict[k].toLowerCase().includes(q))
    );
  }, [searchQuery, currentDict, englishDict]);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Languages className="h-3.5 w-3.5 text-primary" />
          <h3 className="text-xs font-bold text-foreground">Live Translation Dictionary</h3>
        </div>
        <Badge variant="secondary" className="text-[9px] font-mono px-1.5 py-0">
          {currentLangObj?.flag} {currentLangObj?.name}
        </Badge>
      </div>

      {/* Search Filter */}
      <div className="relative">
        <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-muted-foreground" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search translation key or text..."
          className="w-full pl-8 pr-2.5 py-1 text-xs rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      {/* Keys List */}
      <div className="space-y-1.5 max-h-64 overflow-y-auto custom-scrollbar p-1">
        {keys.map((key) => {
          const val = currentDict[key];
          const enVal = englishDict[key];
          const isTranslated = !!val;

          return (
            <div
              key={key}
              className="p-2.5 rounded-lg border border-border bg-card/60 hover:bg-card transition-colors space-y-1"
            >
              <div className="flex items-center justify-between gap-1">
                <span className="font-mono text-[10px] text-muted-foreground flex items-center gap-1 truncate">
                  <Key className="h-2.5 w-2.5 text-primary" />
                  {key}
                </span>
                <Badge
                  variant={isTranslated ? 'success' : 'warning'}
                  className="text-[8px] font-mono px-1 py-0"
                >
                  {isTranslated ? 'Translated' : 'Fallback (EN)'}
                </Badge>
              </div>

              <div className="flex items-center justify-between gap-2 pt-0.5">
                <p className="text-xs font-bold text-foreground truncate">
                  {val || enVal}
                </p>
                {currentLanguage !== 'en' && (
                  <span className="text-[10px] text-muted-foreground italic truncate max-w-[120px]">
                    (EN: {enVal})
                  </span>
                )}
              </div>
            </div>
          );
        })}

        {keys.length === 0 && (
          <div className="p-4 text-center text-xs text-muted-foreground">
            No keys matching &quot;{searchQuery}&quot;
          </div>
        )}
      </div>
    </div>
  );
};
