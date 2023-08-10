import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";


export const MakePostRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        model: z.string().min(1),
        type: z.string().min(1),
        fins: z.number(),
        price: z.string(),
        description: z.string().min(1),
        size: z.string().min(1),
        contact: z.string().min(1),
        condition: z.string(),
        imagename: z.any()
      })
    )
    .mutation(async ({ ctx, input }) => {

      const post = await ctx.prisma.post.create({
        data: {
          model: input.model,
          type: input.type,
          fins: input.fins,
          price: input.price,
          description: input.description,
          size: input.size,
          contact: input.contact,
          condition: input.condition,
          ImageName: input.imagename,
        },
      });

      return post;
    }),
});
