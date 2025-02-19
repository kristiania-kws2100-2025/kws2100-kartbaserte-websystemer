import { Hono } from "hono";
import { serve } from "@hono/node-server";
import pg from "pg";
import { serveStatic } from "@hono/node-server/serve-static";

const postgresql = new pg.Pool({ user: "postgres" });

const app = new Hono();
app.get("/api/kommuner", async (c) => {
  const result = await postgresql.query(
    "select kommunenummer, kommunenavn, st_transform(st_simplify(omrade, 10), 4326)::json as geometry from kommuner_4d2a1f720b994f11baaeae13ee600c8e.kommune",
  );
  return c.json({
    type: "FeatureCollection",
    crs: {
      type: "name",
      properties: {
        name: "urn:ogc:def:crs:OGC:1.3:CRS84",
      },
    },
    features: result.rows.map(
      ({ kommunenummer, kommunenavn, geometry: { coordinates } }) => ({
        type: "Feature",
        geometry: { type: "MultiPolygon", coordinates },
        properties: { kommunenummer, kommunenavn },
      }),
    ),
  });
});
app.use("*", serveStatic({ root: "../dist" }));

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
serve({ fetch: app.fetch, port });
