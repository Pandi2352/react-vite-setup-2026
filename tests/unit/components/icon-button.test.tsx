import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { IconButton } from '@/components/ui/icon-button';
import { Trash2, Search, X } from 'lucide-react';

describe('IconButton Common Component', () => {
  it('renders icon and applies accessible aria-label', () => {
    render(<IconButton icon={<Search className="h-4 w-4" />} aria-label="Search items" />);

    const button = screen.getByRole('button', { name: 'Search items' });
    expect(button).toBeInTheDocument();
  });

  it('triggers onClick handler when clicked', () => {
    const handleClick = vi.fn();
    render(
      <IconButton
        icon={<Trash2 className="h-4 w-4" />}
        aria-label="Delete entry"
        onClick={handleClick}
      />
    );

    const button = screen.getByRole('button', { name: 'Delete entry' });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('disables button when disabled or loading', () => {
    const { rerender } = render(
      <IconButton icon={<X className="h-4 w-4" />} aria-label="Close" disabled />
    );

    const button = screen.getByRole('button', { name: 'Close' });
    expect(button).toBeDisabled();

    rerender(<IconButton icon={<X className="h-4 w-4" />} aria-label="Close" isLoading />);
    expect(button).toBeDisabled();
  });

  it('renders with tooltip when provided', () => {
    render(
      <IconButton
        icon={<Search className="h-4 w-4" />}
        aria-label="Search items"
        tooltip="Quick Search"
      />
    );

    const button = screen.getByRole('button', { name: 'Search items' });
    expect(button).toBeInTheDocument();
  });
});
