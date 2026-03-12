import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // защищаем только /admin
  if (pathname.startsWith("/admin")) {
    const authHeader = request.headers.get("authorization");

    if (!authHeader) {
      return new NextResponse("Authentication required", {
        status: 401,
        headers: {
          "WWW-Authenticate": 'Basic realm="Secure Area"',
        },
      });
    }

    const encoded = authHeader.split(" ")[1];
    const decoded = Buffer.from(encoded, "base64").toString();

    const [login, password] = decoded.split(":");

    const adminLogin = process.env.ADMIN_LOGIN;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (login !== adminLogin || password !== adminPassword) {
      return new NextResponse("Access denied", {
        status: 401,
        headers: {
          "WWW-Authenticate": 'Basic realm="Secure Area"',
        },
      });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};