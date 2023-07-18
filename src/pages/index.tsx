import {
  SignInButton,
  SignOutButton,
  SignUpButton,
  useUser,
} from "@clerk/nextjs";
import Head from "next/head";
import { AppBar, Toolbar, Container, Box, Button } from "@mui/material";
import Link from "@mui/material/Link";
import Navigation from "./components/Navigation";

export default function Home() {
  const user = useUser();

  return (
    <>
      <Navigation />
        <Container sx={{ mt: 15 }}>
          <Link href="./CreatePost" color="inherit">
            <Button variant="outlined">Create Post</Button>
          </Link>
        </Container>
    </>
  );
}
