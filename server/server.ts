import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import pg from "pg";

const connectionString = process.env.DATABASE_URL;
const postgresql = connectionString
  ? new pg.Pool({ connectionString, ssl: { rejectUnauthorized: false } })
  : new pg.Pool({ user: "postgres" });

const app = new Hono();

const crs = {
  type: "name",
  properties: {
    name: "urn:ogc:def:crs:OGC:1.3:CRS84",
  },
};
app.get("/api/kommuner", async (c) => {
  const result = await postgresql.query(
    `
    select kommunenummer, kommunenavn, st_transform(omrade, 4326)::json geometry
    from kommuner_4d2a1f720b994f11baaeae13ee600c8e.kommune
    `,
  );
  return c.json({
    type: "FeatureCollection",
    crs,
    features: result.rows.map(
      ({ geometry: { coordinates }, ...properties }) => ({
        type: "Feature",
        properties,
        geometry: { type: "MultiPolygon", coordinates },
      }),
    ),
  });
});
app.get("/api/skoler", async (c) => {
  const result = await postgresql.query(
    `
      select skolenavn, fylke.fylkesnummer, st_transform(posisjon, 4326)::json as geometry
      from grunnskoler_3697913259634315b061b324a3f2cf59.grunnskole
               inner join fylker_ba7aea2735714391a98b1a585644e98a.fylke on st_contains(omrade, posisjon)
      where fylke.objid in (select fylke_fk
                            from fylker_ba7aea2735714391a98b1a585644e98a.administrativenhetnavn where navn = 'Viken')
    `,
  );
  return c.json({
    type: "FeatureCollection",
    crs,
    features: result.rows.map(
      ({ geometry: { coordinates }, ...properties }) => ({
        type: "Feature",
        properties,
        geometry: { type: "Point", coordinates },
      }),
    ),
  });
});
app.use("*", serveStatic({ root: "../dist" }));
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
serve({
  fetch: app.fetch,
  port,
});
