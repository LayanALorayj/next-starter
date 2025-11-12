"use client";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Header from "../components/Header";
import Footer from "../components/Footer";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: { default: "#0d1117", paper: "#161b22" },
    primary: { main: "#4fc3f7", contrastText: "#fff" },
    text: { primary: "#fff", secondary: "#bbb" },
  },
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Header />
            <Box component="main" sx={{ flex: 1 }}>
              {children}
            </Box>
            <Footer />
          </Box>
        </ThemeProvider>
      </body>
    </html>
  );
}
