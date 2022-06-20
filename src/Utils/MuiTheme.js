import { createTheme } from "@mui/material";
import { green, grey, purple, red } from "@mui/material/colors";
export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: purple[600],
      light: purple[400],
      dark: purple[900],
    },
    success: {
      main: green[500],
      light: green[300],
      dark:green[800]
    },
    secondary: {
      main: grey[600],
      light: grey[400],
      dark: grey[900],
    },
    error: {
      main: red[500], 
      light: red[300],
      dark:red[700]
    }
  },
});
