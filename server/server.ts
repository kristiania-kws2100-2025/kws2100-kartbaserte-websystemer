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
    `select st_transform(posisjon, 4326)::json as geometry, 
       skolenavn, organisasjonsnummer, lavestetrinn, hoyestetrinn, antallelever, antallansatte
      from grunnskole
      `,
  );
  return c.json({
    type: "FeatureCollection",
    crs: { type: "name", properties: { name: "ESPG:4326" } },
    features: result.rows.map(
      ({ geometry: { type, coordinates }, ...properties }) => ({
        geometry: { type, coordinates },
        properties,
      }),
    ),
  });
});

serve(app);
