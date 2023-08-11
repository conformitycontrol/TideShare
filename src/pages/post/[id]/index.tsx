import {
  Alert,
  AlertTitle,
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
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";

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
        <Alert severity="warning">
          <AlertTitle>
            <Typography fontWeight={800}>Warning!</Typography>
          </AlertTitle>
          <Typography fontWeight={800}>
            This site for viewing specific posts, and is under maintanance.
          </Typography>
        </Alert>
        <Paper
          sx={{
            mt: 5,
            p: 5,
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#e0e0e0",
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
              width: "400",
            }}
          >
            <img
              src={`https://tide-bucket-1.s3.us-west-2.amazonaws.com/${post?.ImageName}`}
              width={400}
              height={400}
              alt="post image"
            />
          </Box>
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
              <Typography variant="h5">
                Description: {post?.description}
              </Typography>
            </Box>
          </Stack>
        </Paper>
        <Box sx={{ display: "flex", justifyContent: "flex-start", mt: 3 }}>
          <Button variant="contained">
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
