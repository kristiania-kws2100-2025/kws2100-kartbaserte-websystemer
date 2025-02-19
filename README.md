# Exploring vector tile maps with Mapbox Vector Tiles

Defining layers:

```typescript
import VectorTileLayer from "ol/layer/VectorTile";
import VectorTileSource from "ol/source/VectorTile";
import { MVT } from "ol/format";

const layer = new VectorTileLayer({
  source: new VectorTileSource({
    url: "/api/kommuner/{z}/{x}/{y}",
    format: new MVT(),
  }),
});
```

Implementing APIs:

```typescript
app.get("/api/adresser/:z/:x/:y", async (c) => {
  const { x, y, z } = c.req.param();
  const zoom = parseInt(z);
  const sql = `
        WITH mvtgeom AS
                 (select description,
                         st_asmvtgeom(
                                 representasjonspunkt_3857, st_tileenvelope($1, $2, $3)
                         ) as geometry
                  from vegadresse
                  where representasjonspunkt_3857 && st_tileenvelope($1, $2, $3))
        select st_asmvt(mvtgeom.*)
        from mvtgeom
    `;
  const result = await postgresql.query(sql, [z, x, y]);
  return c.body(result.rows[0].st_asmvt, 200, {
    "Content-Type": "application/vnd.mapbox-vector-tile",
  });
});
```

SQL query:

```sql
with mvtgeom AS
         (select description,
                 ST_AsMVTGeom(geometry_3857, st_tileenvelope(z, y, z)) as geometry
          from table
          where geometry_3857 && st_tileenvelope(z, y, z))
select ST_asMVT(mvtgeom.*) from mvtgeom
```

ESPG:3857 is Web Mercator, which is the default for MVT envelopes.

Downloading and importing data:

1. `download --extract --out tmp/ https://example.com/data.zip`
2. `docker exec -i /postgis /usr/bin/psql --user postgres < tmp/data.sql`
3. `docker exec -i /postgis /usr/bin/psql --user postgres < scripts/prepare-data.sql`
