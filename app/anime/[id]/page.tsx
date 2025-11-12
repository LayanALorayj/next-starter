import { notFound } from "next/navigation";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import BackButton from "../../../components/BackButton";

interface AnimeDetailProps {
  params: Promise<{ id: string }>;
}

async function fetchAnime(id: string) {
  try {
    const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return null;
    }

    const json = await res.json();
    return json.data || null;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export default async function AnimeDetail({ params }: AnimeDetailProps) {
  const { id } = await params;

  if (!id) {
    notFound();
  }

  const anime = await fetchAnime(id);

  if (!anime) {
    notFound();
  }

  return (
    <Container
      sx={{
        py: 6,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "background.default",
        minHeight: "100vh",
      }}
    >
      <Card
        sx={{
          maxWidth: 600,
          backgroundColor: "background.paper",
          color: "text.primary",
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
          <BackButton />
        </CardContent>
      </Card>
    </Container>
  );
}
