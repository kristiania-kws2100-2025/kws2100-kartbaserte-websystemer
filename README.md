# KWS2100 Geographic Information Web Systems

[![Running website](https://img.shields.io/badge/Course-website-green)](https://kristiania-kws2100-2025.github.io/kws2100-kartbaserte-websystemer/)

Welcome to this course in Geographic Information Systems (GIS) for the web. In this course, we will use popular and
powerful open-source software to explore geographic information systems on the web. The course will
use [OpenLayers](https://openlayers.org/) as a web framework for information systems and [PostGIS](https://postgis.net/)
as a geographical information database. We will build web applications with the React framework and use Express to
create APIs on top of PostGIS. In order to run our databases on the web, we will deploy using Heroku.

## Understanding the course

In this course, we expect you to create working web applications with geographic functionality. During the lectures, you
will see live coding of how such applications may be constructed and the relevant topics will be explained along the
way.

The lectures will be recorded and the recordings will be available to students in Panopto in Canvas.

## Lectures

### Lecture 1: A tour of OpenLayers

[![Lecture 1 Mentimeter](https://img.shields.io/badge/Lecture_1-mentimenter-yellow)](https://www.menti.com/al1uaz9942qr)

[![Lecture 1 code](https://img.shields.io/badge/Lecture_1-lecture_code-blue)](https://github.com/kristiania-kws2100-2025/kws2100-kartbaserte-websystemer/tree/lecture/01)
[![Lecture 1 reference](https://img.shields.io/badge/Lecture_1-reference_code-blue)](https://github.com/kristiania-kws2100-2025/kws2100-kartbaserte-websystemer/tree/reference/01)
[![Lecture 1 exercise](https://img.shields.io/badge/Lecture_1-exercise-pink)](./exercises/EXERCISES.md#exercise-1)

We will create a React application that will display a simple map with a background layer
from [Open Street Map](https://www.openstreetmap.org/) and a [vector layer](https://github.com/robhop/fylker-og-kommuner/blob/main/Fylker-M.geojson).

During the exercise for the first lecture, we will slow code the exercise together.

### Lecture 2: Git, GitHub, React and TypeScript

[![Lecture 2 code](https://img.shields.io/badge/Lecture_2-lecture_code-blue)](https://github.com/kristiania-kws2100-2025/kws2100-lecture-02)
[![Lecture 2 reference](https://img.shields.io/badge/Lecture_2-reference_code-blue)](https://github.com/kristiania-kws2100-2025/kws2100-kartbaserte-websystemer/tree/reference/02)
[![Lecture 2 exercise](https://img.shields.io/badge/Lecture_2-exercise-pink)](./exercises/EXERCISES.md#exercise-2)

In this lecture, we review some of the basics. If you don't yet feel super strong on React, TypeScript, Git or GitHub!

### Lecture 3: Interacting with the polygon elements

[![Lecture 3 code](https://img.shields.io/badge/Lecture_3-lecture_code-blue)](https://github.com/kristiania-kws2100-2025/kws2100-kartbaserte-websystemer/tree/lecture/03)
[![Lecture 3 reference](https://img.shields.io/badge/Lecture_3-reference_code-blue)](https://github.com/kristiania-kws2100-2025/kws2100-kartbaserte-websystemer/tree/reference/03)
[![Lecture 3 exercise](https://img.shields.io/badge/Lecture_3-exercise-pink)](./exercises/EXERCISES.md#exercise-3)

In this lecture, we will make sure that the user can interact with kommuner, so clicking a feature on the map should bring up an overlay for the user

### Lecture 4: Tile layers and map projections

[![Lecture 4 code](https://img.shields.io/badge/Lecture_4-lecture_code-blue)](https://github.com/kristiania-kws2100-2025/kws2100-kartbaserte-websystemer/tree/lecture/04)
[![Lecture 4 reference](https://img.shields.io/badge/Lecture_4-reference_code-blue)](https://github.com/kristiania-kws2100-2025/kws2100-kartbaserte-websystemer/tree/reference/04)
[![Lecture 4 exercise](https://img.shields.io/badge/Lecture_4-exercise-pink)](./exercises/EXERCISES.md#exercise-4)

**"Damn you, Gerhard!"**

We will change the background layers in our map to display aerial photos and change the map projection to polar
projection. In the process, we will learn that the earth is indeed round.

- Restructure the map layers to vary base layer
- Use a few [Stadia maps](https://stadiamaps.com/)
- Add [Norwegian official map](https://kartkatalog.geonorge.no/metadata/topografisk-norgeskart-wmts--cache/8f381180-1a47-4453-bee7-9a3d64843efa) ("Topografisk norgeskart"), introducing some projection strangeness
- Add [aerial photos of Norway](https://kartkatalog.geonorge.no/metadata/norge-i-bilder-wmts-euref89-utm33/072662f8-41c9-4e9a-a55a-343dee0c3f84) ("Norge i bilder")
- Add [Arctic Spacial Data Infrastructure](https://arctic-sdi.org/services/topografic-basemap/) polar map, going all in on projections

#### Reference:

- [UTM 32V i Store Norske Leksikon](https://snl.no/UTM)
- [Map Men: Why Every Map is Wrong](https://www.youtube.com/watch?v=jtBV3GgQLg8) (silly, but educational)

### Lecture 5: Geographical databases

[![Lecture 5 code](https://img.shields.io/badge/Lecture_5-lecture_code-blue)](https://github.com/kristiania-kws2100-2025/kws2100-kartbaserte-websystemer/tree/lecture/05)
[![Lecture 5 reference](https://img.shields.io/badge/Lecture_5-reference_code-blue)](https://github.com/kristiania-kws2100-2025/kws2100-kartbaserte-websystemer/tree/reference/05)
[![Lecture 5 exercise](https://img.shields.io/badge/Lecture_5-exercise-pink)](./exercises/EXERCISES.md#exercise-5)

In this lecture, we will provide our own datasource by importing datasets from Geonorge into PostGIS and creating a backend with them

- [Administrative enheter - fylker (2023)](https://kartkatalog.geonorge.no/metadata/administrative-enheter-fylker-historiske-data-2023/7284fe8e-fed6-4172-ae56-a7f7c9fd4759)
- [Statistiske enheter - grunnkretser](https://kartkatalog.geonorge.no/metadata/statistiske-enheter-grunnkretser/51d279f8-e2be-4f5e-9f72-1a53f7535ec1)
- [Grunnskoler](https://kartkatalog.geonorge.no/metadata/grunnskoler/db4b872f-264d-434c-9574-57232f1e90d2)

### Lecture 6: Deployment to Heroku

[![Lecture 6 code](https://img.shields.io/badge/Lecture_6-lecture_code-blue)](https://github.com/kristiania-kws2100-2025/kws2100-kartbaserte-websystemer/tree/lecture/06)
[![Lecture 6 reference](https://img.shields.io/badge/Lecture_6-reference_code-blue)](https://github.com/kristiania-kws2100-2025/kws2100-kartbaserte-websystemer/tree/reference/06)

We will publish a basic React + Hono application with TypeScript and Vite to Heroku and add a map to the application.
This lets us deploy with a geographic database 

### Lecture 7: Vector layers as data

[![Lecture 7 code](https://img.shields.io/badge/Lecture_7-lecture_code-blue)](https://github.com/kristiania-kws2100-2025/kws2100-kartbaserte-websystemer/tree/lecture/07)
[![Lecture 7 reference](https://img.shields.io/badge/Lecture_7-reference_code-blue)](https://github.com/kristiania-kws2100-2025/kws2100-kartbaserte-websystemer/tree/reference/07)

In this lecture, we will continue out exploration of vector layers. We will start with an "empty" map and add
a [polygon feature layer](https://www.eriksmistad.no/norges-fylker-og-kommuner-i-geojson-format/) with an aside that
stays in sync with the visible object on the map. We will then add more feature layers
from [international](https://github.com/datasets/geo-countries) and [Norwegian](https://kart.dsb.no/) sources.

- Starting point: Empty map
- Add kommune layer with checkbox
- Add kommune aside with list of kommune
- Understanding GeoJSON properties
- Limit kommune aside to current view
- Add fylker (why are polygons `number[][][]`)
- Highlight active features in map
- Add layers with countries and stations (points)

### Lecture 9: Vector Tile Layers

- [Administrative enheter - kommuner](https://kartkatalog.geonorge.no/metadata/administrative-enheter-kommuner/041f1e6e-bdbc-4091-b48f-8a5990f3cc5b)
- [Statistiske enheter - grunnkretser](https://kartkatalog.geonorge.no/metadata/statistiske-enheter-grunnkretser/51d279f8-e2be-4f5e-9f72-1a53f7535ec1)
- [Matrikkelen - adresse](https://kartkatalog.geonorge.no/metadata/matrikkelen-adresse/f7df7a18-b30f-4745-bd64-d0863812350c)

### Lecture 10: Points that move

[![Lecture 10 code](https://img.shields.io/badge/Lecture_10-lecture_code-blue)](https://github.com/kristiania-kws2100-2025/kws2100-kartbaserte-websystemer/tree/lecture/10)
[![Lecture 10 reference](https://img.shields.io/badge/Lecture_10-reference_code-blue)](https://github.com/kristiania-kws2100-2025/kws2100-kartbaserte-websystemer/tree/reference/10)

In this lecture, we will create a map that shows public transit in Norway. As a bonus content, we will touch
on [Vector Tile Layers](https://openlayers.org/en/latest/examples/mapbox-vector-layer.html)
with [Mapbox styles](https://mapbox.com).

ENTUR is a public sector agency that provides [APIs for Norwegian public transport](https://developer.entur.org/). Among
these, there is [an API to fetch vehicle positions](https://developer.entur.org/pages-real-time-intro), using the open
standard [gtfs-realtime (General Transit Feed Specification)](https://gtfs.org/), which is based on the transport
protocol [protobuf](https://protobuf.dev/). We will use
the [protoc - protobuf compiler](https://github.com/protocolbuffers/protobuf/releases) tool with the
[ts-proto TypeScript library](https://github.com/stephenh/ts-proto) to transform the
[gtfs-realtime.proto API specification](https://github.com/google/transit/blob/master/gtfs-realtime/proto/gtfs-realtime.proto)
into TypeScript.

gtfs-realtime provides a fairly low level interface to the vehicle data, and we will need to work to make this into
something that OpenLayers will be happy to consume.

#### Exercise:

This week's exercise will be to recreate the map from the lecture. Due to time constraints, a detailed description will
not be given.

### Lecture 11: Drawing on the map

[![Lecture 11 code](https://img.shields.io/badge/Lecture_11-lecture_code-blue)](https://github.com/kristiania-kws2100-2025/kws2100-kartbaserte-websystemer/tree/lecture/11)
[![Lecture 11 reference](https://img.shields.io/badge/Lecture_11-reference_code-blue)](https://github.com/kristiania-kws2100-2025/kws2100-kartbaserte-websystemer/tree/reference/11)

In this lecture, we will create a map where we can add out own points and polygons by [drawing with the mouse]().

### Exercise:

This week's exercise is to draw objects on a map using OpenLayers `map.addInteraction(new Draw(...))` function.
Experiment with different type of objects as well. Try and save the objects to `localStorage` and load them at startup.

### Lecture 12: Getting ready for the exam

## Reference material

### Creating a React application

```shell
npm init -y
npm install -D vite
npm install react react-dom
npm pkg set scripts.dev=vite

npm install -D prettier
npm pkg set scripts.test="prettier --check ."
npx prettier --write .

npm i -D typescript
npm install -D @types/react @types/react-dom
npx tsc --init --jsx react
npx prettier --write tsconfig.json
npm pkg set scripts.test="tsc --noEmit && prettier --check ."

npm install -D husky
npx husky init

npm pkg set scripts.build="vite build"
```

#### Minimal `index.html`

```html
<html lang="en">
<body>
<div id="root"></div>
</body>
<script src="src/main.tsx" type="module"></script>
</html>
```

#### Minimal `src/main.tsx`

```jsx
import React from "react";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")).render(<h1>Hello React</h1>);
```

#### Minimal `vite.config.ts`

```ts
import { defineConfig } from "vite";

export default defineConfig({
  base: "/kws2100-kartbaserte-websystemer",
});

```

#### Minimal `.github/workflows/publish-to-github-pages.yml`

<details>

```yml
on:
  push:
    branches: ["main", "reference/*", "lecture/*"]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 22.x, cache: "npm" }
      - run: npm ci
      - run: npm run build
      - run: npm test
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist
      - uses: actions/deploy-pages@v4

    permissions:
      id-token: write
      pages: write
```
</details>


### Creating a OpenLayers map in React

First you need to install the `ol` dependency:

- `npm install ol`

Add the file `src/modules/app/application.tsx`

```tsx
import React, { useEffect, useRef } from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import { useGeographic } from "ol/proj";

// Styling of OpenLayers components like zoom and pan controls
import "ol/ol.css";

// By calling the "useGeographic" function in OpenLayers, we tell that we want coordinates to be in degrees
//  instead of meters, which is the default. Without this `center: [10.6, 59.9]` brings us to "null island"
useGeographic();

// Here we create a Map object. Make sure you `import { Map } from "ol"`. Otherwise, the standard Javascript
//  map data structure will be used
const map = new Map({
  // The map will be centered on a position in longitude (x-coordinate, east) and latitude (y-coordinate, north),
  //   with a certain zoom level
  view: new View({ center: [10.8, 59.9], zoom: 13 }),
  // map tile images will be from the Open Street Map (OSM) tile layer
  layers: [new TileLayer({ source: new OSM() })],
});

// A functional React component
export function Application() {
  // `useRef` bridges the gap between JavaScript functions that expect DOM objects and React components
  const mapRef = useRef<HTMLDivElement | null>(null);
  // When we display the page, we want the OpenLayers map object to target the DOM object refererred to by the
  // map React component
  useEffect(() => {
    map.setTarget(mapRef.current!);
  }, []);

  // This is the location (in React) where we want the map to be displayed
  return <div ref={mapRef}></div>;
}
```

Update `src/main.tsx` to render `<Application />` from `src/modules/app/application.tsx` instead of `<h1>Hello React</h1>`.


### Starting PostGIS with Docker Compose (for lecture 6)

```yaml
services:
   postgis:
      container_name: postgis
      image: postgis/postgis
      environment:
         POSTGRES_PASSWORD: "postgres"
         POSTGRES_HOST_AUTH_METHOD: "trust"
      ports:
         - "5432:5432"
```

### Importing a dataset into a PostGIS server in docker (for lecture 6)

`docker exec -i /postgis /usr/bin/psql --user postgres norway_data < tmp/Basisdata_0000_Norge_25833_Kommuner_PostGIS.sql`

Downloading and importing data into Postgis can be useful scripts to include in your package.json. Here is an example using schoole:

1. We want to execute "download" as a command with npm: `npm install -D download-cli`
2. Getting schools involves downloading and then importing the data: `npm pkg set scripts.db:schools="npm run db:schools:download && npm run db:schools:import"`
3. Download the schools from Kartverket: `npm pkg set scripts.db:schools:download="download --extract --out tmp/ https://nedlasting.geonorge.no/geonorge/Befolkning/Grunnskoler/PostGIS/Befolkning_0000_Norge_25833_Grunnskoler_PostGIS.zip"` (replace the URL for other data sets)
4. Install into Postgis using docker: `npm pkg set scripts.db:schools:import="docker exec -i /postgis /usr/bin/psql --user postgres < tmp/Befolkning_0000_Norge_25833_Grunnskoler_PostGIS.sql"` (replace file name when downloading another data set)
5. Import the data using `npm run db:schools` (running the command multiple times will result in an error since the data already exists)


### Creating a PostGIS API in Hono (for lecture 6)

```typescript
import { Hono } from "hono";
import { serve } from "@hono/node-server";
import pg from "pg";

const postgresql = new pg.Pool({ user: "postgres" });

const app = new Hono();
app.get("/api/fylker", async (c) => {
  const result = await postgresql.query(
    "select fylkesnummer, fylkesnavn, st_transform(st_simplify(omrade, 10), 4326)::json as geometry from fylke",
  );
  return c.json({
    type: "FeatureCollection",
    features: result.rows.map(({ fylkesnummer, fylkesnavn, geometry }) => ({
      type: "Feature",
      geometry,
      properties: { fylkesnummer, fylkesnavn },
    })),
  });
});

serve(app);
```

### Generating TypeScript definitions from a `.proto` (protobuf) specification (for lecture 10)

1. Download [`protoc`](https://github.com/protocolbuffers/protobuf/releases) and store it locally (but `.gitignored` -
   it's pretty big)
2. `npm install ts-proto` for TypeScript bindings
3. Download
   the [gtfs-realtime.proto spec](https://github.com/google/transit/blob/master/gtfs-realtime/proto/gtfs-realtime.proto) (
   or whatever spec you want to use)
4.
Run `protoc --plugin=./node_modules/.bin/protoc-gen-ts_proto --ts_proto_out=generated/ --ts_proto_opt=esModuleInterop=true ./gtfs-realtime.proto`
- Note: ⚠ On Windows, you have to replace `protoc-gen-ts_proto` with `protoc-gen-ts_proto.cmd`, so the \
full command
is `protoc --plugin=./node_modules/.bin/protoc-gen-ts_proto.cmd --ts_proto_out=generated/ --ts_proto_opt=esModuleInterop=true ./gtfs-realtime.proto`
- Note: You may want to add a `script` in `package.json` for this
