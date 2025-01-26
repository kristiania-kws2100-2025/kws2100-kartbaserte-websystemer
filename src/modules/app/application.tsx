import React, { useEffect, useRef } from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { OSM, StadiaMaps } from "ol/source";
import { useGeographic } from "ol/proj";

import "ol/ol.css";

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
  return <div ref={mapRef} />;
}
