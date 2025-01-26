import TileLayer from "ol/layer/Tile";
import { OSM, StadiaMaps } from "ol/source";
import { Layer } from "ol/layer";
import React, { ChangeEvent } from "react";

export const osmLayer = new TileLayer({ source: new OSM() });
const layerOptions = {
  osm: {
    label: "OpenStreetMap",
    layer: osmLayer,
  },
  stadia: {
    label: "Stadia",
    layer: new TileLayer({
      source: new StadiaMaps({ layer: "alidade_smooth_dark" }),
    }),
  },
} as const;

export function BaseLayerSelect({
  setBaseLayer,
}: {
  setBaseLayer: (layer: Layer) => void;
}) {
  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    const selectedLayer = e.target.value as keyof typeof layerOptions;
    setBaseLayer(layerOptions[selectedLayer].layer);
  }

  return (
    <select onChange={handleChange}>
      {Object.entries(layerOptions).map(([k, v]) => (
        <option key={k} value={k}>
          {v.label}
        </option>
      ))}
    </select>
  );
}
