import React, { act, useEffect, useMemo, useRef, useState } from "react";
import { Feature, Map, Overlay, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import { useGeographic } from "ol/proj";

import "ol/ol.css";
import { FeedMessage } from "../../../generated/gtfs-realtime";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Point } from "ol/geom";
import { Circle, Fill, Stroke, Style, Text } from "ol/style";

import "./application.css";

useGeographic();

const vehicleLayer = new VectorLayer({
  style: (feature) =>
    new Style({
      image: new Circle({
        radius: 10,
        stroke: new Stroke({ color: "black" }),
        fill: new Fill({
          color: feature.getProperties().speed > 0 ? "red" : "blue",
        }),
      }),
      text: new Text({
        text: feature.getProperties().routeId,
      }),
    }),
});
const overlay = new Overlay({});
const map = new Map({
  view: new View({ center: [10.8, 59.9], zoom: 10 }),
  layers: [new TileLayer({ source: new OSM() }), vehicleLayer],
});

function useVehicleVectorSource() {
  async function fetchFeed() {
    const res = await fetch(
      "https://api.entur.io/realtime/v1/gtfs-rt/vehicle-positions",
    );
    if (!res.ok) {
      throw `Failed to fetch ${res.url}: ${res}`;
    }
    return FeedMessage.decode(new Uint8Array(await res.arrayBuffer()))
      .entity.map((e) => e.vehicle)
      .filter((e) => !!e)
      .map((vehicle) => {
        const position = vehicle?.position!;
        const { latitude, longitude, speed } = position;
        const timestamp = new Date(vehicle?.timestamp! * 1000);
        const routeId = vehicle?.trip?.routeId;
        const stationary =
          new Date().getTime() - timestamp.getTime() > 5 * 60 * 1000;
        return new Feature({
          geometry: new Point([longitude, latitude]),
          routeId,
          speed,
          timestamp,
          stationary,
          vehicle,
        });
      });
  }

  const [vehicles, setVehicles] = useState<Feature[]>([]);
  const vehicleSource = useMemo(
    () => new VectorSource({ features: vehicles }),
    [vehicles],
  );

  useEffect(() => {
    fetchFeed().then(setVehicles);
    setInterval(() => {
      fetchFeed().then(setVehicles);
    }, 15_000);
  }, []);
  return vehicleSource;
}

export function Application() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const [selectedFeatures, setSelectedFeatures] = useState<Feature[]>([]);
  useEffect(() => {
    map.setTarget(mapRef.current!);
    map.on("click", (e) => {
      const activeFeatures = map.getFeaturesAtPixel(e.pixel) as Feature[];
      setSelectedFeatures(activeFeatures);
      if (activeFeatures.length > 0) {
        overlay.setPosition(e.coordinate);
      } else {
        overlay.setPosition(undefined);
      }
    });
  }, []);

  const vehicleSource = useVehicleVectorSource();
  useEffect(() => {
    vehicleLayer.setSource(vehicleSource);
    overlay.setElement(overlayRef.current!);
    map.addOverlay(overlay);
  }, [vehicleSource]);

  return (
    <div ref={mapRef}>
      <div ref={overlayRef}>
        <SelectedFeaturesOverlay features={selectedFeatures} />
      </div>
    </div>
  );
}

function SelectedFeaturesOverlay({ features }: { features: Feature[] }) {
  if (features.length == 1) {
    const { geometry, ...properties } = features[0].getProperties();
    return (
      <div>
        A single feature
        <pre>{JSON.stringify(properties, null, 2)}</pre>
      </div>
    );
  }
  return <div>{features.length} selected features</div>;
}
