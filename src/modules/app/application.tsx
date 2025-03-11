import React, { useEffect, useRef, useState } from "react";
import { Feature, Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import { useGeographic } from "ol/proj";

import "ol/ol.css";
import { DrawPointButton } from "./drawPointButton";
import { drawingVectorLayer, drawingVectorSource } from "./drawingVectorLayer";
import VectorSource from "ol/source/Vector";
import { Draw } from "ol/interaction";
import { PointFeatureForm } from "./pointFeatureForm";

useGeographic();

const map = new Map({
  view: new View({ center: [10.8, 59.9], zoom: 13 }),
  layers: [new TileLayer({ source: new OSM() }), drawingVectorLayer],
});

function DrawPolygonButton({
  source,
  map,
}: {
  map: Map;
  source: VectorSource;
}) {
  function handleClick() {
    const draw = new Draw({ type: "Polygon", source });
    map.addInteraction(draw);
    source.once("addfeature", (e) => {
      map.removeInteraction(draw);
    });
  }

  return <button onClick={handleClick}>Add polygon</button>;
}

export function Application() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    map.setTarget(mapRef.current!);

    map.on("click", (e) => {
      const features = map.getFeaturesAtPixel(e.pixel, {
        layerFilter: (l) => l === drawingVectorLayer,
      });
      for (const feature of features) {
        drawingVectorSource.removeFeature(feature as Feature);
      }
    });
  }, []);

  return (
    <>
      <DrawPointButton map={map} source={drawingVectorSource} />
      <DrawPolygonButton map={map} source={drawingVectorSource} />
      <div ref={mapRef}></div>
    </>
  );
}
