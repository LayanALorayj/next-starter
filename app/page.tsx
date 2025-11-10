import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Providers from "../components/Providers";
import Hero from "../components/Hero";
import Pagination from "../components/Pagination";
import AnimeGrid from "../components/AnimeGrid"; 

export default function HomePage() {
  return (
    <Providers>
      <Box>
        <Container>
          <Hero />
          <AnimeGrid /> 
          <Pagination totalPages={1173} query="" /> 
        </Container>
      </Box>
    </Providers>
  );
}
