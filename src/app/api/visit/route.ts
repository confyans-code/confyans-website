import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Visit from "@/models/Visit";

export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();

        // Simple visit tracking
        await Visit.create({
            path: body.path || '/',
            userAgent: request.headers.get('user-agent') || 'unknown',
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Visit Tracker Error:", error);
        return NextResponse.json({ error: "Failed to track visit" }, { status: 500 });
    }
}
