import {
  Alert,
  AlertTitle,
  Paper,
  Container,
  Box,
  Stack,
  Typography,
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
      <Box sx={{ mb: 15 }}>
        <Typography variant="h4">Loading...</Typography>
      </Box>
    );
  }
  if (isError) {
    return (
      <Box sx={{ mb: 15 }}>
        <Typography variant="h4">An error occured.</Typography>
      </Box>
    );
  }

  return (
    <>
      <Navigation />
      <Container maxWidth="md" sx={{ mt: 15 }}>
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
          <Stack spacing={5} sx={{ p: 2 }}>
            <Box>
              <Typography variant="h3">{post?.model}</Typography>
            </Box>
            <Box>
              <Typography variant="h4">{post?.type}</Typography>
            </Box>
            <InsertPhotoIcon fontSize="large" />
          </Stack>
          <Stack direction={"column"} spacing={1} display={"flex"} sx={{ justifyContent: "flex-start", display: "flex", p: 3}}>
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
              <Typography variant="h5">Description: {post?.description}</Typography>
          </Box>
          </Stack>
        </Paper>
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
