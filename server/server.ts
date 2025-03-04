import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import pg from "pg";

const app = new Hono();

const connectionString = process.env.DATABASE_URL;

const postgresql = connectionString
  ? new pg.Pool({ connectionString, ssl: { rejectUnauthorized: false } })
  : new pg.Pool({ user: "postgres" });

app.get("/api/kommuner/:z/:x/:y", async (c) => {
  const { x, y, z } = c.req.param();
  const query = await postgresql.query(
    `
   with mvt as (select kommunenummer,
                       kommunenavn,
                       st_asmvtgeom(
                               omrade_3857,
                               st_tileenvelope($1, $2, $3)
                       ) geometry
                from public.kommune
                where omrade_3857 && st_tileenvelope($1, $2, $3)
  )
   select st_asmvt(mvt.*) from mvt
`,
    [z, x, y],
  );
  return c.body(query.rows[0].st_asmvt, 200, {
    "Content-Type": "application/vnd.mapbox-vector-tile",
  });
});
app.get("/api/kommuner", async (c) => {
  const query = await postgresql.query(`
      select
          kommunenummer,
          kommunenavn,
          st_transform(st_simplify(omrade, 1), 4326)::json geometry
      from kommuner_4d2a1f720b994f11baaeae13ee600c8e.kommune
  `);

  return c.json({
    type: "FeatureCollection",
    crs: {
      type: "name",
      properties: {
        name: "urn:ogc:def:crs:OGC:1.3:CRS84",
      },
    },
    features: query.rows.map(
      ({ kommunenavn, kommunenummer, geometry: { coordinates } }) => ({
        type: "Feature",
        geometry: { type: "MultiPolygon", coordinates },
        properties: { kommunenummer, kommunenavn },
      }),
    ),
  });
});
app.use("*", serveStatic({ root: "../dist" }));

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

serve({
  port,
  fetch: app.fetch,
});
