import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const IMAGE_URL = "https://static.beebom.com/wp-content/uploads/2023/06/Anime.jpg?w=640";

export default function Hero() {
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
        src={IMAGE_URL}
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
