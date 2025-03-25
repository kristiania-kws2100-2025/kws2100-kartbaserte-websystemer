import { Hono } from "hono";
import { serve } from "@hono/node-server";
import pg from "pg";
import { serveStatic } from "@hono/node-server/serve-static";

const app = new Hono();

const postgres = process.env.DATABASE_URL
  ? new pg.Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    })
  : new pg.Pool({
      user: "postgres",
      password: "mitt_eget_passord",
    });

app.get("/api/schools", async (c) => {
  const result = await postgres.query(
    `select st_transform(posisjon, 4326)::json as geometry,
            skolenavn,
            organisasjonsnummer,
            lavestetrinn,
            hoyestetrinn,
            antallelever,
            antallansatte
     from grunnskole
              inner join fylke on st_contains(fylke.omrade, grunnskole.posisjon)
     where navn = 'Viken'
    `,
  );
  return c.json({
    type: "FeatureCollection",
    crs: { type: "name", properties: { name: "ESPG:4326" } },
    features: result.rows.map(
      ({ geometry: { type, coordinates }, ...properties }) => ({
        type: "Feature",
        geometry: { type, coordinates },
        properties,
      }),
    ),
  });
});
app.use("*", serveStatic({ root: "../dist" }));

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
serve({ ...app, port });
