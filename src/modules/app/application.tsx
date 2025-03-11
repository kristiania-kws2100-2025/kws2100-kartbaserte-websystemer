import React, { useEffect, useRef, useState } from "react";
import { Feature, Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import { useGeographic } from "ol/proj";

import "ol/ol.css";
import { Draw } from "ol/interaction";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Circle, Fill, Stroke, Style, Text } from "ol/style";
import { GeoJSON } from "ol/format";
import { FeatureLike } from "ol/Feature";

useGeographic();

const drawingVectorSource = new VectorSource();
const featuresAsJson = localStorage.getItem("features");
if (featuresAsJson) {
  drawingVectorSource.addFeatures(new GeoJSON().readFeatures(featuresAsJson));
}

const drawingLayerStyle = (feature: FeatureLike) => [
  new Style({
    image: new Circle({
      radius: 10,
      stroke: new Stroke({ color: "white", width: 2 }),
      fill: new Fill({ color: "blue" }),
    }),
    text: new Text({
      text: feature.getProperties().featureName,
      offsetY: 20,
      font: "12pt sans-serif",
      stroke: new Stroke({ color: "white", width: 2 }),
      fill: new Fill({ color: "black" }),
    }),
  }),
  new Style({
    image: new Circle({
      radius: 12,
      stroke: new Stroke({ color: "black", width: 2 }),
    }),
  }),
];
const map = new Map({
  view: new View({ center: [10.8, 59.9], zoom: 13 }),
  layers: [
    new TileLayer({ source: new OSM() }),
    new VectorLayer({ source: drawingVectorSource, style: drawingLayerStyle }),
  ],
});

interface DrawPointButtonProps {
  map: Map;
  source: VectorSource;
}

interface PointFeatureFormProps {
  feature: Feature;
}

function PointFeatureForm({ feature }: PointFeatureFormProps) {
  const [featureName, setFeatureName] = useState("");
  useEffect(() => {
    feature.setProperties({ featureName });
  }, [featureName]);
  return (
    <>
      <h2>Update point properties</h2>
      <div>
        Feature name:{" "}
        <input
          value={featureName}
          onChange={(e) => setFeatureName(e.target.value)}
        />
      </div>
    </>
  );
}

function DrawPointButton({ map, source }: DrawPointButtonProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [currentFeature, setCurrentFeature] = useState<Feature>();

  function handleClick() {
    const draw = new Draw({ type: "Point", source });
    map.addInteraction(draw);
    source.once("addfeature", (e) => {
      map.removeInteraction(draw);
      setCurrentFeature(e.feature);
      dialogRef.current?.showModal();
    });
  }

  return (
    <button onClick={handleClick}>
      Add point
      <dialog ref={dialogRef}>
        {currentFeature && <PointFeatureForm feature={currentFeature} />}
        <button onClick={() => dialogRef.current?.close()}>Close</button>
      </dialog>
    </button>
  );
}

export function Application() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    map.setTarget(mapRef.current!);
    drawingVectorSource.on("change", () => {
      const featuresAsJson = new GeoJSON().writeFeatures(
        drawingVectorSource.getFeatures(),
      );
      localStorage.setItem("features", featuresAsJson);
    });
  }, []);

  return (
    <>
      <DrawPointButton map={map} source={drawingVectorSource} />
      <div ref={mapRef}></div>
    </>
  );
}
