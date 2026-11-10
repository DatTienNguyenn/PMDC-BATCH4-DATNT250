import { createTheme } from '@mui/material/styles';

export const muiTheme = createTheme({
  palette: {
    primary: {
      main: '#00A76F',
      light: '#5adda0',
      dark: '#006c46',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#006b5c',
      light: '#97f4de',
      dark: '#005145',
      contrastText: '#ffffff',
    },
    error: {
      main: '#ba1a1a',
      light: '#ffdad6',
      dark: '#93000a',
    },
    warning: {
      main: '#f59e0b',
      light: '#fef3c7',
      dark: '#b45309',
    },
    info: {
      main: '#0284c7',
      light: '#e0f2fe',
      dark: '#0369a1',
    },
    success: {
      main: '#00A76F',
      light: '#e8f7f0',
      dark: '#006c46',
    },
    background: {
      default: '#f7f9ff',
      paper: '#ffffff',
    },
    text: {
      primary: '#121c27',
      secondary: '#637381',
    },
  },
  typography: {
    fontFamily: ['"Public Sans"', 'sans-serif'].join(','),
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '8px 16px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
        },
      },
    },
  },
});
