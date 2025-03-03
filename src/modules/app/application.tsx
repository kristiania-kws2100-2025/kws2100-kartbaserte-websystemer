import React, { useEffect, useRef } from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import { useGeographic } from "ol/proj";

import "ol/ol.css";
import { MVT } from "ol/format";
import VectorTileLayer from "ol/layer/VectorTile";
import VectorTileSource from "ol/source/VectorTile";

useGeographic();

const map = new Map({
  view: new View({ center: [10.755, 59.915], zoom: 16 }),
  layers: [
    new TileLayer({ source: new OSM() }),
    new VectorTileLayer({
      source: new VectorTileSource({
        url: "/api/kommuner/{z}/{x}/{y}",
        format: new MVT(),
      }),
    }),
    new VectorTileLayer({
      source: new VectorTileSource({
        url: "/api/schools/{z}/{x}/{y}",
        format: new MVT(),
      }),
    }),
    new VectorTileLayer({
      source: new VectorTileSource({
        url: "/api/vegadresse/{z}/{x}/{y}",
        format: new MVT(),
      }),
    }),
  ],
});

export function Application() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    map.setTarget(mapRef.current!);
  }, []);

  return <div ref={mapRef}></div>;
}
