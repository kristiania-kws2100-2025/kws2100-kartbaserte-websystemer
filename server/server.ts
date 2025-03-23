import { Hono } from "hono";
import { serve } from "@hono/node-server";
import pg from "pg";

const postgresql = new pg.Pool({ user: "postgres" });
const latitudeLongitude = {
  type: "name",
  properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" },
};

const app = new Hono();

app.get("/api/hello", async (c) => {
  return c.text("Hello World!");
});
app.get("/api/skoler", async (c) => {
  const result = await postgresql.query(`
      select skolenavn, skole.posisjon_4326::json as posisjon
      from grunnskole skole inner join fylke_2023
          on st_contains(fylke_2023.omrade, skole.posisjon)
      where fylke_2023.navn = 'Viken'
  `);
  return c.json({
    type: "FeatureCollection",
    crs: latitudeLongitude,
    features: result.rows.map(
      ({ posisjon: { coordinates }, ...properties }) => ({
        type: "Feature",
        properties,
        geometry: { type: "Point", coordinates },
      }),
    ),
  });
});
serve(app);
