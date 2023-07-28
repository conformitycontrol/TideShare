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
import { router } from "@trpc/server";
import { useRouter } from "next/router";

export default function Home() {
  const user = useUser();
  const router = useRouter();
  
  return (
    <>
      <Navigation />
      <Container sx={{ mt: 15 }}>
        <Link href="./CreatePost" color="inherit">
          {!!user.isSignedIn && <Button variant="contained">Post a Board</Button>}
          {!user.isSignedIn && router.push("./AboutUs")}
        </Link>
      </Container>
    </>
  );
}
