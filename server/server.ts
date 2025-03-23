import { Hono } from "hono";
import { serve } from "@hono/node-server";
const app = new Hono();
app.get("/api/hello", async (c) => {
  return c.text("Hello World!");
});
serve(app);
