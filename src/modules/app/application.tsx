import React, { ReactNode, useEffect, useMemo, useRef } from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import { useGeographic } from "ol/proj";

// Styling of OpenLayers components like zoom and pan controls
import "ol/ol.css";
import { Draw } from "ol/interaction";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { GeoJSON } from "ol/format";

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
    new VectorLayer({ source: drawingSource }),
  ],
});

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

  function handleAddFeature() {
    map.removeInteraction(draw);
  }

  useEffect(() => {
    source.on("addfeature", handleAddFeature);
    return () => source.un("addfeature", handleAddFeature);
  }, [source]);

  return <button onClick={() => map.addInteraction(draw)}>{children}</button>;
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

  function handleAddFeature() {
    localStorage.setItem(
      "features",
      geoJSON.writeFeatures(drawingSource.getFeatures()).toString(),
    );
  }
  useEffect(() => {
    drawingSource.on("addfeature", handleAddFeature);
    return () => drawingSource.un("addfeature", handleAddFeature);
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
