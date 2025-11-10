"use client";

import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useSearchParams } from "next/navigation";
import AnimeCard from "./AnimeCard";

export default function AnimeGrid() {
  const searchParams = useSearchParams();
  const search = searchParams.get("q") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);

  const [animes, setAnimes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  async function getAnime() {
    try {
      setLoading(true);
      const res = await fetch(
        `https://api.jikan.moe/v4/anime?q=${search}&limit=6&page=${page}`
      );
      const data = await res.json();
      setAnimes(Array.isArray(data.data) ? data.data : []);
      setTotalPages(data.pagination?.last_visible_page || 1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAnime();
  }, [search, page]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (animes.length === 0) {
    return <p style={{ textAlign: "center" }}>No anime found</p>;
  }

  return (
    <Grid container spacing={3} mt={3} justifyContent="center">
      {animes.map((a) => (
        <Grid item key={a.mal_id}>
          <AnimeCard anime={a} />
        </Grid>
      ))}
    </Grid>
  );
}
