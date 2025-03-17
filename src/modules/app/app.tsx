import React, { useEffect, useRef } from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import { useGeographic } from "ol/proj";

import "ol/ol.css";
import { FeedMessage } from "../../../generated/gtfs-realtime";

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
    return FeedMessage.decode(new Uint8Array(await res.arrayBuffer()));
  }

  useEffect(() => {
    fetchFeed().then((message) => console.log(message));
  }, []);

  return <div ref={mapRef}></div>;
}
