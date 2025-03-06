import React, { useEffect, useRef } from "react";
import { Feature, Map, MapBrowserEvent, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import { useGeographic } from "ol/proj";

import "ol/ol.css";
import { MVT } from "ol/format";
import VectorTileLayer from "ol/layer/VectorTile";
import VectorTileSource from "ol/source/VectorTile";
import { Circle, Fill, Stroke, Style, Text } from "ol/style";
import { FeatureLike } from "ol/Feature";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Geometry } from "ol/geom";

useGeographic();

const schoolLayer = new VectorTileLayer({
  source: new VectorTileSource({
    url: "/api/schools/{z}/{x}/{y}",
    format: new MVT(),
  }),
  style: function (feature: FeatureLike) {
    return new Style({
      image: new Circle({
        radius: 8 + feature.getProperties().antallelever / 80,
        stroke: new Stroke({ color: "black", width: 1 }),
        fill: new Fill({
          color:
            feature.getProperties().eierforhold === "Offentlig"
              ? "blue"
              : "purple",
        }),
      }),
    });
  },
});
const activeSchools = new VectorSource<FeatureLike>();
const map = new Map({
  view: new View({ center: [10.755, 59.915], zoom: 14 }),
  layers: [
    new TileLayer({ source: new OSM() }),
    new VectorTileLayer({
      source: new VectorTileSource({
        url: "/api/kommuner/{z}/{x}/{y}",
        format: new MVT(),
      }),
    }),
    schoolLayer,
    new VectorTileLayer({
      source: new VectorTileSource({
        url: "/api/vegadresse/{z}/{x}/{y}",
        format: new MVT(),
      }),
    }),
    new VectorLayer({
      source: activeSchools,
      style: (feature) => {
        return [
          new Style({
            text: new Text({
              text: feature.getProperties().skolenavn,
              offsetY: 20,
              font: "15px sans-serif",
            }),
          }),
          new Style({
            image: new Circle({
              radius: 8 + feature.getProperties().antallelever / 80,
              stroke: new Stroke({ color: "black", width: 5 }),
              fill: new Fill({
                color:
                  feature.getProperties().eierforhold === "Offentlig"
                    ? "blue"
                    : "purple",
              }),
            }),
          }),
        ];
      },
    }),
  ],
});

export function Application() {
  function handlePointerMove(e: MapBrowserEvent<MouseEvent>) {
    activeSchools.clear(true);
    const newActive = map.getFeaturesAtPixel(e.pixel, {
      layerFilter: (layer) => layer === schoolLayer,
    });
    for (const active of newActive) {
      const geometry = active.getGeometry()!.clone() as Geometry;
      activeSchools.addFeature(
        new Feature({ geometry, properties: active.getProperties() }),
      );
    }
    activeSchools.refresh();
  }

  const mapRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    map.setTarget(mapRef.current!);
    map.on("pointermove", handlePointerMove);
  }, []);

  return <div ref={mapRef}></div>;
}
