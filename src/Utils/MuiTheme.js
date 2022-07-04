import { createTheme } from "@mui/material";
import { green, grey, red } from "@mui/material/colors";
export const theme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#FCF8E8",
      paper:'#f3e5f5'
    },
    primary: {
      main: '#000',
      light: '#222',
      dark: '#000',
    },
    success: {
      main: green[500],
      light: green[300],
      dark: green[800],
    },
    secondary: {
      main: grey[600],
      light: grey[400],
      dark: grey[900],
    },
    error: {
      main: red[500],
      light: red[300],
      dark: red[700],
    },
  },
});
export const themeDark = createTheme({
  palette: {
    background: {
      default: "#161616",
    },
    mode: "dark",
    primary: {
      main: '#EEE',
      light: '#FFF',
      dark: '#AAA',
    },
    success: {
      main: green[500],
      light: green[300],
      dark: green[800],
    },
    secondary: {
      main: grey[100],
      light: grey[200],
      dark: grey[50],
    },
    error: {
      main: red[500],
      light: red[300],
      dark: red[700],
    },
  },
});

