"use client";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

export default function Hero() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  async function fetchRandomAnime() {
    try {
      setLoading(true);
      const randomPage = Math.floor(Math.random() * 100) + 1;
      const res = await fetch(
        `https://api.jikan.moe/v4/anime?page=${randomPage}&limit=1`
      );
      const data = await res.json();
      const anime = data.data?.[0];
      if (anime?.images?.jpg?.large_image_url) {
        setImage(anime.images.jpg.large_image_url);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRandomAnime();
    const interval = setInterval(fetchRandomAnime, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        height: 400,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        borderRadius: 2,
        overflow: "hidden",
        mb: 6,
        mt: 6,
        transition: "background-image 1s ease-in-out",
      }}
    >
      {loading ? (
        <CircularProgress color="primary" />
      ) : (
        <>
          {image && (
            <Box
              component="img"
              src={image}
              alt="Random Anime"
              key={image}
              sx={{
                position: "absolute",
                width: "100%",
                height: "100%",
                objectFit: "cover",
                zIndex: 0,
                filter: "brightness(60%)",
                transition: "opacity 1s ease-in-out",
              }}
            />
          )}
          <Box sx={{ position: "relative", zIndex: 1, textAlign: "center" }}>
            <Typography variant="h3" fontWeight="bold" gutterBottom>
              Anime Finder
            </Typography>
            <Typography variant="subtitle1" color="inherit">
              Explore and search your favorite anime!
            </Typography>
          </Box>
        </>
      )}
    </Box>
  );
}
