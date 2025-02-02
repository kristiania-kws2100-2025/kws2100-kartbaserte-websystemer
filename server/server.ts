import { Hono } from "hono";
import { serve } from "@hono/node-server";
import pg from "pg";

const postgresql = new pg.Pool({ user: "postgres" });

const app = new Hono();
app.get("/api/hello", async (c) => {
  return c.text("Hello World!");
});
app.get("/api/skoler", async (c) => {
  const result = await postgresql.query(
    `select
         skolenavn, eierforhold, besoksadresse_besoksadresse_adressenavn, besoksadresse_besoksadresse_postnummer, besoksadresse_besoksadresse_poststed
    from grunnskoler_3697913259634315b061b324a3f2cf59.grunnskole
    `,
  );
  return c.json(result.rows);
});

serve(app);
