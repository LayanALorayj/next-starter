"use client";

import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function SearchBar({ initialQuery = "" }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();
  const pathname = usePathname();

  function handleSearch() {
    router.push(`${pathname}?q=${encodeURIComponent(query)}&page=1`);
  }

  return (
    <Stack direction="row" spacing={2} justifyContent="center">
      <TextField
        label="Search anime..."
        variant="outlined"
        size="small"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button variant="contained" onClick={handleSearch}>
        Search
      </Button>
    </Stack>
  );
}
