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
      select skolenavn, skole.posisjon_4326::json as posisjon, lavestetrinn, hoyestetrinn, organisasjonsnummer
      from grunnskole skole
          inner join fylke_2023 on st_contains(fylke_2023.omrade, skole.posisjon)
      where fylke_2023.navn in ('Oslo')
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
      select skolenavn, '500m' as distance, st_transform(st_buffer(posisjon, 500), 4326)::json omraade, organisasjonsnummer
      from grunnskole
               inner join fylke_2023 on st_contains(fylke_2023.omrade, grunnskole.posisjon)
      where fylke_2023.navn in ('Oslo') and hoyestetrinn = 10
  `);
  const school1000mZone = await postgresql.query(`
      select skolenavn, '1000m' as distance, st_transform(st_buffer(posisjon, 1000), 4326)::json omraade, organisasjonsnummer
      from grunnskole
               inner join fylke_2023 on st_contains(fylke_2023.omrade, grunnskole.posisjon)
      where fylke_2023.navn in ('Oslo') and hoyestetrinn = 10
  `);
  const features = [...school500mZone.rows, ...school1000mZone.rows].map(
    ({ omraade: { type, coordinates }, ...properties }) => ({
      type: "Feature",
      properties,
      geometry: { type, coordinates },
    }),
  );
  return c.json({
    type: "FeatureCollection",
    crs: latitudeLongitude,
    features,
  });
});
app.get("/api/skolenaerhet/perGrunnkrets", async (c) => {
  const result = await postgresql.query(`
      with skolerapport as (
        select grunnkretsnavn,
             grunnkretsnummer,
             omrade_4326::json as geometry,
             (select count(*) from vegadresse where st_contains(omrade, representasjonspunkt_25833)) 
                 as antall_adresser,
             (select count(*)
              from vegadresse v left outer join grunnskole s on st_dwithin(s.posisjon, v.representasjonspunkt_25833, 750)
              where s.organisasjonsnummer is null and st_contains(omrade, representasjonspunkt_25833))
                 as antall_over_750m,
             (select count(*)
              from vegadresse v left outer join grunnskole s on st_dwithin(s.posisjon, v.representasjonspunkt_25833, 1500)
              where s.organisasjonsnummer is null and st_contains(omrade, representasjonspunkt_25833))
                 as antall_over_1500m
        from grunnkrets
      )
      select *,
             antall_over_750m::float/antall_adresser as andel_over_750m,
             antall_over_1500m::float/antall_adresser as andel_over_1500m
      from skolerapport
      where antall_adresser > 0 
  `);
  return c.json({
    type: "FeatureCollection",
    crs: latitudeLongitude,
    features: result.rows.map(
      ({ geometry: { coordinates, type }, ...properties }) => ({
        type: "Feature",
        properties,
        geometry: { type, coordinates },
      }),
    ),
  });
});

app.use("*", serveStatic({ root: "../dist/" }));

serve({
  fetch: app.fetch,
  port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
});
