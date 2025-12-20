import { NextResponse } from "next/server";
import { join } from "path";
import { writeFile, readdir } from "fs/promises";
import { cookies } from "next/headers";
import { verifyJWT } from "@/lib/auth";

export async function GET(request: Request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("admin_token")?.value;
        if (!token || !(await verifyJWT(token))) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const galleryDir = join(process.cwd(), "public/gallery");

        // Ensure directory exists (create if not - though scripts/mkdir usually handles this)
        // For robustness we rely on previous steps or use mkdir inside try if fails, 
        // but readdir throws if dir doesn't exist, so we catch errors.

        let files: string[] = [];
        try {
            files = await readdir(galleryDir);
        } catch (error) {
            // If directory doesn't exist, return empty
            return NextResponse.json([]);
        }

        const images = files.filter(file => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file));

        // Sort by newest first (optional, might need stats for true date sort, 
        // effectively implies lexical sort here unless we stat each file)

        return NextResponse.json(images.reverse());
    } catch (error) {
        console.error("Gallery GET Error:", error);
        return NextResponse.json({ error: "Internal Error" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("admin_token")?.value;
        if (!token || !(await verifyJWT(token))) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const formData = await request.formData();
        const files = formData.getAll("file") as File[];

        if (!files || files.length === 0) {
            return NextResponse.json({ error: "No files uploaded" }, { status: 400 });
        }

        const uploadPromises = files.map(async (file) => {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            // Create unique filename
            const timestamp = Date.now();
            // sanitize filename
            const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
            // Add random string to avoid collision on same-time uploads
            const random = Math.random().toString(36).substring(2, 8);
            const filename = `${timestamp}-${random}-${safeName}`;

            const path = join(process.cwd(), "public/gallery", filename);

            await writeFile(path, buffer);
            return filename;
        });

        await Promise.all(uploadPromises);

        return NextResponse.json({ success: true, count: files.length });
    } catch (error) {
        console.error("Gallery POST Error:", error);
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("admin_token")?.value;
        if (!token || !(await verifyJWT(token))) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { filename } = await request.json();

        if (!filename) {
            return NextResponse.json({ error: "Filename is required" }, { status: 400 });
        }

        // Security check: prevent directory traversal
        if (filename.includes("..") || filename.includes("/") || filename.includes("\\")) {
            return NextResponse.json({ error: "Invalid filename" }, { status: 400 });
        }

        const path = join(process.cwd(), "public/gallery", filename);

        const { unlink } = require("fs/promises");
        await unlink(path);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Gallery DELETE Error:", error);
        return NextResponse.json({ error: "Delete failed" }, { status: 500 });
    }
}
