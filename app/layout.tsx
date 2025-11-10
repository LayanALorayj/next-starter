"use client";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./globals.css";

const theme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#f7f8fa",
      paper: "#ffffff",
    },
    primary: {
      main: "#e996d3",
      contrastText: "#1a1a1a",
    },
    secondary: {
      main: "#d18aff",
      contrastText: "#1a1a1a",
    },
    text: {
      primary: "#1a1a1a",
      secondary: "#555555",
    },
    error: { main: "#f13c8d" },
    warning: { main: "#f9a825" },
    info: { main: "#42a5f5" },
    success: { main: "#66bb6a" },
  },
  shape: {
    borderRadius: 8,
  },
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            {/* Header ثابت فوق كل الصفحات */}
            <Header />

            {/* المحتوى الأساسي */}
            <Box component="main" sx={{ flex: 1, py: 4 }}>
              {children}
            </Box>

            {/* Footer ثابت أسفل الصفحة */}
            <Footer />
          </Box>
        </ThemeProvider>
      </body>
    </html>
  );
}
