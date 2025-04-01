import React, { useEffect, useRef } from "react";
import { Map, Overlay, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import { useGeographic } from "ol/proj";

import "ol/ol.css";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { GeoJSON } from "ol/format";

import "./application.css";

useGeographic();

const map = new Map({
  view: new View({ center: [10.8, 59.9], zoom: 13 }),
  layers: [
    new TileLayer({ source: new OSM() }),
    new VectorLayer({
      source: new VectorSource({
        url: "/api/schools",
        format: new GeoJSON(),
      }),
    }),
    new VectorLayer({
      source: new VectorSource({
        url: "/api/grunnkretser",
        format: new GeoJSON(),
      }),
    }),
  ],
});

export function Application() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const overlay = new Overlay({
      element: overlayRef.current!,
      positioning: "bottom-center",
    });
    map.setTarget(mapRef.current!);
    map.addOverlay(overlay);
    map.on("click", (e) => {
      overlay.setPosition(e.coordinate);
    });
  }, []);

  return (
    <div ref={mapRef}>
      <div ref={overlayRef}>Overlay</div>
    </div>
  );
}
