import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
const app = new Hono();
app.get("/api/kommuner", (c) => {
  return c.json({});
});
app.use("*", serveStatic({ root: "../dist" }));

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

serve({
  port,
  fetch: app.fetch,
});
