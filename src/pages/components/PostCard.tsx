import { Box, Container, Link, Paper, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { useEffect } from "react";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import Image from "next/image";

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
    imagename: post.ImageName,
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
      <Container maxWidth="md" sx={{ mt: 10 }}>
        <Paper
          elevation={8}
          sx={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#D3D3D3",
            borderRadius: "15px",
            mb: 5
          }}
        >
          <Stack direction="row">
            <Stack direction="column" sx={{ p: 4 }}>
              {post?.map((post) => (
                <Link
                  key={post.id}
                  underline="none"
                  onClick={(e) => ClickIntoPost(post.id, e)}
                  sx={{ cursor: "pointer"}}
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
                        src={`https://tide-bucket-1.s3.us-west-2.amazonaws.com/${post.ImageName}`}
                        width={400}
                        height={600}
                        alt="post image"
                      />
                    </Box>
                    <Stack spacing={3}>
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
                        <Typography variant="h5">Size: {post.size}</Typography>
                      </Box>
                    </Stack>
                  </Paper>
                </Link>
              ))}
            </Stack>
          </Stack>
        </Paper>
      </Container>
    </>
  );
}
