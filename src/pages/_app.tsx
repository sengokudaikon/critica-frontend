import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AppProps } from 'next/app';

const theme = createTheme();

function App({ Component, pageProps }: AppProps) {
  return (
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
  );
}

export default App;