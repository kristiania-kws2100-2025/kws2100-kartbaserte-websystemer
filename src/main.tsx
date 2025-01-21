import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import { useGeographic } from "ol/proj";

import "ol/ol.css";
import "./application.css";
import { Layer } from "ol/layer";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { GeoJSON } from "ol/format";

useGeographic();

const view = new View({ center: [10.8, 59.9], zoom: 10 });
const map = new Map({ view });

const schoolLayer = new VectorLayer({
  source: new VectorSource({
    url: "/kws2100-kartbaserte-websystemer/geojson/schools.geojson",
    format: new GeoJSON(),
  }),
});

function SchoolLayerCheckbox({
  setLayers,
}: {
  setLayers: (value: (prevState: Layer[]) => Layer[]) => void;
}) {
  const [checked, setChecked] = useState(true);
  useEffect(() => {
    if (checked) {
      setLayers((old) => [...old, schoolLayer]);
    } else {
      setLayers((old) => old.filter((l) => l !== schoolLayer));
    }
  }, [checked]);
  return (
    <button onClick={() => setChecked((b) => !b)}>
      <input type={"checkbox"} checked={checked} />
      Show schools on map
    </button>
  );
}

function Application() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [layers, setLayers] = useState<Layer[]>([
    new TileLayer({ source: new OSM() }),
  ]);
  useEffect(() => map.setTarget(mapRef.current!), []);
  useEffect(() => map.setLayers(layers), [layers]);

  function handleClick() {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        view.animate({
          center: [longitude, latitude],
          zoom: 15,
          duration: 500,
        });
      },
    );
  }

  return (
    <>
      <nav>
        <button onClick={handleClick}>Center on me</button>
        <SchoolLayerCheckbox setLayers={setLayers} />
      </nav>
      <main>
        <div ref={mapRef}></div>
      </main>
    </>
  );
}

createRoot(document.getElementById("root")!).render(<Application />);
