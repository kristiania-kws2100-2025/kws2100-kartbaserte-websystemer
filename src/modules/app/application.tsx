import React, { useEffect, useRef, useState } from "react";
import { Map, Overlay, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import { useGeographic } from "ol/proj";

import "ol/ol.css";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { GeoJSON } from "ol/format";

import "./application.css";
import { FeatureLike } from "ol/Feature";

useGeographic();

const osmLayer = new TileLayer({ source: new OSM() });
const schoolLayer = new VectorLayer({
  source: new VectorSource({
    url: "/api/schools",
    format: new GeoJSON(),
  }),
});
const coverageLayer = new VectorLayer({
  source: new VectorSource({
    url: "/api/grunnkretser",
    format: new GeoJSON(),
  }),
});
const map = new Map({
  view: new View({ center: [10.8, 59.9], zoom: 13 }),
  layers: [osmLayer, schoolLayer, coverageLayer],
});

export function Application() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  const [activeAreas, setActiveAreas] = useState<FeatureLike[]>([]);

  useEffect(() => {
    const overlay = new Overlay({
      element: overlayRef.current!,
      positioning: "bottom-center",
    });
    map.setTarget(mapRef.current!);
    map.addOverlay(overlay);
    map.on("click", (e) => {
      const features = map.getFeaturesAtPixel(e.pixel, {
        layerFilter: (l) => l === coverageLayer,
      });
      setActiveAreas((old) => {
        if (old.length > 0) {
          overlay.setPosition(undefined);
          return [];
        } else {
          overlay.setPosition(features.length > 0 ? e.coordinate : undefined);
          return features;
        }
      });
    });
  }, []);

  return (
    <div ref={mapRef}>
      <div ref={overlayRef}>
        <h2>Overlay</h2>
        <pre>
          {JSON.stringify(
            activeAreas
              .map((f) => f.getProperties())
              .map(({ geometry, ...properties }) => properties),
            null,
            2,
          )}
        </pre>
      </div>
    </div>
  );
}
