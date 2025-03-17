import React, { useEffect, useRef, useState } from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import { useGeographic } from "ol/proj";

import "ol/ol.css";
import { FeedMessage, Position } from "../../../generated/gtfs-realtime";

useGeographic();

const map = new Map({
  view: new View({ center: [10.8, 59.9], zoom: 13 }),
  layers: [new TileLayer({ source: new OSM() })],
});

export function Application() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => map.setTarget(mapRef.current!), []);

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
        const { position, timestamp } = vehicle;
        return { position, timestamp };
      });
  }

  const [vehicles, setVehicles] = useState<
    { timestamp?: number; position?: Position }[]
  >([]);

  useEffect(() => {
    fetchFeed().then(setVehicles);
  }, []);

  return <div ref={mapRef}></div>;
}
