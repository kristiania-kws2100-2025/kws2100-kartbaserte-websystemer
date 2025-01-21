import React, { useRef, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import { useGeographic } from "ol/proj";

import "ol/ol.css";

useGeographic();

const map = new Map({
  layers: [new TileLayer({ source: new OSM() })],
  view: new View({ center: [10.8, 59.9], zoom: 12 }),
});

function Application() {
  const mapRef = useRef<HTMLDivElement>(null);
  useEffect(() => map.setTarget(mapRef.current!), []);
  return <div ref={mapRef}></div>;
}

createRoot(document.getElementById("root")!).render(<Application />);
