import { Hono } from "hono";
import { serve } from "@hono/node-server";
import authRoutes from "../routes/auth.js";

const app = new Hono();

app.route("/auth", authRoutes);

app.get("/", (c) => {
  return c.json({
    message: "Shortx server is running",
    status: "success",
  });
});

app.get("/health", (c) => {
  return c.json({
    message: "API is healthy",
    status: "success",
  });
});

function getAllRoutes(app) {
  const routes = [];
  const honoRoutes = app._routes || [];
  honoRoutes.forEach((route) => {
    if (route.path && route.method) {
      routes.push({
        method: route.method,
        path: route.path,
      });
    }
  });

  return routes;
}

app.get("/endpoints", (c) => {
  const routes = getAllRoutes(app);
  return c.json({
    endpoints: routes,
    count: routes.length,
    status: "success",
  });
});

serve({ port: 3000, fetch: app.fetch }, (i) =>
  console.log(`listening on port ${i.port}`)
);
