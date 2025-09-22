import { NextRequest, NextResponse } from 'next/server';
import { getAuthToken } from './lib/getAuthToken';

export async function middleware(req: NextRequest) {
  const token = await getAuthToken(req);
  const pathname = req.nextUrl.pathname;
  console.log(token, 'token from middleware');
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

  return NextResponse.next();
}

// Middleware matcher to exclude certain paths
export const config = {
  matcher: "/((?!api|_next/static|_next/image|.*\\.png$|.*\\.svg$|.*\\.jpg$|.*\\.jpeg$|public).*)",
};

