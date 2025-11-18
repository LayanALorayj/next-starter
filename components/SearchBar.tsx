"use client";

import { SetStateAction, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter, usePathname } from "next/navigation";

async function fetchAnime(query: string) {
  if (!query) return null;
  const res = await fetch(`https://api.jikan.moe/v4/anime?q=${query}`);
  if (!res.ok) throw new Error("Failed to fetch anime");
  return res.json();
}

export default function SearchBar({ initialQuery = "" }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();
  const pathname = usePathname();

  const { data, isFetching, refetch } = useQuery({
    queryKey: ["anime", query],
    queryFn: () => fetchAnime(query),
    enabled: false, 
  });

  function handleSearch() {
    if (!query) return;
    refetch();
    router.push(`${pathname}?q=${encodeURIComponent(query)}&page=1`);
  }

  function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") handleSearch();
  }

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 400, ml: 4 }}>
      <Stack direction="row" spacing={1}>
        <TextField
          fullWidth
          size="small"
          variant="outlined"
          placeholder="Search anime..."
          value={query}
          onChange={(e: { target: { value: SetStateAction<string>; }; }) => setQuery(e.target.value)}
          onKeyDown={handleKeyPress}
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
          disabled={isFetching}
          sx={{
            backgroundColor: "#4fc3f7",
            color: "#0d1117",
            fontWeight: "bold",
            "&:hover": { backgroundColor: "#6ecfff" },
          }}
        >
          {isFetching ? <CircularProgress size={22} sx={{ color: "#0d1117" }} /> : "Search"}
        </Button>
      </Stack>
    </Box>
  );
}
