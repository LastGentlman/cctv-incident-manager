import { render, screen } from '@testing-library/react';
import App from './App';

test('renders CCTV Incident Manager', () => {
  render(<App />);
  const linkElement = screen.getByText(/Sistema de Registro CCTV/i);
  expect(linkElement).toBeInTheDocument();
});
