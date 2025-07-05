import React, { StrictMode, useState, useMemo } from 'react';
import { createRoot } from 'react-dom/client'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './index.css'
import App from './App.tsx'

import { ApolloProvider } from '@apollo/client';
import client from './lib/apolloClient';

// Create a wrapper component to handle theme state
const AppWithTheme: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const theme = useMemo(() => createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      primary: {
        main: '#646cff',
      },
      secondary: {
        main: '#535bf2',
      },
      background: {
        default: isDarkMode ? '#121212' : '#f0f8ff',
        paper: isDarkMode ? '#1e1e1e' : 'rgba(255, 255, 255, 0.95)',
      },
    },
    typography: {
      fontFamily: '"Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif',
      h4: {
        fontSize: '2.125rem',
        lineHeight: 1.3,
        fontWeight: 700,
        letterSpacing: '-0.02em',
      },
      h6: {
        fontSize: '1.25rem',
        lineHeight: 1.4,
        fontWeight: 600,
        letterSpacing: '-0.01em',
      },
      body1: {
        fontSize: '1rem',
        lineHeight: 1.6,
        fontWeight: 400,
      },
      body2: {
        fontSize: '0.9375rem',
        lineHeight: 1.5,
        fontWeight: 400,
      },
      subtitle2: {
        fontSize: '0.875rem',
        lineHeight: 1.4,
        fontWeight: 600,
        letterSpacing: '0.02em',
      },
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: isDarkMode ? '#2d2d2d' : '#ffffff',
            borderColor: isDarkMode ? '#404040' : '#e0e0e0',
          },
        },
      },
    },
  }), [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ApolloProvider client={client}>
        <App isDarkMode={isDarkMode} onToggleTheme={toggleTheme} />
      </ApolloProvider>
    </ThemeProvider>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppWithTheme />
  </StrictMode>,
)
