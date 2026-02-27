import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from './Modal';

describe('Modal Component', () => {
  const defaultProps = {
    isOpen: true,
    onClose: jest.fn(),
    title: 'Test Modal',
  };

  test('does not render when isOpen is false', () => {
    render(<Modal {...defaultProps} isOpen={false}><div data-testid="child">Child</div></Modal>);
    expect(screen.queryByTestId('child')).not.toBeInTheDocument();
    expect(screen.queryByText('Test Modal')).not.toBeInTheDocument();
  });

  test('renders children and text when isOpen is true', () => {
    render(
      <Modal {...defaultProps}>
        <div data-testid="child">Child Content</div>
      </Modal>
    );
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  test('calls onClose when the close button is clicked', () => {
    render(<Modal {...defaultProps}><div /></Modal>);
    // The close button is the one showing the 'X' icon.
    // We can assume it's the only generic button, or query the img directly.
    const closeBtn = screen.getByRole('button');
    fireEvent.click(closeBtn);
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });
});
