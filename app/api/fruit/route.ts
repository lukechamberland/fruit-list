import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://fruity-proxy.vercel.app/api/fruits", {
      headers: {
        "x-api-key": "fruit-api-challenge-2025",
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Fetch failed with status:", res.status, errorText);
      return new NextResponse("Failed to fetch external API", {
        status: res.status,
      });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Proxy fetch error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
