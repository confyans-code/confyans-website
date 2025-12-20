import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import AdminUser from "@/models/AdminUser";
import bcrypt from "bcryptjs";
import { signJWT } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(request: Request) {
    try {
        await dbConnect();
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
        }

        const user = await AdminUser.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        const token = await signJWT({ id: user._id.toString(), email: user.email });

        // Use await cookies() as per Next.js 15+ / 16 recent changes or stick to older sync if 14
        // Next 15+ -> await cookies()
        // We are on Next 16.0.3 based on package.json, so await is likely required or safe
        const cookieStore = await cookies();

        cookieStore.set({
            name: "admin_token",
            value: token,
            httpOnly: true,
            path: "/",
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24, // 1 day
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
