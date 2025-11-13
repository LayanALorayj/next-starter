import { notFound } from "next/navigation";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import BackButton from "../../../components/BackButton";
import { Box } from "@mui/material";

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
      sx={{
        backgroundColor: "#0d1117",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 3,
      }}
    >
      <Box
        className="card"
        sx={{
          display: "flex",
          flexDirection: "row",
          width: 800,
          height: "auto",
          borderRadius: 2,
          overflow: "hidden",
          boxShadow: "0px 20px 30px 3px rgba(0,0,0,0.55)",
          background: "transparent",
          position: "relative",
        }}
      >
        <Box sx={{ width: "40%", flexShrink: 0, overflow: "hidden" }}>
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
            width: "60%",
            background: "#000",
            color: "#fff",
            paddingTop: 2,
            borderRadius: "0 10px 10px 0",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          <Box sx={{ pb: 8 }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: 400, fontSize: 32, ml: 5, mb: 1 }}
            >
              {anime.title}
            </Typography>

            <Box>
              <ul style={{ listStyle: "none", paddingLeft: 40, margin: 0 }}>
                <li
                  style={{
                    display: "inline",
                    paddingRight: 40,
                    color: "#e3e3e3",
                    fontSize: 14,
                  }}
                >
                  {anime.year ?? "Unknown Year"}
                </li>
                <li
                  style={{
                    display: "inline",
                    paddingRight: 40,
                    color: "#e3e3e3",
                    fontSize: 14,
                  }}
                >
                  {anime.episodes ? `${anime.episodes} Episodes` : "?"}
                </li>
                <li
                  style={{
                    display: "inline",
                    paddingRight: 40,
                    color: "#e3e3e3",
                    fontSize: 14,
                  }}
                >
                  {anime.type ?? "N/A"}
                </li>
              </ul>
            </Box>

            <Box
              sx={{
                ml: 5,
                mt: 1,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography sx={{ color: "#4fc3f7" }}>
                {rating.toFixed(1)}/10
              </Typography>
            </Box>

            <Box sx={{ p: "10px 40px" }}>
              <Typography
                sx={{
                  fontSize: 13,
                  lineHeight: "20px",
                  color: "#f3f3f3",
                }}
              >
                {anime.synopsis || "No synopsis available."}
              </Typography>
            </Box>
          </Box>
           <BackButton />
          </Box>
        </Box>
    </Container>
  );

}
