import { access, readFile } from "node:fs/promises";
import path from "node:path";

const videoPath = path.join(
  process.cwd(),
  "video",
  "VIDEORECENSIONE DISA FORGE GROUP(1).mov"
);

export async function GET() {
  try {
    await access(videoPath);
    const file = await readFile(videoPath);
    return new Response(file, {
      headers: {
        "Content-Type": "video/quicktime",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch {
    return new Response("Video recensione non disponibile.", { status: 404 });
  }
}
