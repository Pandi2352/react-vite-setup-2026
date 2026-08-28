export interface FontOption {
  id: string;
  name: string;
  category: 'sans-serif' | 'serif' | 'display' | 'monospace';
  family: string;
  googleFont: string;
}

export const GOOGLE_FONTS_LIST: FontOption[] = [
  { id: 'inter', name: 'Inter (Default)', category: 'sans-serif', family: "'Inter', sans-serif", googleFont: 'Inter:wght@300;400;500;600;700' },
  { id: 'roboto', name: 'Roboto', category: 'sans-serif', family: "'Roboto', sans-serif", googleFont: 'Roboto:wght@300;400;500;700' },
  { id: 'poppins', name: 'Poppins', category: 'sans-serif', family: "'Poppins', sans-serif", googleFont: 'Poppins:wght@300;400;500;600;700' },
  { id: 'outfit', name: 'Outfit', category: 'sans-serif', family: "'Outfit', sans-serif", googleFont: 'Outfit:wght@300;400;500;600;700' },
  { id: 'plus-jakarta', name: 'Plus Jakarta Sans', category: 'sans-serif', family: "'Plus Jakarta Sans', sans-serif", googleFont: 'Plus+Jakarta+Sans:wght@300;400;500;600;700' },
  { id: 'montserrat', name: 'Montserrat', category: 'sans-serif', family: "'Montserrat', sans-serif", googleFont: 'Montserrat:wght@300;400;500;600;700' },
  { id: 'dm-sans', name: 'DM Sans', category: 'sans-serif', family: "'DM Sans', sans-serif", googleFont: 'DM+Sans:wght@400;500;700' },
  { id: 'manrope', name: 'Manrope', category: 'sans-serif', family: "'Manrope', sans-serif", googleFont: 'Manrope:wght@400;500;600;700' },
  { id: 'work-sans', name: 'Work Sans', category: 'sans-serif', family: "'Work Sans', sans-serif", googleFont: 'Work+Sans:wght@400;500;600;700' },
  { id: 'sora', name: 'Sora', category: 'sans-serif', family: "'Sora', sans-serif", googleFont: 'Sora:wght@300;400;600;700' },

  { id: 'playfair', name: 'Playfair Display', category: 'serif', family: "'Playfair Display', serif", googleFont: 'Playfair+Display:wght@400;600;700' },
  { id: 'cinzel', name: 'Cinzel', category: 'serif', family: "'Cinzel', serif", googleFont: 'Cinzel:wght@400;600;700' },
  { id: 'lora', name: 'Lora', category: 'serif', family: "'Lora', serif", googleFont: 'Lora:wght@400;500;600;700' },
  { id: 'merriweather', name: 'Merriweather', category: 'serif', family: "'Merriweather', serif", googleFont: 'Merriweather:wght@300;400;700' },

  { id: 'space-grotesk', name: 'Space Grotesk', category: 'display', family: "'Space Grotesk', sans-serif", googleFont: 'Space+Grotesk:wght@400;500;600;700' },
  { id: 'syne', name: 'Syne', category: 'display', family: "'Syne', sans-serif", googleFont: 'Syne:wght@400;600;700' },
  { id: 'dancing-script', name: 'Dancing Script', category: 'display', family: "'Dancing Script', cursive", googleFont: 'Dancing+Script:wght@400;600;700' },

  { id: 'fira-code', name: 'Fira Code', category: 'monospace', family: "'Fira Code', monospace", googleFont: 'Fira+Code:wght@400;500;600' },
  { id: 'space-mono', name: 'Space Mono', category: 'monospace', family: "'Space Mono', monospace", googleFont: 'Space+Mono:wght@400;700' },
  { id: 'jet-brains', name: 'JetBrains Mono', category: 'monospace', family: "'JetBrains Mono', monospace", googleFont: 'JetBrains+Mono:wght@400;500;700' },
];

export const FONT_STORAGE_KEY = 'forge-ui-font';

export function applyFontToDocument(fontId: string) {
  if (typeof window === 'undefined') return;

  const fontObj = GOOGLE_FONTS_LIST.find((f) => f.id === fontId) || GOOGLE_FONTS_LIST[0];

  // Dynamically load Google Font CSS link if not present
  const linkId = `google-font-${fontObj.id}`;
  if (!document.getElementById(linkId)) {
    const link = document.createElement('link');
    link.id = linkId;
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?family=${fontObj.googleFont}&display=swap`;
    document.head.appendChild(link);
  }

  // Apply to body and CSS root variable
  document.body.style.fontFamily = fontObj.family;
  document.documentElement.style.setProperty('--font-custom', fontObj.family);
}
