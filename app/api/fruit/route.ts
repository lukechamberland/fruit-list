import { NextResponse } from "next/server";

const ALLOWED_ORIGIN = "https://fruit-list-liard.vercel.app";

export async function GET(req: Request) {
  try {
    const response = await fetch("https://fruity-proxy.vercel.app/api/fruits", {
      headers: {
        "x-api-key": "fruit-api-challenge-2025",
        Origin: ALLOWED_ORIGIN,
      },
    });

    // const response = await fetch(
    //   "https://corsproxy.io/?https://fruity-proxy.vercel.app/api/fruits",
    //   {
    //     headers: {
    //       "x-api-key": "fruit-api-challenge-2025",
    //     },
    //   }
    // );

    console.log(response);

    const data = await response.json();

    const res = NextResponse.json(data, { status: 200 });
    res.headers.set("Access-Control-Allow-Origin", ALLOWED_ORIGIN);
    res.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, x-api-key, Origin"
    );
    return res;
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export function OPTIONS(req: any) {
  req.headers.set("x-api-key", "fruit-api-challenge-2025");
  const res = new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Headers": "Content-Type, x-api-key, Origin",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Origin": ALLOWED_ORIGIN
    },
  });

  res.headers.set("Access-Control-Allow-Origin", ALLOWED_ORIGIN);
  res.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, x-api-key, Origin"
  );
  return res;
}
