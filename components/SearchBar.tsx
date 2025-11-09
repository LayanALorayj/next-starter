"use client";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

interface SearchProps {
  value: string;
  onChange: (v: string) => void;
  onSearch: (v: string) => void;
}

export default function SearchBar({ value, onChange, onSearch }: SearchProps) {
  return (
    <Stack direction="row" spacing={2} justifyContent="center">
      <TextField
        label="Search anime..."
        variant="outlined"
        size="small"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <Button variant="contained" onClick={() => onSearch(value)}>
        Search
      </Button>
    </Stack>
  );
}
