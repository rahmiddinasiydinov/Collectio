import { createTheme } from "@mui/material";
import { green, grey, purple, red } from "@mui/material/colors";
export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: purple[800],
      light: purple[400],
      dark: purple[900],
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
    mode: "dark",
    primary: {
      main: purple[100],
      light: purple[200],
      dark: purple[50],
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

