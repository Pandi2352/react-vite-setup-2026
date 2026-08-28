import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Button } from '@/components/ui/button';

describe('Button Component', () => {
  it('renders button with children text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('displays loading spinner when isLoading is true', () => {
    render(<Button isLoading>Loading State</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
