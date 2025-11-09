"use client";
import Link from "next/link";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import styles from "./AnimeCard.module.css";

export default function AnimeCard({ anime }: { anime: any }) {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
      <Link href={`/anime/${anime.mal_id}`} style={{ textDecoration: "none" }}>
        <Card className={styles.card} sx={{ maxWidth: 300 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              image={anime.images.jpg.image_url}
              alt={anime.title}
              className={styles.cardImg}
            />
            <CardContent>
              <Typography variant="h6" component="div" className={styles.cardTitle} gutterBottom>
                {anime.title}
              </Typography>
              <Typography variant="body2" className={styles.cardSynopsis}>
                {anime.synopsis?.slice(0, 80) || "No description available."}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    </Box>
  );
}
