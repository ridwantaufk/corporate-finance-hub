import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const filename = url.searchParams.get("filename");

  if (!filename) {
    return NextResponse.json(
      { error: "Filename is required" },
      { status: 400 }
    );
  }

  // Path file di luar src/public, relative ke project root
  const imagePath = path.resolve(process.cwd(), "uploads/images", filename);

  try {
    const imageBuffer = await fs.promises.readFile(imagePath);
    return new Response(imageBuffer, {
      status: 200,
      headers: {
        "Content-Type": "image/jpeg", // sesuaikan tipe MIME-nya
      },
    });
  } catch (err) {
    return NextResponse.json({ error: "Image not found" }, { status: 404 });
  }
}
