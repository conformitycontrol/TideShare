import Navigation from "./components/Navigation";
import {
  Typography,
  Box,
  Link,
  Button,
  Stack,
  Paper,
} from "@mui/material";


export default function AboutUs() {
  return (
    <>
      <Navigation />
      
      <Paper
        elevation={12}
        sx={{
          mt: 16,
          ml: 8,
          p: 8,
          backgroundColor: "#97FEED",
          borderRadius: "30px",
          display: "flex",
          width: 600,
          justifyContent: "flex-start",
        }}
      >
        <Stack
          direction="column"
          sx={{ display: "flex", justifyConent: "flex-start" }}
        >
          <Typography variant="h2" sx={{}}>
            SURF MORE
          </Typography>
          <Typography variant="h2"> + OWN LESS.</Typography>
          <Box component="div" sx={{ mb: 3, color: "#000000" }}>
            <Typography variant="h5">
              Your ultimate surfboard rental destination for endless ocean
              adventures.
            </Typography>
            <Button
              component="div"
              variant="contained"
              href="#"
              sx={{ mt: 2, borderColor: "#000000" }}
            >
              <Link
                href="./AllPosts"
                sx={{ color: "#000000", borderColor: "#000000" }}
                underline="none"
                fontWeight={800}
              >
                Contact us
              </Link>
            </Button>
            <Button
              component="div"
              variant="outlined"
              sx={{ mt: 2, ml: 2, borderColor: "#000000" }}
            >
              <Link
                href="./CreatePost"
                sx={{ color: "#000000", borderColor: "#000000" }}
                underline="none"
                fontWeight={800}
              >
                Post
              </Link>
            </Button>
          </Box>
        </Stack>
      </Paper>
    </>
  );
}
