import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtected = createRouteMatcher([
  "/dashboard",
  "/dashboard/:path*",
  "/parents",
  "/parents/:path*",
  "/medications",
  "/medications/:path*",
  "/documents",
  "/documents/:path*",
  "/family",
  "/family/:path*",
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtected(req)) await auth.protect();
});

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/parents",
    "/parents/:path*",
    "/medications",
    "/medications/:path*",
    "/documents",
    "/documents/:path*",
    "/family",
    "/family/:path*",
  ],
};
