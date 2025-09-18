import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Define auth-related paths
  const isAuthPage = ["/login", "/signup", "/password-reset"].some(path =>
    pathname.startsWith(path)
  );
  const isHome = pathname === "/";
  const isUnrestrictedPage = ["/embed", "/who-5-survey"].some(path =>
    pathname.startsWith(path)
  ); // allow WHO-5 page
  const isProtectedPage = !isAuthPage && !isUnrestrictedPage;

  // Get the logged-in user token
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  console.log(token, "token from middleware");

  // If not logged in and trying to access a protected page, redirect to login
  if (!token) {
    if (isUnrestrictedPage) return NextResponse.next();
    if (isProtectedPage) return NextResponse.redirect(new URL("/login", req.url));
    return NextResponse.next();
  }

  // If logged in, prevent access to auth pages (redirect to dashboard)
  if (isHome || isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // WHO-5 survey check for protected pages
  if (isProtectedPage) {
    try {
      const apiUrl = `${req.nextUrl.origin}/api/who5/check`;
      const res = await fetch(apiUrl, {
        headers: { cookie: req.headers.get("cookie") || "" },
      });
      const data = await res.json();

      if (!data.completed) {
        return NextResponse.redirect(new URL("/who-5-survey", req.url));
      }
    } catch (error) {
      console.error("Error checking WHO-5 completion:", error);
      // If API fails, allow access to avoid blocking user completely
    }
  }

  return NextResponse.next(); // Continue if authenticated and WHO-5 done
}

// Middleware matcher to exclude certain paths
export const config = {
  matcher:
    "/((?!api|_next/static|_next/image|.*\\.png$|.*\\.svg$|public).*)",
};
