# KWS2100 Geographic Information Web Systems

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

### Lecture 2: Deploying applications to the web

[![Lecture 2 code](https://img.shields.io/badge/Lecture_2-lecture_code-blue)](https://github.com/kristiania-kws2100-2025/kws2100-kartbaserte-websystemer/tree/lecture/02)
[![Lecture 2 reference](https://img.shields.io/badge/Lecture_2-reference_code-blue)](https://github.com/kristiania-kws2100-2025/kws2100-kartbaserte-websystemer/tree/reference/02)
[![Lecture 2 exercise](https://img.shields.io/badge/Lecture_2-exercise-pink)](./exercises/EXERCISES.md#exercise-2)

We will publish a basic React + Hono application with TypeScript and Vite to Heroku and add a map to the application

### Lecture 3: Interacting with the polygon elements

[![Lecture 3 code](https://img.shields.io/badge/Lecture_3-lecture_code-blue)](https://github.com/kristiania-kws2100-2025/kws2100-kartbaserte-websystemer/tree/lecture/03)
[![Lecture 3 reference](https://img.shields.io/badge/Lecture_3-reference_code-blue)](https://github.com/kristiania-kws2100-2025/kws2100-kartbaserte-websystemer/tree/reference/03)
[![Lecture 3 exercise](https://img.shields.io/badge/Lecture_3-exercise-pink)](./exercises/EXERCISES.md#exercise-3)

In this lecture, we will make sure that the user can interact with kommuner, so clicking a feature on the map should bring up an overlay for the user

### Lecture 4: TypeScript and React review

[![Lecture 4 code](https://img.shields.io/badge/Lecture_4-lecture_code-blue)](https://github.com/kristiania-kws2100-2025/kws2100-kartbaserte-websystemer/tree/lecture/04)
[![Lecture 4 reference](https://img.shields.io/badge/Lecture_4-reference_code-blue)](https://github.com/kristiania-kws2100-2025/kws2100-kartbaserte-websystemer/tree/reference/04)

In this lecture, we review some of the basics. If you don't yet feel super strong on React and TypeScript, this is your chance to catch up!

- [We follow the React getting started guide](https://react.dev/learn)
- We go through essential React concepts: Components
    - Component definitions
    - Component usage
    - Props
    - Event handlers
- We go through essential React [hooks](https://react.dev/reference/react/hooks)
    - useState
    - useEffect
    - useContext
    - useMemo
    - useRef
- TypeScript demonstration
    - string union types
    - interface types
    - return types
    - higher order types

***Exercise***:

[![Lecture 4 exercise](https://img.shields.io/badge/Lecture_4-exercise:_official_react_tutorial-pink)](https://react.dev/learn/tutorial-tic-tac-toe)
[![Lecture 4 exercise](https://img.shields.io/badge/Lecture_4-exercise:_thinking_in_react-pink)](https://react.dev/learn/tutorial-tic-tac-toe)

1. Follow the Official React Tutorials
2. Convert the code to TypeScript
3. Convert the Thinking in React example to support multiple languages

### Lecture 5: Vector layers as data

[![Lecture 5 code](https://img.shields.io/badge/Lecture_5-lecture_code-blue)](https://github.com/kristiania-kws2100-2025/kws2100-kartbaserte-websystemer/tree/lecture/05)
[![Lecture 5 reference](https://img.shields.io/badge/Lecture_5-reference_code-blue)](https://github.com/kristiania-kws2100-2025/kws2100-kartbaserte-websystemer/tree/reference/05)

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

### Lecture 6: Point vector layers

[![Lecture 6 code](https://img.shields.io/badge/Lecture_6-lecture_code-blue)](https://github.com/kristiania-kws2100-2026/kws2100-kartbaserte-websystemer/tree/lecture/06)
[![Lecture 6 reference](https://img.shields.io/badge/Lecture_6-reference_code-blue)](https://github.com/kristiania-kws2100-2026/kws2100-kartbaserte-websystemer/tree/reference/06)

We will draw points on the map from a vector source and allow the user to interact with them. We will explore styling
based on feature properties.

- Style functions
- Style text for a point
- Finding hovered point features

### Lecture 7: Tile layers and map projections

[![Lecture 7 code](https://img.shields.io/badge/Lecture_7-lecture_code-blue)](https://github.com/kristiania-kws2100-2025/kws2100-kartbaserte-websystemer/tree/lecture/07)
[![Lecture 7 reference](https://img.shields.io/badge/Lecture_7-reference_code-blue)](https://github.com/kristiania-kws2100-2025/kws2100-kartbaserte-websystemer/tree/reference/07)

**"Damn you, Gerhard!"**

We will change the background layers in our map to display aerial photos and change the map projection to polar
projection. In the process, we will learn that the earth is indeed round.

- Restructure the map layers to vary base layer
- Use a few [Stadia maps](https://stadiamaps.com/)
- Add [aerial photos of Norway](https://kartkatalog.geonorge.no/metadata/norge-i-bilder-wmts-euref89-utm33/072662f8-41c9-4e9a-a55a-343dee0c3f84) ("Norge i bilder")
- Add [Norwegian official map](https://kartkatalog.geonorge.no/metadata/norges-grunnkart-cache/860f8b53-1dcf-4a39-87a4-71b3e9125dcb) ("Norges grunnkart"), introducing some projection strangeness
- Add [Arctic Spacial Data Infrastructure](https://arctic-sdi.org/services/topografic-basemap/) polar map, going all in on projections

#### Reference:

- [UTM 32V i Store Norske Leksikon](https://snl.no/UTM)
- [Map Men: Why Every Map is Wrong](https://www.youtube.com/watch?v=jtBV3GgQLg8) (silly, but educational)

### No lecture in week 8

### Lecture 8: Geographical databases

[![Lecture 8 code](https://img.shields.io/badge/Lecture_8-lecture_code-blue)](https://github.com/kristiania-kws2100-2025/kws2100-kartbaserte-websystemer/tree/lecture/08)

In this lecture, we will provide our own own datasource by importing datasets from Geonorge into PostGIS and creating a backend with them

- [Administrative enheter - kommuner](https://kartkatalog.geonorge.no/metadata/administrative-enheter-kommuner/041f1e6e-bdbc-4091-b48f-8a5990f3cc5b)
- [Statistiske enheter - grunnkretser](https://kartkatalog.geonorge.no/metadata/statistiske-enheter-grunnkretser/51d279f8-e2be-4f5e-9f72-1a53f7535ec1)

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

### Creating a OpenLayers map in React

First you need to install the `ol` dependency:

- `npm install ol`

```tsx
import React, { MutableRefObject, useEffect, useRef } from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import { useGeographic } from "ol/proj";

// By calling the "useGeographic" function in OpenLayers, we tell that we want coordinates to be in degrees
//  instead of meters, which is the default. Without this `center: [11, 60]` doesn't work on the view
useGeographic();

// Here we create a Map object. Make sure you `import { Map } from "ol"` or otherwise, standard Javascript
//  map data structure will be used
const map = new Map({
  // The map will be centered on 60 degrees latitude and 11 degrees longitude, with a certain zoom level
  view: new View({ center: [11, 60], zoom: 10 }),
  // images displayed on the map will be from the Open Street Map (OSM) tile layer
  layers: [new TileLayer({ source: new OSM() })],
});

// A functional React component
export function Application() {
  // `useRef` bridges the gap between JavaScript functions that expect DOM objects and React components
  // `as MutableRefObject` is required by TypeScript to avoid us binding the wrong ref to the wrong component
  const mapRef = useRef() as MutableRefObject<HTMLDivElement>;

  // When we display the page, we want the OpenLayers map object to target the DOM object refererred to by the
  // map React component
  useEffect(() => {
    map.setTarget(mapRef.current);
  }, []);

  // This is the location (in React) where we want the map to be displayed
  return <div ref={mapRef}></div>;
}
```


### Starting PostGIS with Docker Compose

```yaml
version: "3"
services:
  postgis:
    container_name: postgis
    image: postgis/postgis
    ports:
      - "5432:5432"
```

### Importing a dataset into a PostGIS server in docker

`docker exec -i /postgis /usr/bin/psql --user postgres norway_data < tmp/Basisdata_0000_Norge_25833_Kommuner_PostGIS.sql`

### Creating a PostGIS API in Express

```typescript
import express from "express";
import pg from "pg";

const postgresql = new pg.Pool({
  user: "postgres",
  database: "norway_data",
});

const app = express();

app.get("/api/kommuner", async (req, res) => {
  const result = await postgresql.query(
    "select kommunenummer, kommunenavn, st_simplify(omrade, 0.0001)::json as geometry from kommuner",
  );
  res.json({
    type: "FeatureCollection",
    features: result.rows.map(({ kommunenavn, kommunenummer, geometry }) => ({
      type: "Feature",
      geometry,
      properties: { kommunenummer, kommunenavn },
    })),
  });
});

app.listen(3000);
```

### Generating TypeScript definitions from a `.proto` (protobuf) specification

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
