import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { supabase } from "./db.js";
import { nanoid } from "nanoid";
import "dotenv/config";

const app = new Hono();

// Root route
app.get("/", (c) =>
  c.json({ message: "Shortx server is running successfully!", status: "success" })
);

// Health check
app.get("/health", (c) =>
  c.json({ message: "API is healthy", status: "success" })
);

// POST /shorten → Create short URL
app.post("/shorten", async (c) => {
  try {
    let body;
    try {
      body = await c.req.json();
    } catch (err) {
      console.error("❌ Invalid JSON input:", err.message);
      return c.json({ error: "Invalid JSON body" }, 400);
    }

    const { originalUrl, userEmail } = body;
    console.log("📥 Received:", { originalUrl, userEmail });

    if (!originalUrl || !userEmail) {
      return c.json({ error: "originalUrl and userEmail are required" }, 400);
    }

    // Check if user exists
    const { data: user, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("email", userEmail)
      .single();

    if (userError || !user) {
      console.error("❌ User not found: link not created:", userError?.message);
      return c.json({ error: "User not found" }, 404);
    }

    const shortName = nanoid(6);
    const shortenedUrl = new URL(c.req.url).origin + "/" + shortName;
    const id = nanoid();

    const { error: insertError } = await supabase.from("urls").insert([
      {
        id,
        originalUrl,
        shortenedUrl,
        shortName,
        userEmail,
      },
    ]);

    if (insertError) {
      console.error("❌ Failed to insert URL:", insertError.message);
      return c.json({ error: "Failed to store URL" }, 500);
    }

    // RPC to increment urlCount
    const { error: rpcError } = await supabase.rpc("increment_url_count", {
      user_email: userEmail,
    });

    if (rpcError) {
      console.warn("⚠️ RPC error:", rpcError.message); // Not blocking
    }

    console.log("✅ Short URL created:", shortenedUrl);
    return c.json({ shortUrl: shortenedUrl, shortName });
  } catch (e) {
    console.error("🔥 UNEXPECTED ERROR:", e.message);
    return c.json({ error: "Internal Server Error", details: e.message }, 500);
  }
});

// GET /endpoints → List all API routes
function getAllRoutes(app) {
  const routes = [];
  const honoRoutes = app._routes || [];
  honoRoutes.forEach((route) => {
    if (route.path && route.method) {
      routes.push({ method: route.method, path: route.path });
    }
  });
  return routes;
}

app.get("/endpoints", (c) => {
  const routes = getAllRoutes(app);
  return c.json({ endpoints: routes, count: routes.length, status: "success" });
});

app.get("/:shortName", async (c) => {
  const { shortName } = c.req.param();

  const { data, error } = await supabase
    .from("urls")
    .select("originalUrl")
    .eq("shortName", shortName)
    .single();

  if (error || !data) {
    console.error("❌ Short URL not found:", error?.message);
    return c.json({ error: "Short URL not found" }, 404);
  }

  return c.redirect(data.originalUrl);
});

// Start the server
serve({ port: 3000, fetch: app.fetch }, (info) => {
  console.log(`🚀 Server listening on http://localhost:${info.port}`);
});
