import { render, screen } from '@testing-library/react';
import App from './App';

// const oldEnv = process.env;

beforeEach(() => {
  // process.env.REACT_APP_BOX_TIMEOUT_MINUTES = 10;
});

afterEach(() => {
  // process.env = oldEnv;
});

test('renders spinner', () => {

  render(<App
    apiURL="http://localhost:8080"
    apiTimeout={2000}
    forcedState="loading"
    boxTimeout={10}
  />);
  const spinner = screen.getByTestId('spinner')
  expect(spinner).toBeInTheDocument();
});
