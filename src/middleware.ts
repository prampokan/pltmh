import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const token = req.cookies.get("token");
  if (!token && url.pathname !== "/login" && url.pathname !== "/register") {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
  if (token && (url.pathname === "/login" || url.pathname === "/register")) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|login|login/:path*).*)"],
};
