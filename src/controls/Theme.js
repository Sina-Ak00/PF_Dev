import React from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: 'Iranian-Sans'
    },
  });

export default function Theme(props) {
  return (
    <ThemeProvider theme={theme}>
        {props.children}
    </ThemeProvider>
  )
}
