import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
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
import { Layer } from "ol/layer";
import { CheckboxButton } from "../widgets/checkboxButton";
import { GeoJSON } from "ol/format";

useGeographic();

const userSource = new VectorSource();
const view = new View({ center: [10.8, 59.9], zoom: 13 });
const map = new Map({ view });

function MapView() {
  const mapRef = useRef<HTMLDivElement>(null);
  useEffect(() => map.setTarget(mapRef.current!), []);
  return <div ref={mapRef}></div>;
}

const municipalityLayer = new VectorLayer({
  source: new VectorSource({
    url: "/kws2100-kartbaserte-websystemer/geojson/kommuner.geojson",
    format: new GeoJSON(),
  }),
});

function KommuneLayerCheckbox({
  setLayers,
}: {
  setLayers: Dispatch<SetStateAction<Layer[]>>;
}) {
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    if (checked) {
      setLayers((old) => [...old, municipalityLayer]);
    } else {
      setLayers((old) => old.filter((l) => l !== municipalityLayer));
    }
  }, [checked]);
  return (
    <CheckboxButton checked={checked} onClick={() => setChecked((s) => !s)}>
      Show municipalities
    </CheckboxButton>
  );
}

export function Application() {
  const [layers, setLayers] = useState<Layer[]>([
    new TileLayer({ source: new OSM() }),
    new VectorLayer({
      source: userSource,
    }),
  ]);
  useEffect(() => map.setLayers(layers), [layers]);
  return (
    <>
      <header>
        <h1>Skoler i Norge</h1>
      </header>
      <nav>
        <ZoomToMeButton view={view} />
        <ShowMeCheckbox vectorSource={userSource} />
        <KommuneLayerCheckbox setLayers={setLayers} />
      </nav>
      <MapView />
    </>
  );
}
