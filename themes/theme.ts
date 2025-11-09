// themes/theme.ts
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#e996d3", // تقريبا بدل oklch(82% 0.189 84.429)
      contrastText: "#743da3", 
    },
    secondary: {
      main: "#e996d3", 
      contrastText: "#6a3f3f",
    },
    accent: {
      main: "#d46e85", 
      contrastText: "#47212b",
    },
    neutral: {
      main: "#605b99",
      contrastText: "#f7f7f7",
    },
    info: {
      main: "#7a8bff",
      contrastText: "#f7f7f7",
    },
    success: {
      main: "#50d8b1",
      contrastText: "#f7f7f7",
    },
    warning: {
      main: "#d4c359",
      contrastText: "#f7f3e7",
    },
    error: {
      main: "#e5278e",
      contrastText: "#f7e8f1",
    },
    background: {
      default: "#f7f7f7",
      paper: "#ffffff", 
    },
    text: {
      primary: "#1a1a1a",
      secondary: "#555555",
    },
  },
  shape: {
    borderRadius: 8,
  },
});

export default theme;
