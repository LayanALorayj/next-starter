import { Suspense } from "react";
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
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',        
            sm: 'repeat(2, 1fr)', 
            md: 'repeat(3, 1fr)', 
            lg: 'repeat(3, 1fr)',
          },
          gap: 3,
          mt: 3, 
          justifyContent: 'center',
        }}
      >
        {animes.map((a) => (
          <Box key={a.mal_id} sx={{ display: 'flex', justifyContent: 'center' }}>
            <AnimeCard anime={a} />
          </Box>
        ))}
      </Box>
    </Suspense>
  );
}