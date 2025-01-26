import React, { useEffect, useRef, useState } from "react";
import { Map, View } from "ol";
import { useGeographic } from "ol/proj";

import "ol/ol.css";

import "./application.css";
import { Layer } from "ol/layer";
import { BaseLayerSelect, osmLayer } from "./baseLayerSelect";

useGeographic();

const map = new Map({});

function MapNavMenu({
  setBaseLayer,
  setView,
}: {
  setBaseLayer(layer: Layer): void;
  setView(fn: (prevState: View) => View): void;
}) {
  return (
    <nav>
      <li>
        <BaseLayerSelect setBaseLayer={setBaseLayer} setView={setView} />
      </li>
    </nav>
  );
}

export function Application() {
  const mapRef = useRef<HTMLDivElement>(null);

  const [view, setView] = useState(new View({ center: [10.8, 59.9], zoom: 7 }));
  useEffect(() => map.setView(view), [view]);

  const [baseLayer, setBaseLayer] = useState<Layer>(osmLayer);
  useEffect(() => map.setLayers([baseLayer]), [baseLayer]);
  useEffect(() => map.setTarget(mapRef.current!), []);
  return (
    <>
      <header>
        <h1>The Map Application</h1>
      </header>
      <MapNavMenu setBaseLayer={setBaseLayer} setView={setView} />
      <main>
        <div ref={mapRef} />
      </main>
    </>
  );
}
