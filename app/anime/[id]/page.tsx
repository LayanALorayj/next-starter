import { notFound } from "next/navigation";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import BackButton from "../../../components/BackButton";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

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

  const rating = anime.score ?? 0;

  return (
    <Container
      maxWidth={false}
      sx={{
        backgroundColor: "#0d1117",
        minHeight: "100vh",
        py: { xs: 2, md: 4 },
        px: { xs: 1, md: 3 },
      }}
    >
      <Grid container justifyContent="center" alignItems="center">
        <Grid size={{ xs: 12, md: 10, lg: 8 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              borderRadius: 2,
              overflow: "hidden",
              boxShadow: "0px 20px 30px 3px rgba(0,0,0,0.55)",
              background: "transparent",
            }}
          >
            {/* Image Section */}
            <Box
              sx={{
                width: { xs: "100%", md: "40%" },
                height: { xs: 300, md: "auto" },
                flexShrink: 0,
                overflow: "hidden",
              }}
            >
              <Box
                component="img"
                src={anime.images?.jpg?.large_image_url || "/placeholder.png"}
                alt={anime.title}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </Box>

            <Box
              sx={{
                width: { xs: "100%", md: "60%" },
                background: "#000",
                color: "#fff",
                p: { xs: 2, md: 3 },
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 400,
                    fontSize: { xs: 24, md: 32 },
                    mb: 2,
                    textAlign: { xs: "center", md: "left" },
                  }}
                >
                  {anime.title}
                </Typography>

                <Box sx={{ mb: 2 }}>
                  <Box
                    component="ul"
                    sx={{
                      listStyle: "none",
                      p: 0,
                      m: 0,
                      display: "flex",
                      flexWrap: "wrap",
                      gap: { xs: 1, md: 3 },
                      justifyContent: { xs: "center", md: "flex-start" },
                    }}
                  >
                    <Box component="li" sx={{ color: "#e3e3e3", fontSize: 14 }}>
                      {anime.year ?? "Unknown Year"}
                    </Box>
                    <Box component="li" sx={{ color: "#e3e3e3", fontSize: 14 }}>
                      {anime.episodes ? `${anime.episodes} Episodes` : "?"}
                    </Box>
                    <Box component="li" sx={{ color: "#e3e3e3", fontSize: 14 }}>
                      {anime.type ?? "N/A"}
                    </Box>
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: { xs: "center", md: "flex-start" },
                    mb: 2,
                  }}
                >
                  <Typography sx={{ color: "#4fc3f7", fontSize: 18 }}>
                    {rating.toFixed(1)}/10
                  </Typography>
                </Box>

                <Box>
                  <Typography
                    sx={{
                      fontSize: { xs: 12, md: 13 },
                      lineHeight: { xs: "18px", md: "20px" },
                      color: "#f3f3f3",
                      textAlign: { xs: "center", md: "left" },
                    }}
                  >
                    {anime.synopsis || "No synopsis available."}
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: { xs: "center", md: "flex-start" },
                }}
              >
                <BackButton />
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}