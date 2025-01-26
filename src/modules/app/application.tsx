import React, { useEffect, useRef } from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { OSM, StadiaMaps } from "ol/source";
import { useGeographic } from "ol/proj";

import "ol/ol.css";

import "./application.css";

useGeographic();

const map = new Map({
  layers: [
    new TileLayer({
      source: new StadiaMaps({
        layer: "alidade_smooth_dark",
      }),
    }),
    new TileLayer({
      source: new OSM(),
      opacity: 0.3,
    }),
  ],
  view: new View({
    center: [10.8, 59.9],
    zoom: 12,
  }),
});

export function Application() {
  const mapRef = useRef<HTMLDivElement>(null);
  useEffect(() => map.setTarget(mapRef.current!), []);
  return (
    <>
      <header>
        <h1>The Map Application</h1>
      </header>
      <nav>
        <li>
          <select>
            <option value="osm">OpenStreetMap</option>
            <option value="stadia">Stadia</option>
            <option value="photo">Flyfoto</option>
          </select>
        </li>
      </nav>
      <main>
        <div ref={mapRef} />
      </main>
    </>
  );
}
