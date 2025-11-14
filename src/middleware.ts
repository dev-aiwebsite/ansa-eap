import { NextRequest, NextResponse } from 'next/server';
import { getAuthToken } from './lib/getAuthToken';

export async function middleware(req: NextRequest) {
  const token = await getAuthToken(req);
  const isTestMode = process.env.TEST_MODE === "true";

  if(!isTestMode){

    const pathname = req.nextUrl.pathname;
    
        if (
        pathname.startsWith("/manifest.webmanifest") ||
        pathname.startsWith("/favicon") ||
        pathname.startsWith("/apple-touch-icon") ||
        pathname.startsWith("/_next") ||
        pathname.startsWith("/assets") // if you have images/assets
      ) {
        return NextResponse.next();
      }
    
      const isAuthPage = ["/login", "/signup", "/password-reset"].some(p => pathname.startsWith(p));
      const isHome = pathname === "/";
      const isUnrestrictedPage = ["/embed"].some(p => pathname.startsWith(p));
      const isProtectedPage = !isAuthPage && !isUnrestrictedPage;
    
      if (!token) {
        if (isProtectedPage) return NextResponse.redirect(new URL("/login", req.url));
        return NextResponse.next();
      }
    
    
      const isWho5Page = pathname === "/who-5-survey";
      const isWho5Completed = token.who5Completed
    
    
      if (!isWho5Page && !isWho5Completed) {
        return NextResponse.redirect(new URL("/who-5-survey", req.url));
      }
    
      if(isWho5Page && isWho5Completed) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    
      if (isHome || isAuthPage ) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|.*\\.png$|.*\\.svg$|.*\\.jpg$|.*\\.jpeg$|public|sw\\.js).*)",
};
