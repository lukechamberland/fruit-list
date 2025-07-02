import { NextResponse } from "next/server";

const ALLOWED_ORIGIN = "https://fruit-list-liard.vercel.app/"; 

export async function GET() {
  try {
    const response = await fetch("https://fruity-proxy.vercel.app/api/fruits", {
      headers: {
        "x-api-key": "fruit-api-challenge-2025",
        "Origin": ALLOWED_ORIGIN,
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Upstream error" },
        { status: response.status }
      );
    }

    const data = await response.json();

    const res = NextResponse.json(data, { status: 200 });
    res.headers.set("Access-Control-Allow-Origin", ALLOWED_ORIGIN);
    res.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.headers.set("Access-Control-Allow-Headers", "Content-Type, x-api-key"); 
    res.headers.set("Access-Control-Allow-Credentials", "false");

    return res;
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export function OPTIONS() {
  const res = new Response(null, {
    status: 204,
  });

  res.headers.set("Access-Control-Allow-Origin", ALLOWED_ORIGIN);
  res.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type, x-api-key");
  res.headers.set("Access-Control-Allow-Credentials", "false");

  return res;
}
