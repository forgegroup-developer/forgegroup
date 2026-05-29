import { NextResponse } from "next/server";

/** Redirect legacy API URL to static MP4 in /public. */
export function GET(request: Request) {
  return NextResponse.redirect(new URL("/video-recensione.mp4", request.url), 307);
}
