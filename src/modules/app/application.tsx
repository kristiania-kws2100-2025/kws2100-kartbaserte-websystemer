import React, { useEffect, useRef } from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import { useGeographic } from "ol/proj";

import "./application.css";
import "ol/ol.css";

useGeographic();

const map = new Map({
  view: new View({ center: [10.8, 59.9], zoom: 13 }),
  layers: [new TileLayer({ source: new OSM() })],
});

function MapView() {
  const mapRef = useRef<HTMLDivElement>(null);
  useEffect(() => map.setTarget(mapRef.current!), []);
  return <div ref={mapRef}></div>;
}

function ZoomToMeButton() {
  function handleClick() {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        map.getView().animate({ center: [longitude, latitude], zoom: 15 });
      },
    );
  }

  return <button onClick={handleClick}>Zoom to my location</button>;
}

export function Application() {
  return (
    <>
      <header>
        <h1>Skoler i Norge</h1>
      </header>
      <nav>
        <ZoomToMeButton />
      </nav>
      <MapView />
    </>
  );
}
