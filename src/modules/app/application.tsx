import React, { useEffect, useRef } from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import { useGeographic } from "ol/proj";

import "ol/ol.css";

useGeographic();

export function Application() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const map = new Map({
      view: new View({ center: [10.9, 59.9], zoom: 8 }),
      layers: [new TileLayer({ source: new OSM() })],
    });
    map.setTarget(mapRef.current!);
  }, []);

  return <div ref={mapRef}></div>;
}
