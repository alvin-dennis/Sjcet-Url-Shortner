import { Hono } from "hono";
import { supabase } from "../utils/supabaseClient.js";

const dashboardRoutes = new Hono();

dashboardRoutes.get("/", async (c) => {
  try {
    const email = c.req.query("email"); 
    if (!email) {
      return c.json({ success: false, message: "Email is required" }, 400);
    }

    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("id, name, email, role, dept, year, urlCount")
      .eq("email", email)
      .single();

    if (userError || !userData) {
      return c.json({ success: false, message: "User not found" }, 404);
    }
    
    const { data: urls, error: urlError } = await supabase
      .from("urls")
      .select("*")
      .eq("email", userData.email);

    if (urlError) {
      return c.json({ success: false, message: "Error fetching URLs" }, 500);
    }
    
    return c.json({
      success: true,
      data: {
        user: {
          id: userData.id,
          name: userData.name,
          email: userData.email,
          role: userData.role,
          dept: userData.dept,
          year: userData.year,
          url_count: userData.urlCount,
        },
        urls: urls || [],
      },
    });
  } catch (error) {
    return c.json({ success: false, message: error.message }, 500);
  }
});

export default dashboardRoutes;
