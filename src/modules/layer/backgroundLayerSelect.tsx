import TileLayer from "ol/layer/Tile";
import { OSM, StadiaMaps, WMTS } from "ol/source";
import React, { ChangeEvent } from "react";
import { WMTSCapabilities } from "ol/format";
import { optionsFromCapabilities } from "ol/source/WMTS";
import { register } from "ol/proj/proj4";
import proj4 from "proj4";

proj4.defs([
  [
    "EPSG:25833",
    "+proj=utm +zone=33 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs",
  ],
  [
    "EPSG:3575",
    "+proj=laea +lat_0=90 +lon_0=10 +x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs +type=crs",
  ],
]);
register(proj4);

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

const photoLayer = new TileLayer();
fetch(
  "https://opencache.statkart.no/gatekeeper/gk/gk.open_nib_utm33_wmts_v2?SERVICE=WMTS&REQUEST=GetCapabilities",
)
  .then(function (response) {
    return response.text();
  })
  .then(function (text) {
    const result = parser.read(text);
    const options = optionsFromCapabilities(result, {
      layer: "Nibcache_UTM33_EUREF89_v2",
      matrixSet: "default028mm",
    });
    photoLayer.setSource(new WMTS(options!));
  });

const arcticLayer = new TileLayer();
fetch("/kws2100-kartbaserte-websystemer/wmts/arctic-sdi.xml")
  .then(function (response) {
    return response.text();
  })
  .then(function (text) {
    const result = parser.read(text);
    const options = optionsFromCapabilities(result, {
      layer: "arctic_cascading",
      matrixSet: "3575",
    });
    arcticLayer.setSource(new WMTS(options!));
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
    } else if (e.target.value === "photo") {
      setLayers([photoLayer]);
    } else if (e.target.value === "arctic") {
      setLayers([arcticLayer]);
    } else {
      setLayers([osmLayer]);
    }
  }

  return (
    <select onChange={handleChange}>
      <option value={"osm"}>Open Street Map</option>
      <option value={"stadia"}>Stadia</option>
      <option value={"kartverket"}>Kartverket</option>
      <option value={"photo"}>Flyfoto</option>
      <option value={"arctic"}>Arktisk</option>
    </select>
  );
}
