import { render, screen } from '@testing-library/react';
import App from './App';

test('renders brand title', () => {
  render(<App />);
  const brand = screen.getByText(/Purpletech Laptops/i);
  expect(brand).toBeInTheDocument();
});
