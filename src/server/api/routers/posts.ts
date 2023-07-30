import { TurnedIn } from "@mui/icons-material";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";

export const PostsByFieldRouter = createTRPCRouter({
  getPostsByName: publicProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .query(async ({ input: { name }, ctx }) => {
      const post = await ctx.prisma.post.findMany({
        where: {
          user: {
            some: {
              name,
            },
          },
        },
      });
      return post;
    }),

  getPostById: publicProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .query(async ({ input: { id }, ctx }) => {
      const post = await ctx.prisma.post.findUnique({
        where: {
          id: id,
        },
      });
      return post;
    }),
});
