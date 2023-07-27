import { SignInButton, SignOutButton, useClerk, useUser } from "@clerk/nextjs";
import Head from "next/head";
import {
  AppBar,
  Toolbar,
  Container,
  Box,
  Button,
  Icon,
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

export default function Navigation() {

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { signOut } = useClerk();

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
            <Link href="/" color="inherit" underline="none">
              <Stack direction="row-reverse">
                <Box sx={{ fontSize: "3ex", ml: 1, display: "flex", justifyContent: "center" }}>
                  <Typography sx={{ fontSize: "3ex" }}>TIDESHARE</Typography>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <WavesIcon />
                </Box>
              </Stack>
            </Link>
          </Box>
          <Container
            sx={{ ml: 3, justifyContent: "center", alignItems: "center" }}
          >
            <Link
              underline="none"
              color="inherit"
              href="./AboutUs"
              fontSize="inherit"
              sx={{ justifyContent: "center" }}
            >
              <Typography sx={{ justifyContent: "flex-end", display: "flex", fontSize: "3ex"}}>
                About Us
              </Typography>
            </Link>
          </Container>
          <Box>
            <Link underline="none" href="#" color="inherit">
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {!!isSignedIn && (
                  <>
                  <Typography sx={{ justifyContent:"flex-end", display: "flex", fontSize: "3ex" }}>
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
                  <MenuItem onClick={handleClose} href="#">
                    My Posts 
                  </MenuItem>
                  <MenuItem onClick={() => signOut()} href="#">
                    Sign out
                  </MenuItem>
                </Menu>
                </>
                )}
              </Box>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
