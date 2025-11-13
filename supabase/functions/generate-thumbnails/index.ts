import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*", // or 'http://localhost:5173'
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, x-client-token",
      },
    });
  }

  try {
    const { bucket, path } = await req.json();
    console.log("Generating thumbnail for:", bucket, path);

    // Your thumbnail logic here...

    return new Response(JSON.stringify({ message: "Success" }), {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, x-client-token",
      },
    });
  } catch (error) {
    console.error(error);
    return new Response("Error", {
      status: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, x-client-token",
      },
    });
  }
});
