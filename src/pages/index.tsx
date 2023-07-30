import { alignProperty } from "@mui/material/styles/cssUtils";
import Navigation from "./components/Navigation";
import { Typography, Box, Container, Link, Button } from "@mui/material";

export default function AboutUs() {
  return (
    <>
      <Navigation />
      <Container disableGutters maxWidth="lg" sx={{ mt: 10 }}>
        <Box sx={{ p: 10 }}>
          <Typography variant="h2" sx={{}}>
            SURF LESS
          </Typography>
          <Typography variant="h2"> + OWN LESS.</Typography>
          <Box component="div" sx={{ width: "450px", mb: 3 }}>
            <Typography variant="h5">
              Your ultimate surfboard rental destination for endless ocean
              adventures.
            </Typography>
            <Button component="div" variant="contained" href="#" sx={{ mt: 2 }}>
              Contact us
            </Button>
            <Button
              component="div"
              variant="contained"
              sx={{ mt: 2, ml: 2 }}
            >
              <Link href="./AllPosts" sx={{ color: "#ffffff"}} underline="none">
                Boards
              </Link>
              

            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}
