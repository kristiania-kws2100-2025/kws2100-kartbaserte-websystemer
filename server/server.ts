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
      select skolenavn, st_transform(skole.posisjon, 4326)::json as posisjon
      from grunnskoler_3697913259634315b061b324a3f2cf59.grunnskole skole
               inner join fylker_ba7aea2735714391a98b1a585644e98a.fylke fylke
                          on st_contains(fylke.omrade, skole.posisjon)
               inner join fylker_ba7aea2735714391a98b1a585644e98a.administrativenhetnavn navn
                          on fylke.objid = navn.fylke_fk and navn.sprak = 'nor'
      where navn.navn = 'Viken'
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
