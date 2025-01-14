import React, { ReactNode, useEffect, useRef, useState } from "react";
import { Feature, Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import { useGeographic } from "ol/proj";

import "./application.css";
import "ol/ol.css";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Point } from "ol/geom";
import { Fill, Style } from "ol/style";

useGeographic();

const userSource = new VectorSource();
const layers = [
  new TileLayer({ source: new OSM() }),
  new VectorLayer({
    source: userSource,
    style: new Style({ fill: new Fill({ color: "red" }) }),
  }),
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

function CheckboxButton({
  onClick,
  checked,
  children,
}: {
  onClick: () => void;
  checked: boolean;
  children: ReactNode;
}) {
  return (
    <label>
      <button onClick={onClick}>
        <input type={"checkbox"} checked={checked} readOnly /> {children}
      </button>
    </label>
  );
}

function ShowMeCheckbox({ vectorSource }: { vectorSource: VectorSource }) {
  const feature = new Feature();

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (checked) {
      const number = navigator.geolocation.watchPosition(
        ({ coords: { latitude, longitude } }) => {
          feature.setGeometry(new Point([longitude, latitude]));
        },
      );
      vectorSource.addFeature(feature);
      return () => navigator.geolocation.clearWatch(number);
    } else {
      vectorSource.clear();
    }
  }, [checked]);

  return (
    <CheckboxButton onClick={() => setChecked((t) => !t)} checked={checked}>
      Show my location in map
    </CheckboxButton>
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
        <ShowMeCheckbox vectorSource={userSource} />
      </nav>
      <MapView />
    </>
  );
}
