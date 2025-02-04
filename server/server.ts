import { Hono } from "hono";
import { serve } from "@hono/node-server";
import pg from "pg";

const postgresql = new pg.Pool({ user: "postgres" });

const app = new Hono();
app.get("/", async (c) => {
  return c.text("Hello somebody");
});
app.get("/kws2100-kartbaserte-websystemer/api/skoler", async (c) => {
  const result = await postgresql.query(
    `select
         skolenavn,
         besoksadresse_besoksadresse_adressenavn as adresse,
         st_transform(posisjon, 4326)::json as geometry
    from grunnskoler_3697913259634315b061b324a3f2cf59.grunnskole
    `,
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
      ({ geometry: { coordinates }, ...properties }) => ({
        type: "Feature",
        properties,
        geometry: { type: "Point", coordinates },
      }),
    ),
  });
});
serve(app);
