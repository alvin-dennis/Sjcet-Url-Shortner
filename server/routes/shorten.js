import { Hono } from "hono";
import { supabase } from "../utils/supabaseClient.js";
import { authenticateToken } from "./auth.js";

const shortenRoutes = new Hono();
shortenRoutes.post("/",authenticateToken, async (c) => {
  try {
    const { url, name } = await c.req.json();

    if (!url) {
      return c.json({ error: "URL is required" }, 400);
    }

    if (!name) {
      return c.json({ error: "Custom name is required" }, 400);
    }

    const { data: existingUrl } = await supabase
      .from("urls")
      .select("id")
      .eq("shortName", name)
      .single();

    if (existingUrl) {
      return c.json({ error: "Custom name already in use" }, 409);
    }

    try {
      const API_URL = process.env.API_URL || "https://your-shortener-service/api/shorten";
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ url, name }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Service error:", errorData);
        return c.json(
          {
            error: errorData.error || " URL shortening service failed",
          },
          response.status
        );
      }

      const responseData = await response.json();

      const user = c.get("user");

      const { error } = await supabase.from("urls").insert([
        {
          originalUrl: url,
          shortenedUrl: responseData.shorturl || `null`,
          shortName: name,
          created_at: new Date().toISOString(),
          timestamp: new Date().toISOString(),
          email: user?.email || null,
        },       
      ]);

      if (error) {
        console.error("Database error:", error);
        return c.json({
          success: true,
          shortUrl: responseData.shorturl || `null`,
          originalUrl: url,
          warning: "URL shortened but couldn't be saved to database",
        });
      }

      return c.json({
        success: true,
        shortUrl: responseData.shorturl || name,
        originalUrl: url,
      });
    } catch (fetchError) {
      console.error("Network error:", fetchError);
      return c.json(
        {
          error:
            "Failed to contact URL shortening service. Please try again later.",
        },
        503
      );
    }
  } catch (error) {
    console.error("Server error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

export default shortenRoutes;
