import { NextRequest, NextResponse } from 'next/server';
import { getAuthToken } from './lib/getAuthToken';

export async function middleware(req: NextRequest) {
  const token = await getAuthToken(req);
  const pathname = req.nextUrl.pathname;

  // Define auth-related paths
  const isAuthPage = ["/login", "/signup", "/password-reset"].some(path => pathname.startsWith(path));
  const isHome = pathname === "/";
  const isUnrestrictedPage = ["/embed"].some(path => pathname.startsWith(path));
  const isProtectedPage = !isAuthPage && !isUnrestrictedPage;

  console.log(token, 'token from middleware')
  // If not logged in and trying to access a protected page, redirect to login
  if (!token) {
    if (isUnrestrictedPage) return NextResponse.next();
    if (isProtectedPage) return NextResponse.redirect(new URL("/login", req.url));
    return NextResponse.next();
  }
  // If logged in, prevent access to auth pages (redirect to dashboard)
  
  if(pathname !== '/who-5-survey'){

  
  const apiUrl = `${req.nextUrl.origin}/api/who5/check`;
  const res = await fetch(apiUrl, {
    headers: { cookie: req.headers.get("cookie") || "" },
  });
  const data = await res.json();

  if (!data.completed) {
    return NextResponse.redirect(new URL("/who-5-survey", req.url));
  }
}
  

  if (isHome || isAuthPage) {
    
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next(); // Continue if authenticated
}

// Middleware matcher to exclude certain paths
export const config = {
  matcher: "/((?!api|_next/static|_next/image|.*\\.png$|.*\\.svg$|.*\\.jpg$|.*\\.jpeg$|public).*)",
};

