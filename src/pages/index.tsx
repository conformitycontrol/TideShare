import Navigation from "./components/Navigation";
import {
  Typography,
  Box,
  Link,
  Button,
  Stack,
  Paper,
  Container,
} from "@mui/material";

export default function AboutUs() {
  return (
    <>
      <Navigation />
      <Stack direction="row" sx={{ display: "flex", justifyContent: "center" }}>
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
                  Boards
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
        <Box
          sx={{
            mt: 16,
            ml: 25,
            display: "flex",
            border: 3,
            borderColor: "#000000",
            mr: 3,
            borderRadius: "20px",
            overflow: "hidden",
            height: "600",
            width: "600",
          }}
        >
          <img
            src="https://images.pexels.com/photos/1556796/pexels-photo-1556796.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            width={600}
            height={600}
          />
        </Box>
      </Stack>

      <Box sx={{ justifyContent: "center", display: "flex" }}>
        <Stack direction="column">
          <Paper
            elevation={12}
            sx={{
              p: 8,
              color: "#000000",
              mt: 18,
              mb: 10,
              backgroundColor: "#97FEED",
              borderRadius: "20px",
              display: "flex",
              justifyContent: "center",
              width: "1200px",
            }}
          >
            <Stack direction="row" sx={{ display: "flex", alignItems: 'center'}}>
            <Box>
              <Typography
                variant="h3"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                Unleash your inner surfer.

              </Typography>
            </Box>
            <Box
              sx={{
               
                ml: 25,
                
                display: "flex",
                border: 3,
                borderColor: "#000000",
                mr: 3,
                borderRadius: "20px",
                overflow: "hidden",
                height: "500",
                width: "800",
                justifyContent: "center"
              }}
            >
              <img
                src="https://images.pexels.com/photos/695779/pexels-photo-695779.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                width={800}
                height={500}
              />
            </Box>
            </Stack>
          </Paper>
        </Stack>
      </Box>
    </>
  );
}
