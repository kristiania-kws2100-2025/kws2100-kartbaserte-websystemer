import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import pg from "pg";

const connectionString = process.env.DATABASE_URL;
const postgresql = connectionString
  ? new pg.Pool({ connectionString, ssl: { rejectUnauthorized: false } })
  : new pg.Pool({ user: "postgres", password: "postgres" });

const app = new Hono();
app.get("/api/schools", async (c) => {
  const result = await postgresql.query(
    "select skolenavn, st_transform(posisjon, 4326)::json as geometry from grunnskoler_3697913259634315b061b324a3f2cf59.grunnskole",
  );
  return c.json({
    type: "FeatureCollection",
    crs: { type: "name", properties: { name: "ESPG:4326" } },
    features: result.rows.map(
      ({ skolenavn, geometry: { coordinates, type } }) => ({
        type: "Feature",
        geometry: { type, coordinates },
        properties: { skolenavn },
      }),
    ),
  });
});
app.get("/api/grunnkretser", async (c) => {
  const result = await postgresql.query(`
        select grunnkretsnavn,
               grunnkretsnummer,
               omrade_4326::json as geometry
        from grunnkrets
  `);
  return c.json({
    type: "FeatureCollection",
    crs: { type: "name", properties: { name: "ESPG:4326" } },
    features: result.rows.map(
      ({ geometry: { coordinates, type }, ...properties }) => ({
        type: "Feature",
        geometry: { type, coordinates },
        properties,
      }),
    ),
  });
});

app.use("*", serveStatic({ root: "../dist" }));

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
serve({ fetch: app.fetch, port });
