import React, { useEffect, useRef, useState } from "react";
import { useGeographic } from "ol/proj";

import "ol/ol.css";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import { Map, View } from "ol";

useGeographic();

const osmLayer = new TileLayer({ source: new OSM() });
const map = new Map({ view: new View({ center: [10.8, 59.9], zoom: 11 }) });

export function Application() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => map.setTarget(mapRef.current!), []);

  const [layers, setLayers] = useState([osmLayer]);
  useEffect(() => map.setLayers(layers), [layers]);

  return <div ref={mapRef} />;
}
