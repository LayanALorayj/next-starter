import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Hero from "../components/Hero";
import Pagination from "../components/Pagination";
import AnimeGrid from "../components/AnimeGrid";

export const metadata = {
  title: "Anime Finder",
  description: "Discover and explore anime using the Jikan API",
};

interface HomePageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const sp = await searchParams;
  const search = (sp.q as string) || "";
  const page = parseInt((sp.page as string) || "1", 10);

  let animes: any[] = [];
  let totalPages = 1;

  let queryString = `limit=6&page=${page}`;
  if (search) {
    queryString = `q=${encodeURIComponent(search)}&${queryString}`;
  }

  const res = await fetch(`https://api.jikan.moe/v4/anime?${queryString}`);
  if (res.ok) {
    const data = await res.json();
    animes = Array.isArray(data.data) ? data.data : [];
    totalPages = data.pagination?.last_visible_page || 1;
  }

  const HERO_IMAGE_URL =
    "https://static.beebom.com/wp-content/uploads/2023/06/Anime.jpg?w=640";

  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        color: "text.primary",
        minHeight: "100vh",
        py: 4,
      }}
    >
      <Container>
        <Hero image={HERO_IMAGE_URL} />
        <AnimeGrid animes={animes} />
        <Pagination totalPages={totalPages} query={search} />
      </Container>
    </Box>
  );
}
