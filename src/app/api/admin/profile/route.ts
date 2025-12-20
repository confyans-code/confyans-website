import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import dbConnect from "@/lib/db";
import AdminUser from "@/models/AdminUser";
import { verifyJWT } from "@/lib/auth";

export async function GET(request: Request) {
    try {
        await dbConnect();

        const cookieStore = await cookies();
        const token = cookieStore.get("admin_token")?.value;

        if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const payload = await verifyJWT(token);
        if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const user = await AdminUser.findById(payload.id).select("-password");
        if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

        return NextResponse.json(user);
    } catch (error: any) {
        console.error("Profile GET API Error:", error);
        return NextResponse.json({ error: error.message || "Internal Error" }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        await dbConnect();
        const { name, email } = await request.json();

        const cookieStore = await cookies();
        const token = cookieStore.get("admin_token")?.value;

        if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const payload = await verifyJWT(token);
        if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const user = await AdminUser.findByIdAndUpdate(
            payload.id,
            { name, email },
            { new: true }
        ).select("-password");

        return NextResponse.json(user);
    } catch (error: any) {
        console.error("Profile GET API Error:", error);
        return NextResponse.json({ error: error.message || "Internal Error" }, { status: 500 });
    }
}
