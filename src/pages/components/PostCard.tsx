/* eslint-disable */

import {
  Box,
  Container,
  FormControl,
  FormHelperText,
  InputLabel,
  Link,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { useEffect } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import React from "react";

export default function PostCard() {
  const [location, setLocation] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setLocation(event.target.value);
  };

  type Post = {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    model: string;
    type: string;
    price: string;
    size: string;
    imagename: string;
    location: string;
  };

  const { query } = useRouter();
  const {
    data: post,
    isLoading,
    isError,
  } = api.Allposts.getAll.useQuery(undefined, {
    staleTime: 100 * 60 * 5,
  });

  useEffect(() => {
    if (!isLoading && !isError && post) {
      console.log("Post loaded. Post ID: ", post);
    }
  }),
    [post, isLoading, isError];

  const router = useRouter();

  const ClickIntoPost = (id: number, _event: React.MouseEvent) => {
    void router.push(`/post/${id}`);
  };

  console.log("Query: ", query.name);
  /* const { data: data, isLoading, isError } = userPosts({ name: query. }) */

  if (isLoading) {
    return (
      <Box sx={{ mb: 15 }}>
        <Typography
          variant="h4"
          sx={{ mt: 8, display: "flex", justifyContent: "center" }}
        >
          Loading...
        </Typography>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ mb: 15 }}>
        <Typography
          variant="h4"
          sx={{ mt: 8, display: "flex", justifyContent: "center" }}
        >
          An error occured. Please retry.
        </Typography>
      </Box>
    );
  }

  let filteredPosts: Post[] = [] as Post[];

  if (!isLoading && !isError && post) {
    const posts: Post[] = post.map((post: any) => ({
      id: post.id,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      model: post.model,
      type: post.type,
      price: post.price,
      size: post.size,
      imagename: post.ImageName,
      location: post.Location,
    }));

    filteredPosts = location
      ? posts?.filter((post: any) => post.location === location)
      : posts;
  }

  console.log("Location", location);

  return (
    <>
      <Stack
        direction="row"
        
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          mt: 5
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <FormControl
            sx={{ m: 1, minWidth: 120, color: "inherit", fontWeight: "800" }}
          >
            <InputLabel id="demo-simple-select-helper-label">
              Location
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={location}
              label="Location"
              onChange={handleChange}
              sx={{ fontWeight: "800" }}
            >
              <MenuItem value="">
                <em>Any</em>
              </MenuItem>
              <MenuItem value={"Eugene"}>Eugene</MenuItem>
              <MenuItem value={"Portland"}>Portland</MenuItem>
              <MenuItem value={"Seattle"}>Seattle</MenuItem>
            </Select>
          </FormControl>
          <LocationOnIcon />
        </Box>
      </Stack>
      <Container
        maxWidth="lg"
        sx={{
          mt: 6,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={8}
          sx={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#D3D3D3",
            borderRadius: "15px",
            mb: 5,
            mt: 3,
          }}
        >
          <Stack direction="row">
            <Stack direction="column" sx={{ p: 4 }}>
              {filteredPosts?.length === 0 ? (
                <Typography variant="h6">
                  No boards in this location, check back soon!
                </Typography>
              ) : (
                filteredPosts?.map((post) => (
                  <Link
                    key={post.id}
                    underline="none"
                    onClick={(e) => ClickIntoPost(post.id, e)}
                    sx={{ cursor: "pointer" }}
                  >
                    <Paper
                      sx={{
                        mb: 8,
                        p: 5,
                        display: "flex",
                        borderRadius: "15px",
                        justifyContent: "flex-start",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          border: 3,
                          borderColor: "grey.500",
                          mr: 3,
                          borderRadius: "20px",
                          overflow: "hidden",
                          height: "400",
                          width: "600",
                        }}
                      >
                        <img
                          src={`https://tide-bucket-1.s3.us-west-2.amazonaws.com/${post.imagename}`}
                          width={400}
                          height={600}
                          alt="post image"
                        />
                      </Box>
                      <Stack spacing={3}>
                        <Box>
                          <Stack
                            direction="row"
                            sx={{ alignItems: "center", display: "flex" }}
                          >
                            <LocationOnIcon />
                            <Typography sx={{ ml: 0.5 }} variant="h5">
                              {post.location}
                            </Typography>
                          </Stack>
                        </Box>
                        <Box>
                          <Typography variant="h3">{post.model}</Typography>
                        </Box>
                        <Box>
                          <Typography variant="h4">{post.type}</Typography>
                        </Box>
                        <Box>
                          <Typography variant="h5">
                            ${post.price} per hour
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="h5">
                            Size: {post.size}
                          </Typography>
                        </Box>
                      </Stack>
                    </Paper>
                  </Link>
                ))
              )}
            </Stack>
          </Stack>
        </Paper>
      </Container>
    </>
  );
}
