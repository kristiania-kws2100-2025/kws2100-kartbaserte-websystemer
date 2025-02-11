import React, { useEffect, useRef } from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import { useGeographic } from "ol/proj";

import "ol/ol.css";
import { GeoJSON } from "ol/format";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";

useGeographic();

const osmLayer = new TileLayer({ source: new OSM() });
const municipalityLayer = new VectorLayer({
  source: new VectorSource({
    url: "/api/kommuner",
    format: new GeoJSON(),
  }),
});
const schoolLayer = new VectorLayer({
  source: new VectorSource({
    url: "/api/skoler",
    format: new GeoJSON(),
  }),
});

const map = new Map({
  view: new View({ center: [11.05, 59.95], zoom: 14 }),
  layers: [osmLayer, municipalityLayer, schoolLayer],
});

export function Application() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => map.setTarget(mapRef.current!), []);
  return <div ref={mapRef}></div>;
}
