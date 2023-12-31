
/* eslint-disable */

import { SignInButton, useClerk, useUser } from "@clerk/nextjs";
import Head from "next/head";
import {
  AppBar,
  Toolbar,
  Container,
  Box,
  Button,
  Stack,
  MenuItem,
  Menu,
  IconButton,
  Typography,
} from "@mui/material";
import Link from "@mui/material/Link";
import WavesIcon from "@mui/icons-material/Waves";
import React from "react";
import { AccountCircle } from "@mui/icons-material";
import { MouseEvent } from "react";


export default function Navigation() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const clerk = useClerk();

  const handleSignOut = () => {
    clerk.signOut().then(() => { console.log("User signed out. ") },
    (error) => {
      console.error("Error during sign-out: ", error);
    }
  )
  }
  

  const handleNotSignedIn = (event: MouseEvent<HTMLElement>) => {
    if (!isSignedIn) {
      event.preventDefault();
      clerk.openSignIn();
    }
  }

  const { isSignedIn, user } = useUser();

  return (
    <>
      <Head>
        <title>Tide Share</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/waves.ico" />
      </Head>
      <AppBar position="fixed" sx={{ mb: 10 }}>
        <Toolbar>
          <Box>
            <Stack direction="row-reverse">
              <Box
                sx={{
                  fontSize: "3ex",
                  ml: 1,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Typography sx={{ fontSize: "3ex", fontFamily: "inherit" }}>
                  <Link underline="none" href="/" sx={{ fontWeight: 800, color: "#000000" }}>
                    TIDESHARE
                  </Link>
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <WavesIcon />
              </Box>
            </Stack>
          </Box>
          <Container
            maxWidth="sm"
            sx={{
              mr: 0,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Stack direction={"row"}>
              <Box>
                <Link
                  onClick={handleNotSignedIn}
                  underline="none"
                  color="inherit"
                  href="../AllPosts"
                  fontSize="inherit"
                  sx={{ justifyContent: "center" }}
                >
                  <Typography
                    sx={{
                      justifyContent: "flex-end",
                      display: "flex",
                      fontSize: "3ex",
                      fontWeight: "800"
                    }}
                  >
                    Boards
                  </Typography>
                </Link>{" "}
              </Box>
              <Box
                sx={{
                  ml: 3,
                }}
              >
                <Link
                  onClick={handleNotSignedIn}
                  underline="none"
                  color="inherit"
                  href="../CreatePost"
                  fontSize="inherit"
                  sx={{ justifyContent: "center" }}
                >
                  <Typography
                    sx={{
                      justifyContent: "flex-end",
                      display: "flex",
                      fontSize: "3ex",
                      fontWeight: "800"
                    }}
                  >
                    Post
                  </Typography>
                </Link>
              </Box>
            </Stack>
          </Container>
          <Box>
            <Link underline="none" href="#" color="inherit">
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {!!isSignedIn && (
                  <>
                    <Typography
                      sx={{
                        justifyContent: "flex-end",
                        display: "flex",
                        fontSize: "3ex",
                        fontWeight: "800"
                      }}
                    >
                      {user.firstName}
                    </Typography>

                    <IconButton
                      size="large"
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={handleMenu}
                      color="inherit"
                      sx={{
                        alignContent: "flex-end",
                      }}
                    >
                      <AccountCircle />
                    </IconButton>
                    <Menu
                      id="menu-appbar"
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={handleSignOut} href="#">
                        Sign out
                      </MenuItem>
                    </Menu>
                  </>
                )}
                {!isSignedIn && (
                  <SignInButton>
                    <Button
                      color="inherit"
                      variant="outlined"
                      sx={{
                        ":hover": {
                          backgroundColor: "#FFE5B4",
                          color: "#000000",
                        },
                      }}
                    >
                      <Typography sx={{ fontSize: "2.5ex" }}>
                        Sign in
                      </Typography>
                    </Button>
                  </SignInButton>
                )}
              </Box>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
