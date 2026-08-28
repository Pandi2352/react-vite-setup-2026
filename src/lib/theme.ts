export type ThemeMode = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'forge-ui-theme';
export const PALETTE_STORAGE_KEY = 'forge-ui-color-palette';

export interface ColorSchemeOption {
  id: string;
  name: string;
  primary: string; // Hex
  secondary: string; // Hex
  accent: string; // Hex
  category: 'Popular' | 'Vibrant' | 'Corporate' | 'Luxury' | 'Minimalist' | 'Nature';
}

export const COLOR_SCHEMES_CATALOG: ColorSchemeOption[] = [
  { id: 'red-black', name: '1. Crimson & Pitch Black', primary: '#B4121B', secondary: '#000000', accent: '#E7473C', category: 'Popular' },
  { id: 'pink-teal', name: '2. Pink, Teal & Cream', primary: '#FF78AC', secondary: '#A8D5E3', accent: '#F2F0EA', category: 'Vibrant' },
  { id: 'orange-yellow', name: '3. Orange & Warm Yellow', primary: '#FF921C', secondary: '#ECA427', accent: '#FFF3E0', category: 'Vibrant' },
  { id: 'fuchsia-darkgrey', name: '4. Fuchsia & Dark Grey', primary: '#D8125B', secondary: '#2C2E39', accent: '#FF4081', category: 'Vibrant' },
  { id: 'green-red', name: '5. Green & Red Lawn', primary: '#205A28', secondary: '#C72B32', accent: '#4CAF50', category: 'Nature' },
  { id: 'cream-black', name: '6. Cream & Black Studio', primary: '#FFFDF2', secondary: '#000000', accent: '#D4AF37', category: 'Luxury' },
  { id: 'black-white', name: '7. Classic Monochrome', primary: '#000000', secondary: '#FFFFFF', accent: '#555555', category: 'Minimalist' },
  { id: 'darkpink-white', name: '8. Dark Pink & Soft White', primary: '#970747', secondary: '#FFFFFF', accent: '#E91E63', category: 'Popular' },
  { id: 'blue-mint', name: '9. Ocean Blue & Mint', primary: '#106EBE', secondary: '#0FFCBE', accent: '#00BCD4', category: 'Popular' },
  { id: 'darkgreen-tangerine', name: '10. Wildlife Green & Tangerine', primary: '#009B4D', secondary: '#FFCC00', accent: '#FAF5E9', category: 'Nature' },
  { id: 'malachite-pink', name: '11. Malachite Green & Hot Pink', primary: '#31EC56', secondary: '#EF036C', accent: '#EE72F8', category: 'Vibrant' },
  { id: 'yellowgreen-grey', name: '12. Golf Yellow-Green & Grey', primary: '#BAFF39', secondary: '#6E6E6E', accent: '#8BC34A', category: 'Corporate' },
  { id: 'drone-blue', name: '13. Tech Drone Blue & Sky', primary: '#00ABE4', secondary: '#E9F1FA', accent: '#0288D1', category: 'Corporate' },
  { id: 'lime-white', name: '14. Electric Lime & Pure White', primary: '#00DD00', secondary: '#FFFFFF', accent: '#76FF03', category: 'Vibrant' },
  { id: 'beige-darkgrey', name: '15. Luxury Beige & Charcoal', primary: '#DDD0C8', secondary: '#323232', accent: '#8D6E63', category: 'Luxury' },
  { id: 'pastel-purple', name: '16. Pastel Purple & Steel Blue', primary: '#C5ADC5', secondary: '#B2B5E0', accent: '#9C27B0', category: 'Minimalist' },
  { id: 'navy-electric', name: '17. Logistics Navy & Electric Blue', primary: '#01257D', secondary: '#00FFFF', accent: '#3F51B5', category: 'Corporate' },
  { id: 'stripe-gradient', name: '18. Stripe Dark Blue & Gradient', primary: '#6366F1', secondary: '#111439', accent: '#818CF8', category: 'Corporate' },
  { id: 'blue-grey', name: '19. Blue-Grey Lagoon', primary: '#96C2DB', secondary: '#E5EDF1', accent: '#607D8B', category: 'Nature' },
  { id: 'brightred-white', name: '20. Bright Red & White Smoke', primary: '#E7473C', secondary: '#F0F0F0', accent: '#FF5252', category: 'Popular' },
  { id: 'classicblue-gold', name: '21. Classic Blue, Turquoise & Gold', primary: '#178582', secondary: '#BFA181', accent: '#0A1828', category: 'Luxury' },
  { id: 'yellow-blue', name: '22. Banky Yellow & Prussian Blue', primary: '#1D63FF', secondary: '#FFCE32', accent: '#29B6F6', category: 'Corporate' },
  { id: 'royal-gold', name: '23. Royal Blue & Estate Gold', primary: '#002349', secondary: '#957C3D', accent: '#D4AF37', category: 'Luxury' },
  { id: 'tyrian-purple', name: '24. Tyrian Purple & White', primary: '#4F0341', secondary: '#FFFFFF', accent: '#8E24AA', category: 'Luxury' },
  { id: 'royal-eggplant', name: '25. Royal Blue & Red Eggplant', primary: '#4A8BDF', secondary: '#A0006D', accent: '#7B1FA2', category: 'Vibrant' },
  { id: 'harley-orange', name: '26. Harley Reddish Orange', primary: '#DD2E18', secondary: '#FFAB00', accent: '#FF5722', category: 'Vibrant' },
  { id: 'sunset-violet', name: '27. Sunset Orange & Red-Violet', primary: '#FF5841', secondary: '#C53678', accent: '#FF4081', category: 'Vibrant' },
  { id: 'sunglow-chocolate', name: '28. Sunglow Yellow & Baker Chocolate', primary: '#FFD43A', secondary: '#582C12', accent: '#F57F17', category: 'Nature' },
  { id: 'deepred-blackcurrant', name: '29. Deep Red & Blackcurrant', primary: '#8E0D3C', secondary: '#1D1842', accent: '#C2185B', category: 'Luxury' },
  { id: 'brown-beige', name: '30. Sorrell Brown & Warm Beige', primary: '#99775C', secondary: '#EAE7DD', accent: '#795548', category: 'Nature' },
];

