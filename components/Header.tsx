import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "next/link";
import SearchBar from "./SearchBar"; 

export default function Header() {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#161b22",
        color: "#ffffff",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            textDecoration: "none",
          }}
        >
          <Box
            component="img"
            src="/logo.png"
            alt="Logo"
            sx={{ width: 60, height: 40 }}
          />
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{
              letterSpacing: 1,
              alignItems: "center",
              cursor: "pointer",
              color: "#fff",
            }}
          >
            Anime Finder
          </Typography>
        </Link>

        <SearchBar />
      </Toolbar>
    </AppBar>
  );
}
