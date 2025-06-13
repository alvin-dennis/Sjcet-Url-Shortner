import { Hono } from "hono";
import { supabase } from "./supabaseClient";
import bcrypt from "bcryptjs";

const auth = new Hono();
//auth.get("/signup", c => c.text("Signup route is working! (GET for test only)"));
// Signup
auth.post("/signup", async (c) => {
  const { name, email, password, dept, year, phone, role } = await c.req.json();
  if (!name || !email || !password || !dept || !year || !phone || !role) {
    return c.json({ error: "Missing fields" }, 400);
  }

  // Check if user exists
  const { data: existing } = await supabase
    .from("users")
    .select("email")
    .eq("email", email)
    .single();
  if (existing) {
    return c.json({ error: "Email already registered" }, 400);
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert user
  const { error } = await supabase.from("users").insert([
    { name, email, password: hashedPassword, dept, year, phone, role }
  ]);
  if (error) {
    return c.json({ error: error.message }, 500);
  }
  return c.json({ message: "Signup successful" });
});

// Login
auth.post("/login", async (c) => {
  const { email, password } = await c.req.json();
  if (!email || !password) {
    return c.json({ error: "Missing email or password" }, 400);
  }

  const { data: user } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();
  if (!user) {
    return c.json({ error: "Invalid credentials" }, 401);
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return c.json({ error: "Invalid credentials" }, 401);
  }

  // Optionally, return user info or JWT here
  return c.json({ message: "Login successful", user: { id: user.id, name: user.name, email: user.email, role: user.role } });
});

export default auth;