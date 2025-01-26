import React, { useEffect, useRef, useState } from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { OSM, StadiaMaps } from "ol/source";
import { useGeographic } from "ol/proj";

import "ol/ol.css";

import "./application.css";
import { Layer } from "ol/layer";

useGeographic();

const map = new Map({
  view: new View({ center: [10.8, 59.9], zoom: 12 }),
});

const layerOptions = {
  osm: {
    label: "OpenStreeMap",
    layer: new TileLayer({ source: new OSM() }),
  },
  stadia: {
    label: "Stadia",
    layer: new TileLayer({
      source: new StadiaMaps({ layer: "alidade_smooth_dark" }),
    }),
  },
} as const;

function MapNavMenu({ setBaseLayer }: { setBaseLayer(layer: Layer): void }) {
  return (
    <nav>
      <li>
        <select
          onChange={(e) => {
            const selectedLayer = e.target.value as keyof typeof layerOptions;
            setBaseLayer(layerOptions[selectedLayer].layer);
          }}
        >
          {Object.entries(layerOptions).map(([k, v]) => (
            <option key={k} value={k}>
              {v.label}
            </option>
          ))}
        </select>
      </li>
    </nav>
  );
}

export function Application() {
  const mapRef = useRef<HTMLDivElement>(null);

  const [baseLayer, setBaseLayer] = useState<Layer>(layerOptions.osm.layer);
  useEffect(() => map.setLayers([baseLayer]), [baseLayer]);
  useEffect(() => map.setTarget(mapRef.current!), []);
  return (
    <>
      <header>
        <h1>The Map Application</h1>
      </header>
      <MapNavMenu setBaseLayer={setBaseLayer} />
      <main>
        <div ref={mapRef} />
      </main>
    </>
  );
}
