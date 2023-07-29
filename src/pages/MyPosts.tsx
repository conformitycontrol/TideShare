import { Box, Container, Stack, Typography } from "@mui/material";
import Navigation from "./components/Navigation";
import SurfingIcon from "@mui/icons-material/Surfing";
import PostCard from "./components/PostCard";

export default function MyPosts() {
  return (
    <>
      <Navigation />
      <Container sx={{ mt: 15 }}>
        <Stack direction="row" spacing={3}>
          <Typography variant="h3" fontWeight={600}>
            Your Boards
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <SurfingIcon fontSize="large" />
          </Box>
        </Stack>
      </Container>
      <PostCard />
    </>
  );
}
