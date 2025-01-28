import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { OSM, StadiaMaps } from "ol/source";
import { useGeographic } from "ol/proj";

// Styling of OpenLayers components like zoom and pan controls
import "ol/ol.css";

import "./application.css";

// By calling the "useGeographic" function in OpenLayers, we tell that we want coordinates to be in degrees
//  instead of meters, which is the default. Without this `center: [10.6, 59.9]` brings us to "null island"
useGeographic();

// Here we create a Map object. Make sure you `import { Map } from "ol"`. Otherwise, the standard Javascript
//  map data structure will be used
const map = new Map({
  // The map will be centered on a position in longitude (x-coordinate, east) and latitude (y-coordinate, north),
  //   with a certain zoom level
  view: new View({ center: [10.8, 59.9], zoom: 10 }),
});

// A functional React component
export function Application() {
  const [layers, setLayers] = useState([new TileLayer({ source: new OSM() })]);
  // `useRef` bridges the gap between JavaScript functions that expect DOM objects and React components
  const mapRef = useRef<HTMLDivElement | null>(null);
  // When we display the page, we want the OpenLayers map object to target the DOM object refererred to by the
  // map React component
  useEffect(() => {
    map.setTarget(mapRef.current!);
  }, []);
  useEffect(() => {
    map.setLayers(layers);
  }, [layers]);

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    console.log(e.target.value);
    if (e.target.value === "stadia") {
      setLayers([
        new TileLayer({ source: new StadiaMaps({ layer: "alidade_smooth" }) }),
      ]);
    } else {
      setLayers([new TileLayer({ source: new OSM() })]);
    }
  }

  // This is the location (in React) where we want the map to be displayed
  return (
    <>
      <header>
        <h1>My map application</h1>
      </header>
      <nav>
        <select onChange={handleChange}>
          <option value={"osm"}>Open Street Map</option>
          <option value={"stadia"}>Stadia</option>
        </select>
      </nav>
      <main>
        <div ref={mapRef}></div>
      </main>
    </>
  );
}
