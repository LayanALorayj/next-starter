"use client";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function Hero() {
  return (
    <Box textAlign="center" py={6}>
      <Typography variant="h3" fontWeight="bold" color="primary" gutterBottom>
        Anime Finder
      </Typography>
      <Typography variant="subtitle1" color="text.secondary">
        Explore and search your favorite anime!
      </Typography>
    </Box>
  );
}
