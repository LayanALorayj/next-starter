"use client";
import MuiPagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <Stack alignItems="center" mt={4}>
      <MuiPagination
        count={totalPages}
        page={currentPage}
        color="primary"
        onChange={(_, value) => onPageChange(value)}
      />
    </Stack>
  );
}
