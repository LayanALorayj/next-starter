import { Suspense } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import AnimeCard from "./AnimeCard";

interface AnimeGridProps {
  animes: any[];
}

function LoadingFallback() {
  return (
    <Box display="flex" justifyContent="center" mt={5}>
      <CircularProgress />
    </Box>
  );
}

export default function AnimeGrid({ animes }: AnimeGridProps) {
  if (animes.length === 0) {
    return <p style={{ textAlign: "center" }}>No anime found. Try searching for something.</p>;
  }

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Grid container spacing={3} mt={3} justifyContent="center">
        {animes.map((a) => (
          <Grid item key={a.mal_id} xs={12} sm={6} md={4} lg={3}>
            <AnimeCard anime={a} />
          </Grid>
        ))}
      </Grid>
    </Suspense>
  );
}