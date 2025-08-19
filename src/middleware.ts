import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';  

export async function middleware(req: NextRequest) {
  // const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET, cookieName: "__Secure-authjs.session-token", secureCookie: true });  
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET});  
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

  // 🚀 Chatbot Redirect Logic
  // If path matches "/dashboard/chatbots/{chatbotid}" exactly, redirect to "/dashboard/chatbots/{chatbotid}/playground"
  const chatbotIdMatch = pathname.match(/^\/dashboard\/chatbots\/([^\/]+)$/);
  if (chatbotIdMatch) {
    const chatbotId = chatbotIdMatch[1];
    return NextResponse.redirect(new URL(`/dashboard/chatbots/${chatbotId}/playground`, req.url));
  }

  // If logged in, prevent access to auth pages (redirect to dashboard)
  if (isHome || isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next(); // Continue if authenticated
}

// Middleware matcher to exclude certain paths
export const config = {
  matcher: "/((?!api|_next/static|_next/image|.*\\.png$|.*\\.svg$|public).*)",
};
