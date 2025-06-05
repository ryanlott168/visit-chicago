import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('react-leaflet', () => {
  const React = require('react');
  return {
    MapContainer: ({ children }) => <div>{children}</div>,
    TileLayer: () => null,
    Marker: ({ children }) => <div>{children}</div>,
    Popup: ({ children }) => <div>{children}</div>,
    useMapEvents: () => {},
  };
});

test('renders welcome message', () => {
  render(<App />);
  const heading = screen.getByText(/welcome to chicago/i);
  expect(heading).toBeInTheDocument();
});
