import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FAC8B4",
      mainGreen: "#007f5b",
      mainRed: "#F04150",
    },
    secondary: {
      main: "#DB3F2E",
    },
    hover: {
      main: "#d9ac9aff",
      mainGreen: "#005f3b",
    },
    white: {
      main: "#FFF",
    },
    text: {
      primary: "#000",
      secondary: "#666",
      white: "#FFF",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1280,
      xl: 1440,
    },
  },
  typography: {
    fontFamily: "Plus Jakarta Sans, sans-serif",
  },
});

export default theme;
