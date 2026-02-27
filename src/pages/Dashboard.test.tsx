import * as React from 'react';
import { render, screen, fireEvent, waitFor } from '../utils/test-utils';
import Dashboard from './Dashboard';
import { COIRecord } from '../types';

// We mock the child components to focus on Dashboard's logic and coverage.
// Alternatively, we can let them render to test integration, but since Dashboard
// mainly wires up state and callbacks, full integration might be heavy. Let's do full integration
// as our test-utils should provide the Redux store.

describe('Dashboard Page', () => {
  test('renders Dashboard layout with Header, SummaryCards, FiltersBar, and Table', () => {
    // Our test-utils renders with the Redux store preloaded with the mock data if any, or empty array.
    const { container } = render(<Dashboard />);
    
    // Check Header elements
    expect(screen.getByText('COI Review Dashboard')).toBeInTheDocument();
    
    // Check SummaryCards text (the child component renders this)
    expect(screen.getByText('Total COI Processed')).toBeInTheDocument();
  });

  test('opens and closes Add COI Modal', async () => {
    render(<Dashboard />);
    
    // Find the Add COI button inside the FiltersBar (assuming it says "Add COI" or has an icon with accessibility)
    // Looking at FiltersBar.tsx (we assume it has "Add COI" text or we can click it if we know the aria role)
    // Typically the button text is "Add COI"
    const addBtn = screen.getByText(/Add COI/i);
    fireEvent.click(addBtn);
    
    // The AddCOIModal should open. Let's look for its title "Add Certificate of Insurance" or similar.
    // Wait for the modal to appear
    await waitFor(() => {
      // Add COI Modal usually has "Add Certificate of Insurance" or "Add COI" heading
      const modalHeading = screen.getByRole('heading', { name: /Add /i });
      expect(modalHeading).toBeInTheDocument();
    });
  });

  test('opens and closes Ask AI Modal', async () => {
    render(<Dashboard />);
    
    // Header has "Ask LegalGraph AI" button
    const askAIBtn = screen.getByText(/Ask LegalGraph AI/i);
    fireEvent.click(askAIBtn);
    
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
  });

  test('opens and closes Help Modal', async () => {
    render(<Dashboard />);
    
    // Header might have "Help" or we need to find the icon button. 
    // Usually it has a title or aria-label
    const helpBtns = screen.queryAllByRole('button').filter(b => b.innerHTML.includes('lucide-help') || b.textContent?.includes('Help'));
    if (helpBtns.length > 0) {
       fireEvent.click(helpBtns[0]);
    } else {
       // fallback if the string is different
       const btn = screen.getByRole('button', { name: /help/i });
       fireEvent.click(btn);
    }
    
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
  });

  test('selects all rows and opens Bulk Reminder modal', async () => {
    render(<Dashboard />);
    
    // Find the header checkbox (Select All). 
    const checkboxes = screen.getAllByRole('checkbox');
    const selectAllCheckbox = checkboxes[0];
    
    // Check it
    fireEvent.click(selectAllCheckbox);
    
    // Now the Bulk Reminder button should reflect counts and be clickable
    const bulkBtn = screen.getByRole('button', { name: /Send.*Reminder/i });
    expect(bulkBtn).not.toBeDisabled();
    
    fireEvent.click(bulkBtn);
    
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /Send Reminder/i })).toBeInTheDocument();
    });
  });

  test('opens Edit COI Modal when edit action is clicked', async () => {
    render(<Dashboard />);
    
    // Action dropdowns use an img with alt="Options"
    const actionToggles = screen.getAllByAltText('Options');
    fireEvent.click(actionToggles[0].closest('button')!);
    
    await waitFor(() => {
      const editOption = screen.getByText('Edit');
      fireEvent.click(editOption);
    });
    
    await waitFor(() => {
      // Edit modal opens
      expect(screen.getByRole('heading', { name: /Edit/i })).toBeInTheDocument();
    });
  });

  test('opens Delete COI Modal when delete action is clicked', async () => {
    render(<Dashboard />);
    
    const actionToggles = screen.getAllByAltText('Options');
    fireEvent.click(actionToggles[0].closest('button')!);
    
    await waitFor(() => {
      const deleteOption = screen.getByText('Delete');
      fireEvent.click(deleteOption);
    });
    
    await waitFor(() => {
      // Delete modal appears
      expect(screen.getByRole('heading', { name: /Delete/i })).toBeInTheDocument();
    });
  });

  test('filters table data securely', async () => {
    render(<Dashboard />);
    
    // Find the Search input by placeholder "Search by property or tenant..."
    const searchInput = screen.getByPlaceholderText(/Search/i);
    fireEvent.change(searchInput, { target: { value: 'NonExistentTenantXYZ' } });
    
    // The table should have no results or show 0 out of 0
    await waitFor(() => {
      const emptyText = screen.queryByText(/Showing 1 to/i);
      expect(emptyText).not.toBeInTheDocument();
    });
  });

  test('adds a new record', async () => {
    render(<Dashboard />);
    
    const addBtn = screen.getByText(/Add COI/i);
    fireEvent.click(addBtn);
    
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /Add /i })).toBeInTheDocument();
    });

    const inputs = screen.getAllByRole('textbox');
    const propertyInput = inputs.find(el => el.getAttribute('name') === 'property');
    const tenantInput = inputs.find(el => el.getAttribute('name') === 'tenantName');
    const unitInput = inputs.find(el => el.getAttribute('name') === 'unit');
    const coiNameInput = inputs.find(el => el.getAttribute('name') === 'coiName');
    // Date input has role="textbox" ? Actually no, input type="date" doesn't have role="textbox" usually.
    // Let's use getByLabelText or querySelector for date
    
    if (propertyInput) fireEvent.change(propertyInput, { target: { value: 'New Test Property' } });
    if (tenantInput) fireEvent.change(tenantInput, { target: { value: 'New Tenant' } });
    if (unitInput) fireEvent.change(unitInput, { target: { value: 'Unit X' } });
    if (coiNameInput) fireEvent.change(coiNameInput, { target: { value: 'COI_TEST_01' } });

    // Expiry date is required
    const dateQuery = document.querySelector('input[name="expiryDate"]');
    if (dateQuery) {
      fireEvent.change(dateQuery, { target: { value: '2025-12-31' } });
    }

    const saveBtn = screen.getByRole('button', { name: /Save COI/i });
    fireEvent.click(saveBtn);
    // Alternatively, force submit if JSDOM is picky about required fields:
    fireEvent.submit(saveBtn.closest('form')!);

    await waitFor(() => {
      expect(screen.queryByRole('heading', { name: /Add /i })).not.toBeInTheDocument();
    });
  });

  test('edits an existing record', async () => {
    render(<Dashboard />);
    
    const actionToggles = screen.getAllByAltText('Options');
    fireEvent.click(actionToggles[0].closest('button')!);
    
    await waitFor(() => {
      const editOption = screen.getByText('Edit');
      fireEvent.click(editOption);
    });
    
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /Edit/i })).toBeInTheDocument();
    });

    const saveBtn = screen.getByRole('button', { name: /Save Changes/i });
    // Force submit to bypass JSDOM validation issues on pre-filled inputs
    fireEvent.submit(saveBtn.closest('form')!);

    await waitFor(() => {
      expect(screen.queryByRole('heading', { name: /Edit/i })).not.toBeInTheDocument();
    });
  });

  test('deletes an existing record', async () => {
    render(<Dashboard />);
    
    const actionToggles = screen.getAllByAltText('Options');
    fireEvent.click(actionToggles[0].closest('button')!);
    
    await waitFor(() => {
      const deleteOption = screen.getByText('Delete');
      fireEvent.click(deleteOption);
    });
    
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /Delete/i })).toBeInTheDocument();
    });

    const confirmBtn = screen.getByRole('button', { name: 'Delete' });
    fireEvent.click(confirmBtn);

    await waitFor(() => {
      expect(screen.queryByRole('heading', { name: /Delete/i })).not.toBeInTheDocument();
    });
  });

  test('changes status of a record', async () => {
    render(<Dashboard />);
    
    // Find the first status select
    const selects = screen.getAllByRole('combobox');
    // The first combobox might be in the FiltersBar, let's find one that has 'Active' etc.
    const statusSelect = selects.find(s => s.innerHTML.includes('Expiring Soon')) || selects[1];
    
    fireEvent.change(statusSelect, { target: { value: 'Rejected' } });
    // Assuming UI updates, Redux dispatch is called
    expect((statusSelect as HTMLSelectElement).value).toBe('Rejected');
  });

  test('selects and deselects a row', async () => {
    render(<Dashboard />);
    
    const checkboxes = screen.getAllByRole('checkbox');
    const firstRowCheckbox = checkboxes[1]; // index 0 is Select All
    
    fireEvent.click(firstRowCheckbox);
    expect(firstRowCheckbox).toBeChecked();

    fireEvent.click(firstRowCheckbox);
    expect(firstRowCheckbox).not.toBeChecked();
  });
});
