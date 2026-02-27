import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';

describe('App Component Routing', () => {
  const renderWithProviders = () => render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );

  test('renders the suspended loading state initially', () => {
    renderWithProviders();
    expect(screen.getByText(/Loading content/i)).toBeInTheDocument();
  });
});
