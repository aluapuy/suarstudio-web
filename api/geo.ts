export const config = {
  runtime: "edge",
};

export default function handler(request: Request) {
  const url = new URL(request.url);
  const override = url.searchParams.get("country") || url.searchParams.get("geo");
  const headerCountry = request.headers.get("x-vercel-ip-country");
  const country = (override || headerCountry || "ID").toUpperCase();

  return new Response(JSON.stringify({ country }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": override
        ? "no-store"
        : "public, max-age=3600, s-maxage=3600",
    },
  });
}
