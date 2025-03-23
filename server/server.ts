import { Hono } from "hono";
import { serve } from "@hono/node-server";
import pg from "pg";
import { serveStatic } from "@hono/node-server/serve-static";

const connectionString = process.env.DATABASE_URL;

const postgresql = connectionString
  ? new pg.Pool({ connectionString, ssl: { rejectUnauthorized: false } })
  : new pg.Pool({ user: "postgres" });
const latitudeLongitude = { type: "name", properties: { name: "ESPG:4326" } };

const app = new Hono();

app.get("/api/skoler", async (c) => {
  const result = await postgresql.query(`
      select skolenavn, skole.posisjon_4326::json as posisjon
      from grunnskole skole
          inner join fylke_2023 on st_contains(fylke_2023.omrade, skole.posisjon)
      where fylke_2023.navn in ('Viken', 'Oslo')
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
app.get("/api/naerskoler", async (c) => {
  const school500mZone = await postgresql.query(`
      select skolenavn, '500m' as distance, st_transform(st_buffer(posisjon, 500), 4326)::json omraade
      from grunnskole
  `);
  const school1000mZone = await postgresql.query(`
      select skolenavn, '1000m' as distance, st_transform(st_buffer(posisjon, 1000), 4326)::json omraade
      from grunnskole
  `);
  const rows = [...school500mZone.rows, ...school1000mZone.rows];
  return c.json({
    type: "FeatureCollection",
    crs: latitudeLongitude,
    features: rows.map(({ omraade: { coordinates }, ...properties }) => ({
      type: "Feature",
      properties,
      geometry: { type: "Polygon", coordinates },
    })),
  });
});
app.use("*", serveStatic({ root: "../dist/" }));

serve({
  fetch: app.fetch,
  port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
});
