import { Hono } from "hono";
import { serve } from "@hono/node-server";

const app = new Hono()

app.get("/api/hello", c => {
  return c.json({"hello": "class"})
})

serve(app);
