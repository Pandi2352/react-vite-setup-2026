import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Button } from '@/components/ui/button';

describe('Button Component', () => {
  it('renders button with children text', () => {
    const { getByRole } = render(<Button>Click me</Button>);
    expect(getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('displays loading spinner when isLoading is true', () => {
    const { getByRole } = render(<Button isLoading>Loading State</Button>);
    expect(getByRole('button')).toBeDisabled();
  });
});
