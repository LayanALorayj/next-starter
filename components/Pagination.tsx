"use client";

import Stack from "@mui/material/Stack";
import MuiPagination from "@mui/material/Pagination";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

interface PaginationProps {
  totalPages: number;
  query: string;
}

export default function Pagination({ totalPages, query }: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    const pageParam = `page=${value}`;
    if (query) {
      router.push(`${pathname}?q=${encodeURIComponent(query)}&${pageParam}`);
    } else {
      router.push(`${pathname}?${pageParam}`);
    }
  };

  return (
    <Stack alignItems="center" mt={4} mb={4}>
      <MuiPagination
        count={totalPages}
        page={currentPage}
        color="primary"
        onChange={handleChange}
      />
    </Stack>
  );
}