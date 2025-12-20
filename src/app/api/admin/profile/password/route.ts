import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import dbConnect from "@/lib/db";
import AdminUser from "@/models/AdminUser";
import { verifyJWT } from "@/lib/auth";
import bcrypt from "bcryptjs";

export async function PUT(request: Request) {
    try {
        await dbConnect();
        const { currentPassword, newPassword } = await request.json();

        if (!currentPassword || !newPassword) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

        const cookieStore = await cookies();
        const token = cookieStore.get("admin_token")?.value;

        if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const payload = await verifyJWT(token);
        if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const user = await AdminUser.findById(payload.id);
        if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return NextResponse.json({ error: "Incorrect current password" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Error" }, { status: 500 });
    }
}
