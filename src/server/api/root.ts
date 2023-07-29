import { createTRPCRouter } from "~/server/api/trpc";
import { PostsByFieldRouter } from "./routers/posts";
import { AllPostsRouter } from "./routers/allPosts";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  Allposts: AllPostsRouter,
  PostsByField: PostsByFieldRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
