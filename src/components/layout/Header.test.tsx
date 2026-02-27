import * as React from 'react';
import { render, screen } from '../../utils/test-utils';
import { Header } from './Header';

describe('Header Component', () => {
  test('renders default title and description', () => {
    render(<Header />);
    expect(screen.getByText('COI Review Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Overview of all Certificate of insurance')).toBeInTheDocument();
  });

  test('renders custom title and description', () => {
    render(<Header title="Custom Title" description="Custom Description" />);
    expect(screen.getByText('Custom Title')).toBeInTheDocument();
    expect(screen.getByText('Custom Description')).toBeInTheDocument();
  });

  test('renders Send Bulk Reminder when selectedCount is 0', () => {
    render(<Header selectedCount={0} />);
    const button = screen.getByRole('button', { name: /Send Bulk Reminder/i });
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  test('renders Send N Reminders when selectedCount > 0', () => {
    render(<Header selectedCount={3} />);
    const button = screen.getByRole('button', { name: /Send 3 Reminders/i });
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
  });
});
