import { Hono } from "hono";
import { serve } from "@hono/node-server";
import auth from "./auth";

const app = new Hono();

app.route("/auth", auth);

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

function getAllRoutes(app: Hono) {
  const routes: { method: string; path: string }[] = [];
  const honoRoutes = (app as any)._routes || [];
  honoRoutes.forEach((route: any) => {
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

serve(
  { port: 3000, fetch: app.fetch },
  (i) => console.log(`listening on port ${i.port}`)
);