"use client";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Link from "next/link";
import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function Header() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);

  const router = useRouter();
  const pathname = usePathname();

  function handleSearch() {
    router.push(`${pathname}?q=${encodeURIComponent(query)}&page=1`);
  }

  function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") handleSearch();
  }

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
       <Link href="/" style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <Box
            component="img"
            src="/logo.png"
            alt="Logo"
            sx={{ width: 40, height: 40 }} 
          />
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ letterSpacing: 1, alignItems:"center", cursor: "pointer", color: "#fff" }}
          >
            Anime Finder
          </Typography>
        </Link>

        <Box sx={{ flexGrow: 1, maxWidth: 400, ml: 4 }}>
          <Stack direction="row" spacing={1}>
            <TextField fullWidth size="small"
            variant="outlined" placeholder="Search anime..."
             value={query} onChange={(e) =>
               setQuery(e.target.value)} onKeyDown={handleKeyPress}
              sx={{
                backgroundColor: "#0d1117",
                borderRadius: 1,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#4fc3f7" },
                  "&:hover fieldset": { borderColor: "#6ecfff" },
                  "& input": { color: "#ffffff" },
                },
              }}
            />
              <Button
            variant="contained"
            onClick={handleSearch}
            sx={{
              backgroundColor: "#4fc3f7",
              color: "#0d1117",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#6ecfff",
              },
            }}
          >
            Search
          </Button>
          </Stack>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
