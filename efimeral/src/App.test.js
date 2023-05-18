import { render, screen } from '@testing-library/react';
import App from './App';

test('renders spinner', () => {
  render(<App />);
  const spinner = screen.getByTestId('spinner')
  expect(spinner).toBeInTheDocument();
});
