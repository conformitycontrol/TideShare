import { alignProperty } from "@mui/material/styles/cssUtils";
import Navigation from "./components/Navigation";
import { Typography, Alert, AlertTitle, Box, Container, Link, Button } from "@mui/material";
import surfpic1 from "../../public/about_us_pic1.jpg";
import Image from "next/image";

export default function AboutUs() {
    
  return (
    <>
      <Navigation />
      <Box sx={{ p: 10 }}>
        <Typography variant="h2" sx={{ mt: 3 }}>
          SURF MORE
        </Typography>
        <Typography variant="h2"> + OWN LESS.</Typography>
        <Box sx={{ width: "450px", mb: 3 }}>
          <Typography variant="h5">
            Your ultimate surfboard rental destination for endless ocean
            adventures.
          </Typography> 
            <Link href="#">
                <Button variant="contained" sx={{ mt: 2 }}>Contact us</Button>
            </Link>
        </Box>
        <div style={{ width: "100%", height: "800px", position: "relative" }}>
          <Image
            src={surfpic1}
            alt="first surf pic"
            objectFit="cover"
            layout="fill"
          />
        </div>
      </Box>
    </>
  );
}
