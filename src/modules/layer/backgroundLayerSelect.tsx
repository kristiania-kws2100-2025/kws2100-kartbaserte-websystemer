import TileLayer from "ol/layer/Tile";
import { OSM, StadiaMaps } from "ol/source";
import React, { ChangeEvent } from "react";

interface BackgroundLayerSelectProps {
  setLayers: (
    value:
      | ((prevState: TileLayer<OSM>[]) => TileLayer<OSM>[])
      | TileLayer<OSM>[],
  ) => void;
}

export function BackgroundLayerSelect({
  setLayers,
}: BackgroundLayerSelectProps) {
  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    console.log(e.target.value);
    if (e.target.value === "stadia") {
      setLayers([
        new TileLayer({ source: new StadiaMaps({ layer: "alidade_smooth" }) }),
      ]);
    } else {
      setLayers([new TileLayer({ source: new OSM() })]);
    }
  }

  return (
    <select onChange={handleChange}>
      <option value={"osm"}>Open Street Map</option>
      <option value={"stadia"}>Stadia</option>
    </select>
  );
}
