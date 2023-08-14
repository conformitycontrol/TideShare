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
import React from 'react';
import { SignInButton, useClerk, useUser } from "@clerk/nextjs";
import { MouseEvent } from "react";

export default function AboutUs() {


  const clerk = useClerk();
  const { isSignedIn, user } = useUser();
  
  const handleNotSignedIn = (event: MouseEvent<HTMLElement>) => {
    if (!isSignedIn) {
      event.preventDefault();
      clerk.openSignIn();
    }
  }
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
            sx={{ display: "flex", justifyConent: "center", mt: 8 }}
          >
            <Typography variant="h2" sx={{ textAlign: "center"}}>
              SURF MORE
            </Typography>
            <Typography variant="h2" sx={{ textAlign: "center"}}> + OWN LESS.</Typography>
            <Box component="div" sx={{ mb: 3, color: "#000000", display: "flex", alignItems: "center", mt: 5 }}>
              <Typography variant="h5" sx={{ textAlign: "center"}}>
                Your ultimate surfboard rental destination for endless ocean
                adventures.
              </Typography>
              </Box>
              <Box sx={{ justifyContent: "center", display: "flex"}}>
              <Button
                component="div"
                variant="contained"
                href="#"
                sx={{ mt: 2, borderColor: "#000000", justifyContent: "center", display: "flex", width: "90px" }}
              >
                <Link
                  href="./AllPosts"
                  sx={{ color: "#000000", borderColor: "#000000" }}
                  onClick={handleNotSignedIn}
                  underline="none"
                  fontWeight={800}
                >
                  Boards
                </Link>
              </Button>
              <Button
                component="div"
                variant="outlined"
                sx={{ mt: 2, ml: 2, borderColor: "#000000", alignContent: "center", display: "flex", width: "90px" }}
              >
                <Link
                  href="./CreatePost"
                  sx={{ color: "#000000", borderColor: "#000000" }}
                  underline="none"
                  onClick={handleNotSignedIn}
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
            ml: 16,
            display: "flex",
            border: 3,
            borderColor: "#000000",
            mr: 16,
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

      <Box sx={{ justifyContent: "center", display: "flex"}}>
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
                  ml: 8,
                  justifyContent: "center",
                  textAlign: "left"
                }}
              >
                Unleash your inner surfer.

              </Typography>
            </Box>
            <Box
              sx={{
               
                ml: 12,
                
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
