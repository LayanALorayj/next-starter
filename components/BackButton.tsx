"use client";

import Link from "next/link";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export default function BackButton() {
  return (
    <Box
      component={Link}
      href="/"
      sx={{
        mb: 3,
        mt: 3,
        display: "inline-block",
        textDecoration: "none",
      }}
    >
      <Button
        variant="contained"
        color="primary"
        sx={{
          color: "#fff",
          fontSize: "0.8rem",
          padding: "6px 12px",
        }}
      >
        Back Home
      </Button>
    </Box>
  );
}

