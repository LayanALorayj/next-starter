"use client";
import Link from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import styles from "./AnimeCard.module.css";

export default function AnimeCard({ anime }: { anime: any }) {
  return (
    <Link href={`/anime/${anime.mal_id}`} className={styles.cardLink}>
      <Box
        className={styles.card}
        sx={{
          backgroundImage: `url(${anime.images.jpg.image_url})`,
        }}
      >
        <Box className={styles.overlay}>
          <Typography variant="h6" className={styles.title}>
            {anime.title}
          </Typography>
          <Typography variant="body2" className={styles.synopsis}>
            {anime.synopsis || "No description available."}
          </Typography>
        </Box>
      </Box>
    </Link>
  );
}
