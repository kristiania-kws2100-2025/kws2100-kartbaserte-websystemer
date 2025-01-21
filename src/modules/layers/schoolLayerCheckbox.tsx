import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { GeoJSON } from "ol/format";
import { Layer } from "ol/layer";
import React, { useEffect, useRef, useState } from "react";
import { Map, MapBrowserEvent, Overlay } from "ol";
import { FeatureLike } from "ol/Feature";

const source = new VectorSource({
  url: "/kws2100-kartbaserte-websystemer/geojson/schools.geojson",
  format: new GeoJSON(),
});
const schoolLayer = new VectorLayer({ source });
const overlay = new Overlay({
  positioning: "bottom-center",
});

export function SchoolLayerCheckbox({
  setLayers,
  map,
}: {
  setLayers: (value: (prevState: Layer[]) => Layer[]) => void;
  map: Map;
}) {
  const [checked, setChecked] = useState(true);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [selectedSchools, setSelectedSchools] = useState<FeatureLike[]>([]);

  function handleClick(e: MapBrowserEvent<MouseEvent>) {
    setSelectedSchools(map.getFeaturesAtPixel(e.pixel));
    overlay.setPosition(e.coordinate);
  }

  useEffect(() => {
    overlay.setElement(overlayRef.current!);
    map.addOverlay(overlay);
  }, []);

  useEffect(() => {
    if (checked) {
      setLayers((old) => [...old, schoolLayer]);
      map.on("click", handleClick);
    } else {
      setLayers((old) => old.filter((l) => l !== schoolLayer));
    }
  }, [checked]);
  return (
    <button onClick={() => setChecked((b) => !b)}>
      <input type={"checkbox"} checked={checked} />
      Show schools on map
      <div ref={overlayRef}>
        Clicked schools:{" "}
        {selectedSchools.map((s) => s.getProperties().navn).join(", ")}
      </div>
    </button>
  );
}