export function getSystemTheme(): ResolvedTheme {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// Convert Hex to HSL String for Tailwind CSS Variable
export function hexToHslStr(hex: string): string {
  let c = hex.replace('#', '');
  if (c.length === 3) c = c.split('').map((char) => char + char).join('');
  const num = parseInt(c, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;

  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;

  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rNorm: h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0); break;
      case gNorm: h = (bNorm - rNorm) / d + 2; break;
      case bNorm: h = (rNorm - gNorm) / d + 4; break;
    }
    h /= 6;
  }

  const hDeg = Math.round(h * 360);
  const sPct = Math.round(s * 100);
  const lPct = Math.round(l * 100);

  return `${hDeg} ${sPct}% ${lPct}%`;
}

export function applyColorScheme(paletteId: string) {
  if (typeof window === 'undefined') return;

  const scheme = COLOR_SCHEMES_CATALOG.find((s) => s.id === paletteId) || COLOR_SCHEMES_CATALOG[0];
  const root = document.documentElement;

  const primaryHsl = hexToHslStr(scheme.primary);
  const ringHsl = hexToHslStr(scheme.accent || scheme.primary);

  root.style.setProperty('--primary', primaryHsl);
  root.style.setProperty('--ring', ringHsl);
}

export function applyThemeToDocument(themeMode: ThemeMode): ResolvedTheme {
  if (typeof window === 'undefined') return 'light';

  const resolved = themeMode === 'system' ? getSystemTheme() : themeMode;
  const root = document.documentElement;

  // Inject temporary style tag to suppress smooth transitions during theme toggle for instant 0ms repaint
  const style = document.createElement('style');
  style.appendChild(
    document.createTextNode(
      '*, *::before, *::after { transition: none !important; }'
    )
  );
  document.head.appendChild(style);

  if (resolved === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }

  // Force synchronous reflow so browser paints theme change immediately
  window.getComputedStyle(root).opacity;

  // Restore CSS transitions on next event loop tick
  setTimeout(() => {
    if (document.head.contains(style)) {
      document.head.removeChild(style);
    }
  }, 1);

  return resolved;
}
