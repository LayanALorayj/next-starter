"use client";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { ThemeProvider } from "@mui/material/styles";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import AnimeCard from "../components/AnimeCard";
import Pagination from "../components/Pagination";
import theme from "../themes/theme";
import CssBaseline from "@mui/material/CssBaseline";

export default function HomePage() {
  const [animes, setAnimes] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 6;

  useEffect(() => {
    fetchAnime(search, page);
  }, [page]);

  async function fetchAnime(q: string, p = 1) {
    const res = await fetch(
      `https://api.jikan.moe/v4/anime?q=${q}&limit=${limit}&page=${p}`
    );
    const data = await res.json();
    setAnimes(data.data);
    setTotalPages(data.pagination?.last_visible_page || 1);
  }

  function handleSearch(query: string) {
    setSearch(query);
    setPage(1);
    fetchAnime(query, 1);
  }

  return (
    <ThemeProvider theme={theme}>
       <CssBaseline />
      <Box
      >
        <Container>
          <Hero />
          <SearchBar value={search} onChange={setSearch} onSearch={handleSearch} />

          <Grid container spacing={3} mt={3} justifyContent="center">
            {animes.map((a) => (
              <Grid item key={a.mal_id}>
                <AnimeCard anime={a} />
              </Grid>
            ))}
          </Grid>

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </Container>
      </Box>
    </ThemeProvider>
  );
}
