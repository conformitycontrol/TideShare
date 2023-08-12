
/* eslint-disable */

import { Box, Container, Stack, Typography } from "@mui/material";
import Navigation from "./components/Navigation";
import SurfingIcon from "@mui/icons-material/Surfing";
import PostCard from "./components/PostCard";

export default function MyPosts() {
  return (
    <>
      <Navigation />
      <Container sx={{ mt: 15 }}>
        <Stack
          direction="row"
          spacing={3}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Typography variant="h3" fontWeight={600}>
            Rent a Board!
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
