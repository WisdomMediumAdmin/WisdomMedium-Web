import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { SectionHeading } from './App';

afterEach(cleanup);

describe('SectionHeading', () => {
  it('omits the description paragraph when no description is provided', () => {
    const { container, rerender } = render(<SectionHeading eyebrow="OUR APPS" title="Apps" />);
    expect(screen.getByRole('heading', { level: 2, name: 'Apps' })).toBeTruthy();
    expect(screen.getByText('OUR APPS')).toBeTruthy();
    expect(container.querySelector('p')).toBeNull();
    rerender(<SectionHeading eyebrow="OUR APPS" title="Apps">Helpful tools.</SectionHeading>);
    expect(container.querySelector('p')?.textContent).toBe('Helpful tools.');
    rerender(<SectionHeading eyebrow="OUR APPS" title="Apps" />);
    expect(container.querySelector('p')).toBeNull();
  });
});
