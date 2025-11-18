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
              bottom: 0,
              left: 0,
              width: "100%",
              borderTop: "1px solid #222",
              backgroundColor: "#000",
              py: 1.5,
              display: "flex",
              justifyContent: "center",
              textDecoration: "none",
              mt: "auto",
            }}
    >
      <Button
        variant="contained"
        color="primary"
        sx={{
                color: "#f3f3f3",
                borderColor: "#ffda00",
                fontSize: 12,
                borderRadius: 1,
                px: 5,
                backgroundColor: "#4fc3f7",
                "&:hover": { backgroundColor: "#83d1f6ff", color: "#000" },
              }}
      >
        Back Home
      </Button>
    </Box>
  );
}

