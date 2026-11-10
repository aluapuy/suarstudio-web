export const config = {
  runtime: "edge",
};

export default function handler(request: Request) {
  const url = new URL(request.url);
  const override = url.searchParams.get("country") || url.searchParams.get("geo");
  const headerCountry = request.headers.get("x-vercel-ip-country");
  const country = (override || headerCountry || "ID").toUpperCase();
  const isDomestic = country === "ID";

  return new Response(
    JSON.stringify({
      country,
      isDomestic,
      detected: headerCountry,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "private, no-cache, no-store, max-age=0, must-revalidate",
      },
    }
  );
}
