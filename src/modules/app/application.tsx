import React, { useEffect, useRef } from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import { useGeographic } from "ol/proj";

import "ol/ol.css";
import { MVT } from "ol/format";
import VectorTileLayer from "ol/layer/VectorTile";
import VectorTileSource from "ol/source/VectorTile";
import { Circle, Fill, Stroke, Style, Text } from "ol/style";

useGeographic();

const map = new Map({
  view: new View({ center: [11.05, 59.95], zoom: 14 }),
  layers: [
    new TileLayer({ source: new OSM() }),
    new VectorTileLayer({
      source: new VectorTileSource({
        url: "/api/kommuner/{z}/{x}/{y}",
        format: new MVT(),
      }),
      style: new Style({
        stroke: new Stroke({ color: "black", width: 2 }),
      }),
    }),
    new VectorTileLayer({
      source: new VectorTileSource({
        url: "/api/skoler/{z}/{x}/{y}",
        format: new MVT(),
      }),
      style: (feature) =>
        new Style({
          image: new Circle({
            radius: feature.getProperties().antallelever / 40 + 10,
            stroke: new Stroke({ color: "black", width: 2 }),
            fill: new Fill({
              color:
                feature.getProperties().eierforhold === "Offentlig"
                  ? "blue"
                  : "purple",
            }),
          }),
          text: new Text({
            text: feature.getProperties().skolenavn,
            offsetY: 25,
          }),
        }),
    }),
    new VectorTileLayer({
      source: new VectorTileSource({
        url: "/api/adresser/{z}/{x}/{y}",
        format: new MVT(),
      }),
    }),
  ],
});

export function Application() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    map.setTarget(mapRef.current!);
  }, []);

  return <div ref={mapRef}></div>;
}
