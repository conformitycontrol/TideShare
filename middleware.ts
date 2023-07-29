import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware();

console.log("Log: Clerk middlewear running")

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};