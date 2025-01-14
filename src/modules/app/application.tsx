import React, { useEffect, useRef } from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import { useGeographic } from "ol/proj";

import "./application.css";
import "ol/ol.css";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { ShowMeCheckbox } from "../location/showMeCheckbox";
import { ZoomToMeButton } from "../location/zoomToMeButton";

useGeographic();

const userSource = new VectorSource();
const layers = [
  new TileLayer({ source: new OSM() }),
  new VectorLayer({
    source: userSource,
  }),
];
const view = new View({ center: [10.8, 59.9], zoom: 13 });
const map = new Map({ view, layers });

function MapView() {
  const mapRef = useRef<HTMLDivElement>(null);
  useEffect(() => map.setTarget(mapRef.current!), []);
  return <div ref={mapRef}></div>;
}

export function Application() {
  return (
    <>
      <header>
        <h1>Skoler i Norge</h1>
      </header>
      <nav>
        <ZoomToMeButton view={view} />
        <ShowMeCheckbox vectorSource={userSource} />
      </nav>
      <MapView />
    </>
  );
}
