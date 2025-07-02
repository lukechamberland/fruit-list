export async function GET() {
  const res = await fetch("https://fruity-proxy.vercel.app/api/fruits", {
    headers: { "x-api-key": "fruit-api-challenge-2025" },
  });

  if (!res.ok) {
    return new Response("Failed to fetch", { status: res.status });
  }

  const data = await res.json();
  return data;
}