import { alignProperty } from "@mui/material/styles/cssUtils";
import Navigation from "./components/Navigation";
import {
  Typography,
  Alert,
  AlertTitle,
  Box,
  Container,
  Link,
  Button,
} from "@mui/material";
import surfpic1 from "../../public/about_us_pic1.jpg";
import Image from "next/image";

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
          <Box sx={{ width: "450px", mb: 3 }}>
            <Typography variant="h5">
              Your ultimate surfboard rental destination for endless ocean
              adventures.
            </Typography>

            <Link href="#">
              <Button href="./ContactUs" variant="contained" sx={{ mt: 2 }}>
                Contact us
              </Button>
              <Button variant="contained" sx={{ mt: 2, ml: 2 }}>
                Post a board 
              </Button>
            </Link>
          </Box>
        </Box>
      </Container>
    </>
  );
}
