import { createTRPCRouter } from "~/server/api/trpc";
import { PostsByFieldRouter } from "./routers/posts";
import { AllPostsRouter } from "./routers/allPosts";
import { profileRouter } from "./routers/profile";
import { MakePostRouter } from "./routers/makePost";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  Allposts: AllPostsRouter,
  PostsByField: PostsByFieldRouter,
  profileRouter: profileRouter,
  createPost: MakePostRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
