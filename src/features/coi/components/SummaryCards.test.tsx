import * as React from 'react';
import { render, screen } from '../../../utils/test-utils';
import { SummaryCards } from './SummaryCards';

describe('SummaryCards Component', () => {
  test('renders all statistics correctly', () => {
    render(<SummaryCards total={100} accepted={80} rejected={15} expiring={5} />);
    
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('Total COI Processed')).toBeInTheDocument();

    expect(screen.getByText('80')).toBeInTheDocument();
    expect(screen.getByText('Accepted')).toBeInTheDocument();

    expect(screen.getByText('15')).toBeInTheDocument();
    expect(screen.getByText('Rejected')).toBeInTheDocument();

    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('Expiring in 30 days')).toBeInTheDocument();
  });
});
