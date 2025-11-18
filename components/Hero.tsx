import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface HeroProps {
  image: string;
}

export default function Hero({ image }: HeroProps) {
  return (
    <Box
      sx={{
        position: "relative",
        height: 400,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        borderRadius: 2,
        overflow: "hidden",
        mb: 6,
        mt: 6,
      }}
    >
      <Box
        component="img"
        src={image} 
        alt="Anime"
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
          filter: "brightness(60%)",
        }}
      />

      <Box sx={{ position: "relative", zIndex: 1, textAlign: "center" }}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Anime Finder
        </Typography>
        <Typography variant="subtitle1" color="inherit">
          Explore and search your favorite anime!
        </Typography>
      </Box>
    </Box>
  );
}