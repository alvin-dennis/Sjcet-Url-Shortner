import { Hono } from "hono";
import { supabase } from "../utils/supabaseClient.js";
import bcrypt from "bcryptjs";
import {generateToken, verifyToken } from "../utils/jwt.js";


export async function authenticateToken(c, next) {
  const authHeader = c.req.header("authorization");
  if (!authHeader) return c.json({ error: "Missing Authorization header" }, 401);

  const token = authHeader.replace("Bearer ", "");
  const user = verifyToken(token);

  if (!user) return c.json({ error: "Invalid or expired token" }, 401);

  c.set("user", user); 
  await next();
}

const authRoutes = new Hono();

authRoutes.post("/signup", async (c) => {
  const { name, email, password, dept, year, phone, role } = await c.req.json();
  if (!name || !email || !password || !dept || !year || !phone || !role) {
    return c.json({ error: "Missing fields" }, 400);
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return c.json({ error: "Invalid email format" }, 400);
  }

  const domainRegex = /@([\w-]+\.)?sjcetpalai\.ac\.in$/;
  if (!domainRegex.test(email)) {
    return c.json(
      {
        error:
          "Email must be from sjcetpalai.ac.in domain or a department subdomain",
      },
      400
    );
  }

  const { data: existing } = await supabase
    .from("users")
    .select("email")
    .eq("email", email)
    .single();
  if (existing) {
    return c.json({ error: "Email already registered" }, 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const { error } = await supabase.from("users").insert([
    {
      name,
      email,
      password: hashedPassword,
      dept,
      year,
      phone,
      role,
    },
  ]);
  if (error) {
    return c.json({ error: error.message }, 500);
  }
  return c.json({ message: "Signup successful" });
});

authRoutes.post("/login", async (c) => {
  const { email, password } = await c.req.json();
  if (!email || !password) {
    return c.json({ error: "Missing email or password" }, 400);
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return c.json({ error: "Invalid email format" }, 400);
  }

  const { data: user } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();
  if (!user) {
    return c.json({ error: "Invalid credentials" }, 401);
  }

  const { data: urls } = await supabase
    .from("urls")
    .select("*")
    .eq("email", email);

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return c.json({ error: "Invalid credentials" }, 401);
  }

  const token = generateToken({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    dept: user.dept,
    year: user.year,
  });
  
  return c.json({
    message: "Login successful",
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      dept: user.dept,
      year: user.year,
      url_count: user.urlCount,
    },
    urls,
  });
});

authRoutes.post("/logout", async (c) => {
  return c.json({
    message: "Logout successful",
    success: true,
  });
});

export default authRoutes;
