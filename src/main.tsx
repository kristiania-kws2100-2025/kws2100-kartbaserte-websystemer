import React, { useRef, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";

const map = new Map({
  layers: [new TileLayer({ source: new OSM() })],
  view: new View({ center: [59.9, 10.8], zoom: 10 }),
});

function Application() {
  const mapRef = useRef<HTMLDivElement>(null);
  useEffect(() => map.setTarget(mapRef.current!), []);
  return <div ref={mapRef}>Here is a map</div>;
}

createRoot(document.getElementById("root")!).render(<Application />);
