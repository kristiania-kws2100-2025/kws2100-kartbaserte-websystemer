import React, { useEffect, useRef, useState } from "react";
import { useGeographic } from "ol/proj";

import "ol/ol.css";
import TileLayer from "ol/layer/Tile";
import { StadiaMaps } from "ol/source";
import { Map, Overlay, View } from "ol";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { GeoJSON } from "ol/format";
import { Fill, Stroke, Style } from "ol/style";
import { FeatureLike } from "ol/Feature";

import "./application.css";

useGeographic();

const osmLayer = new TileLayer({
  source: new StadiaMaps({ layer: "stamen_toner_lite" }),
});
const schoolSource = new VectorSource({
  url: "/api/skoler",
  format: new GeoJSON(),
});
const schoolLayer = new VectorLayer({ source: schoolSource });
const schoolProximitySource = new VectorSource({
  url: "/api/naerskoler",
  format: new GeoJSON(),
});

function schoolProximityStyle(feature: FeatureLike) {
  const { distance } = feature.getProperties();
  const color = distance === "500m" ? "#88ff8888" : "#ffff8888";
  const zIndex = distance === "500m" ? 2 : 1;
  return new Style({ fill: new Fill({ color }), zIndex });
}

const schoolProximityLayer = new VectorLayer({
  source: schoolProximitySource,
  style: schoolProximityStyle,
});

function getColor(value: number) {
  if (value == 0) return `rgba(0, 255, 0, 0.75)`;

  value = Math.min(1, Math.max(0, value));
  const red = Math.floor(192 * value);
  const green = Math.floor(192 * (1 - value));
  return `rgba(${red}, ${green}, 0, ${0.75})`;
}

const areaSchoolCoverageLayer = new VectorLayer({
  source: new VectorSource({
    url: "/api/skolenaerhet/perGrunnkrets",
    format: new GeoJSON(),
  }),
  style: (f) =>
    new Style({
      stroke: new Stroke({ color: "gray" }),
      fill:
        f.getProperties().antall_adresser < 20
          ? undefined
          : new Fill({ color: getColor(f.getProperties().andel_over_750m) }),
    }),
});

const map = new Map({ view: new View({ center: [10.8, 59.9], zoom: 12 }) });
const overlay = new Overlay({ positioning: "bottom-center" });
map.addOverlay(overlay);

function OverlayDiv({ features }: { features: FeatureLike[] }) {
  return (
    <>
      <h3>{features.length} features</h3>
      {features
        .map((f) => f.getProperties())
        .map(({ geometry, ...props }, index) => (
          <div key={index}>
            <pre>{JSON.stringify(props, null, 2)}</pre>
          </div>
        ))}
    </>
  );
}

export function Application() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const [selectedFeatures, setSelectedFeatures] = useState<FeatureLike[]>([]);
  useEffect(() => {
    map.setTarget(mapRef.current!);
    overlay.setElement(overlayRef.current!);
    map.on("click", (e) => {
      const selectedSchools = map.getFeaturesAtPixel(e.pixel, {
        layerFilter: (l) => l === schoolLayer,
      });
      if (selectedSchools.length > 0) {
        setSelectedFeatures(selectedSchools);
        overlay.setPosition(e.coordinate);
        return;
      }
      const selectedAreas = map.getFeaturesAtPixel(e.pixel, {
        layerFilter: (l) => l === areaSchoolCoverageLayer,
      });
      setSelectedFeatures(selectedAreas);
      overlay.setPosition(selectedAreas.length > 0 ? e.coordinate : undefined);
    });
  }, []);

  const [layers, setLayers] = useState([
    osmLayer,
    areaSchoolCoverageLayer,
    schoolLayer,
  ]);
  useEffect(() => map.setLayers(layers), [layers]);

  return (
    <div ref={mapRef}>
      <div ref={overlayRef}>
        {selectedFeatures.length > 0 && (
          <OverlayDiv features={selectedFeatures} />
        )}
      </div>
    </div>
  );
}
