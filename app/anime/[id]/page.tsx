"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button"; 
import { useTheme } from "@mui/material/styles";

export default function AnimeDetail() {
  const { id } = useParams();
  const router = useRouter(); 
  const [anime, setAnime] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const theme = useTheme(); 

  useEffect(() => {
    if (!id) return;

    async function fetchAnime() {
      try {
        setLoading(true);
        setError(false);

        const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
        if (!res.ok) throw new Error(`Failed to fetch anime: ${res.status}`);

        const json = await res.json();
        if (!json.data) throw new Error("No anime data found");

        setAnime(json.data);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchAnime();
  }, [id]);

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
        <CircularProgress color="primary" />
      </Box>
    );

  if (error || !anime)
    return (
      <Container sx={{ py: 6, textAlign: "center" }}>
        <Typography variant="h5" color="error">
          No anime data found. Please try again later.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
          onClick={() => router.push("/")} 
        >
          Back Home
        </Button>
      </Container>
    );

  return (
    <Container
      sx={{
        py: 6,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: theme.palette.background.default,
        minHeight: "100vh",
      }}
    >

      <Card
        sx={{
          maxWidth: 600,
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
        }}
      >
        <CardMedia
          component="img"
          image={anime.images?.jpg?.large_image_url || "/placeholder.png"}
          alt={anime.title || "Unknown Title"}
          sx={{ height: 400, objectFit: "cover" }}
        />
        <CardContent>
          <Typography variant="h4" fontWeight="bold" color="primary">
            {anime.title || "Unknown Title"}
          </Typography>
          <Typography variant="body1" color="text.secondary" mt={2}>
            {anime.synopsis || "No synopsis available."}
          </Typography>
          <Typography mt={3}>
            <b>Episodes:</b> {anime.episodes ?? "?"}
          </Typography>
          <Typography>
            <b>Score:</b> {anime.score ?? "?"}
          </Typography>
          <Typography>
            <b>Year:</b> {anime.year ?? "?"}
          </Typography>
          <Button
        variant="contained"
        color="primary"
        sx={{ mb: 3, mt:3, alignSelf: "flex-start",  color: "#fff",
          fontSize: "0.8rem",   
          padding: "6px 12px"
         }}
        onClick={() => {
          router.replace("/");
          router.refresh(); 
}}
      >
        Back Home
      </Button>
        </CardContent>
      </Card>
    </Container>
  );
}
