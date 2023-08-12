import {
  Paper,
  Container,
  Box,
  Stack,
  Typography,
  Link,
  Button,
} from "@mui/material";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import usePosts from "~/hooks/usePosts";
import Navigation from "~/pages/components/Navigation";
import { prisma } from "~/server/db";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const SinglePostView = ({
  found,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { id, data: post, isLoading, isError } = usePosts();

  if (isLoading) {
    return (
      <>
        <Navigation />
        <Box sx={{ mb: 15 }}>
          <Typography
            variant="h4"
            sx={{ mt: 20, display: "flex", justifyContent: "center" }}
          >
            Loading...
          </Typography>
        </Box>
      </>
    );
  }

  if (isError) {
    return (
      <>
        <Navigation />
        <Box sx={{ mb: 15 }}>
          <Typography
            variant="h4"
            sx={{ mt: 20, display: "flex", justifyContent: "center" }}
          >
            An error occured. Please retry.
          </Typography>
        </Box>
      </>
    );
  }

  return (
    <>
      <Navigation />
      <Container maxWidth="lg" sx={{ mt: 15 }}>
        <Paper
          sx={{
            mt: 5,
            p: 5,
            display: "flex",
            justifyContent: "justify-left",
            backgroundColor: "#e0e0e0",
            borderRadius: "20px",
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
              src={`https://tide-bucket-1.s3.us-west-2.amazonaws.com/${
                post?.ImageName ?? ""
              }`}
              width={400}
              height={600}
              alt="post image"
            />
          </Box>
          <Stack direction="column">
            <Stack spacing={5} sx={{ p: 2 }}>
              <Box>
                <Typography variant="h3">{post?.model}</Typography>
              </Box>
              <Box>
                <Typography variant="h4">{post?.type}</Typography>
              </Box>
            </Stack>
            <Stack
              direction={"column"}
              spacing={1}
              display={"flex"}
              sx={{ justifyContent: "flex-start", display: "flex", p: 3 }}
            >
              <Box sx={{ alignItems: "center", display: "flex" }}>
                <LocationOnIcon sx={{ mr: 1 }} />
                <Typography variant="h5">{post?.Location}</Typography>
              </Box>
              <Box>
                <Typography variant="h5">${post?.price} per hour</Typography>
              </Box>
              <Box>
                <Typography variant="h5">Size: {post?.size}</Typography>
              </Box>
              <Box>
                <Typography variant="h5">Fin #: {post?.fins}</Typography>
              </Box>
              <Box>
                <Typography variant="h5">Condition: {post?.condition}</Typography>
              </Box>
              <Box>
                <Typography variant="h5">Contact: {post?.contact}</Typography>
              </Box>
              <Box>
                <Typography variant="h5" sx={{ mt: 3 }}>
                  Description: {post?.description}
                </Typography>
              </Box>
            </Stack>
          </Stack>
        </Paper>
        <Box sx={{ display: "flex", justifyContent: "flex-start", mt: 3 }}>
          <Button variant="outlined">
            <Link href="../AllPosts" sx={{ color: "#ffffff" }}>
              Back
            </Link>
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default SinglePostView;

export const getServerSideProps: GetServerSideProps<{
  found: boolean;
}> = async (context) => {
  const id = context.params?.id as string;
  if (!id) {
    return {
      props: {
        found: false,
      },
    };
  }

  const post = await prisma.post.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  return {
    props: {
      found: !!post,
    },
  };
};
