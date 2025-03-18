import React, { useEffect, useRef, useState } from "react";
import { Feature, Map, Overlay, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import { useGeographic } from "ol/proj";

import "ol/ol.css";
import { MapboxVectorLayer } from "ol-mapbox-style";
import { FeedMessage } from "../../../generated/gtfs-realtime";
import { Point } from "ol/geom";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Circle, Fill, Stroke, Style } from "ol/style";

import "./application.css";

useGeographic();

const osmLayer = new TileLayer({ source: new OSM() });
const mapBoxLayer = new MapboxVectorLayer({
  styleUrl: "mapbox://styles/mapbox/bright-v9",
  accessToken:
    "pk.eyJ1Ijoiamhhbm5lcyIsImEiOiJjbThlYW0xbXAyamZ5MmpyNzRidDJzejhpIn0.K7d7tNzdXnU0kZYiqttLpw",
});

const vehicleLayer = new VectorLayer({
  style: new Style({
    image: new Circle({
      radius: 8,
      fill: new Fill({ color: "blue" }),
      stroke: new Stroke({ color: "white", width: 2 }),
    }),
  }),
});

const map = new Map({
  layers: [mapBoxLayer, vehicleLayer],
  view: new View({ center: [10.9, 59.9], zoom: 10 }),
});
const overlay = new Overlay({
  positioning: "top-center",
});

function SelectedFeaturesOverlay({ features }: { features: Feature[] }) {
  return (
    <>
      Clicked on {features.length} features
      <pre>
        {JSON.stringify(
          features.map((f) => f.getProperties()),
          null,
          2,
        )}
      </pre>
    </>
  );
}

export function Application() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  const [selectedFeatures, setSelectedFeatures] = useState<Feature[]>([]);

  useEffect(() => {
    map.setTarget(mapRef.current!);
    overlay.setElement(overlayRef.current!);
    map.addOverlay(overlay);
    map.on("click", (e) => {
      overlay.setPosition(e.coordinate);

      const selectedFeatures = map.getFeaturesAtPixel(e.pixel);
      setSelectedFeatures(selectedFeatures as Feature[]);
    });
  }, []);

  async function loadTransitFeed() {
    const res = await fetch(
      "https://api.entur.io/realtime/v1/gtfs-rt/vehicle-positions",
    );
    const messages = FeedMessage.decode(
      new Uint8Array(await res.arrayBuffer()),
    );
    const features = messages.entity.map((entity) => {
      const position = entity.vehicle?.position!;
      const { latitude, longitude } = position;
      return new Feature({
        geometry: new Point([longitude, latitude]),
        properties: entity!.vehicle,
      });
    });

    console.log(features);
    vehicleLayer.setSource(new VectorSource({ features }));
  }

  useEffect(() => {
    loadTransitFeed();
  }, []);

  return (
    <div ref={mapRef}>
      <div ref={overlayRef}>
        <SelectedFeaturesOverlay features={selectedFeatures} />
      </div>
    </div>
  );
}
