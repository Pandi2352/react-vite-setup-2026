/**
 * Basic HTML/XSS string sanitizer to prevent injection in user inputs
 */
export function sanitizeInput(input: string): string {
  if (!input) return '';
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Validates if string is safe alphanumeric string
 */
export function isSafeAlphaNumeric(input: string): boolean {
  return /^[a-zA-Z0-9_\-\s]+$/.test(input);
}
