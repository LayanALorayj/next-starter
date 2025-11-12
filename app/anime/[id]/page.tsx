"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarBorderIcon from "@mui/icons-material/StarBorder";

export default function AnimeDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [anime, setAnime] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [expanded, setExpanded] = useState(false); 

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
        <CircularProgress sx={{ color: "#4fc3f7" }} />
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
          sx={{
            mt: 3,
            backgroundColor: "#4fc3f7",
            color: "#0d1117",
            fontWeight: "bold",
            "&:hover": { backgroundColor: "#6ecfff" },
          }}
          onClick={() => router.push("/")}
        >
          Back Home
        </Button>
      </Container>
    );

  const rating = anime.score || 0;
  const fullStars = Math.floor(rating / 2);
  const halfStar = rating % 2 >= 1;

  return (
    <Box
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
        <Box
          sx={{
            width: "40%",
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
          <Box sx={{ pb: 8 }}> {/* padding bottom عشان ما يغطيه الزر */}
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
                  {anime.year || "Unknown Year"}
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
                  {anime.type || "N/A"}
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
              {[...Array(5)].map((_, i) => {
                if (i < fullStars)
                  return <StarIcon key={i} sx={{ color: "#FFD700", mr: 0.5 }} />;
                if (i === fullStars && halfStar)
                  return (
                    <StarHalfIcon key={i} sx={{ color: "#FFD700", mr: 0.5 }} />
                  );
                return (
                  <StarBorderIcon key={i} sx={{ color: "#FFD700", mr: 0.5 }} />
                );
              })}
              <Typography sx={{ ml: 1, color: "#4fc3f7" }}>
                {rating.toFixed(1)}/10
              </Typography>
            </Box>

            <Box sx={{ p: "10px 40px" }}>
              <Typography
                sx={{
                  fontSize: 13,
                  lineHeight: "20px",
                  color: "#f3f3f3",
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: expanded ? "unset" : 4,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {anime.synopsis || "No synopsis available."}
              </Typography>

              {anime.synopsis && anime.synopsis.length > 200 && (
                <Button
                  onClick={() => setExpanded(!expanded)}
                  sx={{
                    mt: 1,
                    color: "#4fc3f7",
                    textTransform: "none",
                    fontSize: 13,
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  {expanded ? "Read Less" : "Read More"}
                </Button>
              )}
            </Box>
          </Box>

          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              borderTop: "1px solid #222",
              backgroundColor: "#000",
              py: 1.5,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              sx={{
                color: "#f3f3f3",
                borderColor: "#ffda00",
                fontSize: 12,
                borderRadius: 1,
                px: 5,
                backgroundColor: "#4fc3f7",
                "&:hover": { backgroundColor: "#83d1f6ff", color: "#000" },
              }}
              onClick={() => router.push("/")}
            >
              Back Home
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
