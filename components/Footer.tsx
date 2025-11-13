import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Footer() {
  return (
   <Box
  component="footer"
  sx={{
    mt: "auto",
    py: 3,
    backgroundColor: "#161b22",
    textAlign: "center",
    borderTop: "1px solid #4fc3f7",
  }}
>
  <Typography variant="body2" color="text.secondary">
    © {new Date().getFullYear()} Anime Finder — All rights reserved.
  </Typography>
</Box>

  );
}
