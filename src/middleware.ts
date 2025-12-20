import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyJWT } from "@/lib/auth";

export async function middleware(request: NextRequest) {
    // Only intercept /admin routes
    if (request.nextUrl.pathname.startsWith("/admin")) {
        // Allow public access to login page
        if (request.nextUrl.pathname === "/admin/login") {
            return NextResponse.next();
        }

        const token = request.cookies.get("admin_token")?.value;

        if (!token) {
            return NextResponse.redirect(new URL("/admin/login", request.url));
        }

        const payload = await verifyJWT(token);
        if (!payload) {
            return NextResponse.redirect(new URL("/admin/login", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: "/admin/:path*",
};
