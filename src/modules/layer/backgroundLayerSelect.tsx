import TileLayer from "ol/layer/Tile";
import { OSM, StadiaMaps, WMTS } from "ol/source";
import React, { ChangeEvent } from "react";
import { WMTSCapabilities } from "ol/format";
import { optionsFromCapabilities } from "ol/source/WMTS";

interface BackgroundLayerSelectProps {
  setLayers: (
    value: ((prevState: TileLayer[]) => TileLayer[]) | TileLayer[],
  ) => void;
}

const stadiaLayer = new TileLayer({
  source: new StadiaMaps({ layer: "alidade_smooth" }),
});

const osmLayer = new TileLayer({ source: new OSM() });

const kartverketLayer = new TileLayer();
const parser = new WMTSCapabilities();

fetch("https://cache.kartverket.no/v1/wmts/1.0.0/WMTSCapabilities.xml")
  .then(function (response) {
    return response.text();
  })
  .then(function (text) {
    const result = parser.read(text);
    const options = optionsFromCapabilities(result, {
      layer: "toporaster",
      matrixSet: "webmercator",
    });
    kartverketLayer.setSource(new WMTS(options!));
  });

export function BackgroundLayerSelect({
  setLayers,
}: BackgroundLayerSelectProps) {
  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    console.log(e.target.value);
    if (e.target.value === "stadia") {
      setLayers([stadiaLayer]);
    } else if (e.target.value === "kartverket") {
      setLayers([kartverketLayer]);
    } else {
      setLayers([osmLayer]);
    }
  }

  return (
    <select onChange={handleChange}>
      <option value={"osm"}>Open Street Map</option>
      <option value={"stadia"}>Stadia</option>
      <option value={"kartverket"}>Kartverket</option>
    </select>
  );
}
