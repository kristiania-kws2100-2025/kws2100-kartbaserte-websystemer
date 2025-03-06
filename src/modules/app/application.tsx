import React, { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { Feature, Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import { useGeographic } from "ol/proj";

// Styling of OpenLayers components like zoom and pan controls
import "ol/ol.css";
import { Draw } from "ol/interaction";
import VectorSource, { VectorSourceEvent } from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { GeoJSON } from "ol/format";
import { Circle, Fill, Stroke, Style } from "ol/style";
import { FeatureLike } from "ol/Feature";

// By calling the "useGeographic" function in OpenLayers, we tell that we want coordinates to be in degrees
//  instead of meters, which is the default. Without this `center: [10.6, 59.9]` brings us to "null island"
useGeographic();

const geoJSON = new GeoJSON();
const drawingSource = new VectorSource();
const savedFeatures = localStorage.getItem("features");
if (savedFeatures) {
  drawingSource.addFeatures(geoJSON.readFeatures(savedFeatures));
}

const map = new Map({
  // The map will be centered on a position in longitude (x-coordinate, east) and latitude (y-coordinate, north),
  //   with a certain zoom level
  view: new View({ center: [10.8, 59.9], zoom: 13 }),
  layers: [
    new TileLayer({ source: new OSM() }),
    new VectorLayer({
      source: drawingSource,
      style: (feature: FeatureLike) =>
        new Style({
          image: new Circle({
            radius: 10,
            stroke: new Stroke({ color: "white", width: 3 }),
            fill: new Fill({ color: feature.getProperties().color || "blue" }),
          }),
        }),
    }),
  ],
});

function DrawingFeatureForm({ feature }: { feature: Feature }) {
  const [name, setName] = useState(feature.getProperties().name || "");
  useEffect(() => feature.setProperties({ name }), [name]);
  const [color, setColor] = useState(feature.getProperties().color || "");
  useEffect(() => feature.setProperties({ color }), [color]);
  return (
    <>
      <h2>Adding feature</h2>
      <div>
        Name: <input value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        Color:{" "}
        <input
          type={"color"}
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </div>
    </>
  );
}

function DrawFeatureButton({
  children,
  map,
  source,
  type,
}: {
  children: ReactNode;
  map: Map;
  source: VectorSource;
  type: "Point" | "Polygon" | "LineString";
}) {
  const draw = useMemo(() => new Draw({ type, source }), [source]);
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [currentFeature, setCurrentFeature] = useState<Feature>();

  function handleAddFeature(event: VectorSourceEvent) {
    map.removeInteraction(draw);
    setCurrentFeature(event.feature);
    dialogRef.current?.showModal();
  }

  useEffect(() => {
    source.on("addfeature", handleAddFeature);
    return () => source.un("addfeature", handleAddFeature);
  }, [source]);

  return (
    <button onClick={() => map.addInteraction(draw)}>
      <dialog ref={dialogRef}>
        {currentFeature && <DrawingFeatureForm feature={currentFeature} />}
        <button onClick={() => dialogRef.current?.close()}>Submit</button>
      </dialog>
      {children}
    </button>
  );
}

// A functional React component
export function Application() {
  // `useRef` bridges the gap between JavaScript functions that expect DOM objects and React components
  const mapRef = useRef<HTMLDivElement | null>(null);
  // When we display the page, we want the OpenLayers map object to target the DOM object refererred to by the
  // map React component
  useEffect(() => {
    map.setTarget(mapRef.current!);
  }, []);

  function handleChangeDrawingFeatures() {
    localStorage.setItem(
      "features",
      geoJSON.writeFeatures(drawingSource.getFeatures()).toString(),
    );
  }

  useEffect(() => {
    drawingSource.on("change", handleChangeDrawingFeatures);
    return () => drawingSource.un("change", handleChangeDrawingFeatures);
  }, [drawingSource]);

  // This is the location (in React) where we want the map to be displayed
  return (
    <>
      <nav>
        <DrawFeatureButton type={"Point"} map={map} source={drawingSource}>
          Draw point
        </DrawFeatureButton>
        <DrawFeatureButton type={"Polygon"} map={map} source={drawingSource}>
          Draw polygon
        </DrawFeatureButton>
      </nav>
      <div ref={mapRef}></div>
    </>
  );
}
