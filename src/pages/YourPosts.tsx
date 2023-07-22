import { Alert, AlertTitle, Container, Typography, Box } from "@mui/material";
import Navigation from "./components/Navigation";

export default function YourPosts() {
  // make sure to pull all of users posts to database

  return (
    <>
      <Navigation />
      <Container sx={{ mt: 15 }}>
        <Box>
          <Typography></Typography>
        </Box>
        <Alert variant="standard" sx={{ mt: 15 }}>
          <AlertTitle>Warning</AlertTitle>
          This site is under maintanance
        </Alert>
      </Container>
    </>
  );
}
