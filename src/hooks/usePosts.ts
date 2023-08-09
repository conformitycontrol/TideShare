import { api } from "~/utils/api";
import { useRouter } from "next/router";

const UserPosts = (options?: { id: number }) => {
  const router = useRouter();

  console.log("Query: ", router.query);

  const id = options?.id ?? parseInt(router.query.id as string);
  const query = api.PostsByField.getPostById.useQuery(
    { id: id },

    {
      staleTime: Infinity,
    },
  );
  return {
    id,
    ...query,
  };
};

export default UserPosts;
