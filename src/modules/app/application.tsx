import React, { useEffect, useRef } from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import { useGeographic } from "ol/proj";

import "ol/ol.css";
import { MapboxVectorLayer } from "ol-mapbox-style";
import { FeedMessage } from "../../../generated/gtfs-realtime";

useGeographic();

const osmLayer = new TileLayer({ source: new OSM() });
const mapBoxLayer = new MapboxVectorLayer({
  styleUrl: "mapbox://styles/mapbox/bright-v9",
  accessToken:
    "pk.eyJ1Ijoiamhhbm5lcyIsImEiOiJjbThlYW0xbXAyamZ5MmpyNzRidDJzejhpIn0.K7d7tNzdXnU0kZYiqttLpw",
});
const map = new Map({
  layers: [mapBoxLayer],
  view: new View({ center: [10.9, 59.9], zoom: 10 }),
});

export function Application() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => map.setTarget(mapRef.current!), []);

  async function loadTransitFeed() {
    const res = await fetch(
      "https://api.entur.io/realtime/v1/gtfs-rt/vehicle-positions",
    );
    const messages = FeedMessage.decode(
      new Uint8Array(await res.arrayBuffer()),
    );
    console.log(messages);
  }

  useEffect(() => {
    loadTransitFeed();
  }, []);

  return <div ref={mapRef}></div>;
}
