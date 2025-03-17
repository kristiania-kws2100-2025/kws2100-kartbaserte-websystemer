import React, { useEffect, useMemo, useRef, useState } from "react";
import { Feature, Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import { useGeographic } from "ol/proj";

import "ol/ol.css";
import { FeedMessage, Position } from "../../../generated/gtfs-realtime";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Point } from "ol/geom";

useGeographic();

const vehicleLayer = new VectorLayer();
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
        const { latitude, longitude } = position;
        return new Feature({
          geometry: new Point([longitude, latitude]),
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
  }, []);
  return vehicleSource;
}

export function Application() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => map.setTarget(mapRef.current!), []);

  const vehicleSource = useVehicleVectorSource();
  useEffect(() => vehicleLayer.setSource(vehicleSource), [vehicleSource]);

  return <div ref={mapRef}></div>;
}
