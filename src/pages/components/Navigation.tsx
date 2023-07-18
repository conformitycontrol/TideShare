import {
  SignInButton,
  SignOutButton,
  SignUpButton,
  useUser,
} from "@clerk/nextjs";
import Head from "next/head";
import { AppBar, Toolbar, Container, Box, Button } from "@mui/material";
import Link from "@mui/material/Link";

export default function Navigation() {
  const user = useUser();

  return (
    <>
      <Head>
        <title>Tide Share</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppBar position="fixed">
        <Toolbar>
          <Box>
            <Link href="/" color="inherit" underline="none">
              <h1>TIDESHARE</h1>
            </Link>
          </Box>
          <Container sx={{ ml: 3 }}>
            <Link underline="none" color="inherit" href="./CreatePost" fontSize="inherit">
              ABOUT US

            </Link>
          </Container>
          <Box>

            <Link underline="none" href="#" color="inherit">
              {!user.isSignedIn && <SignInButton><Button  color="inherit" variant="text">Sign in</Button></SignInButton>}
              {!!user.isSignedIn && <SignOutButton><Button color="inherit" variant="contained">Sign out</Button></SignOutButton>}
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}