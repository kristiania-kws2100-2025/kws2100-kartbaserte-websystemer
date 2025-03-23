import React, { useEffect, useRef, useState } from "react";
import { useGeographic } from "ol/proj";

import "ol/ol.css";
import TileLayer from "ol/layer/Tile";
import { StadiaMaps } from "ol/source";
import { Map, View } from "ol";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { GeoJSON } from "ol/format";
import { Fill, Style } from "ol/style";

useGeographic();

const osmLayer = new TileLayer({
  source: new StadiaMaps({ layer: "stamen_toner_lite" }),
});
const schoolLayer = new VectorLayer({
  source: new VectorSource({ url: "/api/skoler", format: new GeoJSON() }),
});
const schoolProximityLayer = new VectorLayer({
  source: new VectorSource({ url: "/api/naerskoler", format: new GeoJSON() }),
  style: new Style({ fill: new Fill({ color: "#88ff8844" }) }),
});
const map = new Map({ view: new View({ center: [10.8, 59.9], zoom: 12 }) });

export function Application() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => map.setTarget(mapRef.current!), []);

  const [layers, setLayers] = useState([
    osmLayer,
    schoolProximityLayer,
    schoolLayer,
  ]);
  useEffect(() => map.setLayers(layers), [layers]);

  return <div ref={mapRef} />;
}
