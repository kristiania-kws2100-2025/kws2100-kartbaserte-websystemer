import { Hono } from "hono";
import { serve } from "@hono/node-server";
import pg from "pg";

const app = new Hono();

const postgres = new pg.Pool({
  user: "postgres",
  password: "mitt_eget_passord",
});

app.get("/api/schools", async (c) => {
  const result = await postgres.query(
    "select skolenavn, organisasjonsnummer, lavestetrinn, hoyestetrinn, antallelever from grunnskole",
  );
  return c.json(result.rows);
});

serve(app);
