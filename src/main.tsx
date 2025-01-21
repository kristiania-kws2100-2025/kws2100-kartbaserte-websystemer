import React, { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import { useGeographic } from "ol/proj";

import "ol/ol.css";
import "./application.css";

useGeographic();

const view = new View({ center: [10.8, 59.9], zoom: 10 });
const layers = [new TileLayer({ source: new OSM() })];
const map = new Map({ layers, view });

function Application() {
  const mapRef = useRef<HTMLDivElement>(null);
  useEffect(() => map.setTarget(mapRef.current!), []);

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
      </nav>
      <main>
        <div ref={mapRef}></div>
      </main>
    </>
  );
}

createRoot(document.getElementById("root")!).render(<Application />);
