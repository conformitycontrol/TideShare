
/* eslint-disable */

import { createTRPCRouter, publicProcedure } from "../trpc";
import { any, z } from "zod";

export const AllPostsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const posts = ctx.prisma.post.findMany({
      orderBy: {
        createdAt: "desc"
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });
    return posts;
  }),
});
