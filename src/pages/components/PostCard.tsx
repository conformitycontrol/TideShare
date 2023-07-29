import { Box, Container, Link, Paper, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { useEffect } from "react";
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';

export default function PostCard() {
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

  const posts = post?.map((post) => ({
    id: post.id,
    createdAt: post.createdAt,
    updatedAt: post.createdAt,
    published: post.published,
    model: post.model,
    type: post.type,
    price: post.price,
    size: post.size,
    user: post.user,
  }));

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

  return (
    <>
      <Container maxWidth="sm" sx={{ mt: 10 }}>
        <Paper
          elevation={8}
          sx={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#D3D3D3",
          }}
        >
          <Stack direction="column" sx={{ p: 5 }}>
            {post?.map((post) => (
              <Link underline="none" onClick={(e) => ClickIntoPost(post.id, e)}>
                <Paper
                  sx={{
                    mt: 5,
                    p: 5,
                    display: "flex",
                    justifyContent: "flex-start",
                  }}
                >
                  <Stack spacing={3}>
                    <Box>
                      <Typography variant="h3">{post.model}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="h4">{post.type}</Typography>
                    </Box>
                    <InsertPhotoIcon fontSize="large"/>
                    <Box>
                      <Typography variant="h5">${post.price} per hour</Typography>
                    </Box>
                    <Box>
                      <Typography variant="h5">Size: {post.size}</Typography>
                    </Box>
                  </Stack>
                </Paper>
              </Link>
            ))}
          </Stack>
        </Paper>
      </Container>
    </>
  );
}
