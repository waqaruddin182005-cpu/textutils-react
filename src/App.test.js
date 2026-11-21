import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';

test('renders the text analyzer heading', () => {
  render(<App />);
  expect(screen.getByText(/enter the text to analyze below/i)).toBeInTheDocument();
  expect(screen.queryByRole('heading', { name: /about textutils/i })).not.toBeInTheDocument();
});

test('navigates between the home and about pages', () => {
  render(<App />);

  fireEvent.click(screen.getByRole('link', { name: 'About' }));
  expect(screen.getByRole('heading', { name: /about textutils/i })).toBeInTheDocument();
  expect(screen.queryByRole('textbox', { name: /text to analyze/i })).not.toBeInTheDocument();

  fireEvent.click(screen.getByRole('link', { name: 'Home' }));
  expect(screen.getByRole('textbox', { name: /text to analyze/i })).toBeInTheDocument();
});

test('shows an alert for text actions and dark mode', async () => {
  const writeText = jest.fn().mockResolvedValue();
  Object.defineProperty(navigator, 'clipboard', {
    configurable: true,
    value: { writeText },
  });
  Object.defineProperty(window, 'isSecureContext', {
    configurable: true,
    value: true,
  });

  render(<App />);
  const textarea = screen.getByRole('textbox', { name: /text to analyze/i });
  fireEvent.change(textarea, { target: { value: '  Hello   World  ' } });

  fireEvent.click(screen.getByRole('button', { name: /convert to uppercase/i }));
  expect(screen.getByRole('alert')).toHaveTextContent(/converted to uppercase/i);

  fireEvent.click(screen.getByRole('button', { name: /convert to lowercase/i }));
  expect(screen.getByRole('alert')).toHaveTextContent(/converted to lowercase/i);

  fireEvent.click(screen.getByRole('button', { name: /remove extra spaces/i }));
  expect(textarea).toHaveValue('hello world');
  expect(screen.getByRole('alert')).toHaveTextContent(/extra spaces removed/i);

  fireEvent.click(screen.getByRole('button', { name: /copy text/i }));
  await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent(/copied to clipboard/i));
  expect(writeText).toHaveBeenCalledWith('hello world');

  fireEvent.click(screen.getByRole('button', { name: /clear text/i }));
  expect(textarea).toHaveValue('');
  expect(screen.getByRole('alert')).toHaveTextContent(/text cleared/i);

  fireEvent.click(screen.getByRole('switch', { name: /enable darkmode/i }));
  expect(screen.getByRole('alert')).toHaveTextContent(/light mode enabled/i);
});
