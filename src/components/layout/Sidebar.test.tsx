import * as React from 'react';
import { render, screen } from '../../utils/test-utils';
import { Sidebar } from './Sidebar';

describe('Sidebar Component', () => {
  test('renders all navigation items', () => {
    render(<Sidebar />);
    expect(screen.getByText('LegalGraph AI')).toBeInTheDocument();
    
    const items = ['Contract Vault', 'COI Dashboard', 'Analysis Results', 'Setting'];
    items.forEach(item => {
      // The name might be visually hidden on collapse, but it should exist in the DOM
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  test('Review documents button is present', () => {
    render(<Sidebar />);
    expect(screen.getByRole('button', { name: /Review documents/i })).toBeInTheDocument();
  });
});
