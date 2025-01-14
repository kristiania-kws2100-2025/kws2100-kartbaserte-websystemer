import React, { useEffect, useRef, useState } from "react";
import { Feature, Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import { useGeographic } from "ol/proj";

import "./application.css";
import "ol/ol.css";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Point } from "ol/geom";

useGeographic();

const userSource = new VectorSource();
const layers = [
  new TileLayer({ source: new OSM() }),
  new VectorLayer({ source: userSource }),
];
const view = new View({ center: [10.8, 59.9], zoom: 13 });
const map = new Map({ view, layers });

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

function ShowMeCheckbox() {
  const feature = new Feature();

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (checked) {
      const number = navigator.geolocation.watchPosition(
        ({ coords: { latitude, longitude } }) => {
          feature.setGeometry(new Point([longitude, latitude]));
        },
      );
      userSource.addFeature(feature);
      return () => navigator.geolocation.clearWatch(number);
    } else {
      userSource.clear();
    }
  }, [checked]);

  return (
    <label>
      <button onClick={() => setChecked((t) => !t)}>
        <input type={"checkbox"} checked={checked} readOnly /> Show my location
        in map
      </button>
    </label>
  );
}

export function Application() {
  return (
    <>
      <header>
        <h1>Skoler i Norge</h1>
      </header>
      <nav>
        <ZoomToMeButton />
        <ShowMeCheckbox />
      </nav>
      <MapView />
    </>
  );
}
