import React from 'react';
import { ThemeProvider } from 'styled-components';

import { StatusBar } from './src/components/StatusBar/styles';
import theme from './src/global/styles/theme';

import Router from './src/Router';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        backgroundColor="transparent"
        translucent
      />
      <Router />
    </ThemeProvider>
  );
}