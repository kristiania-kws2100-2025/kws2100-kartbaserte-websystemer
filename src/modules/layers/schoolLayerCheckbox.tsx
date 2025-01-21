import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { GeoJSON } from "ol/format";
import { Layer } from "ol/layer";
import React, { useEffect, useState } from "react";
import { Map, MapBrowserEvent } from "ol";

const source = new VectorSource({
  url: "/kws2100-kartbaserte-websystemer/geojson/schools.geojson",
  format: new GeoJSON(),
});
const schoolLayer = new VectorLayer({
  source,
});

export function SchoolLayerCheckbox({
  setLayers,
  map,
}: {
  setLayers: (value: (prevState: Layer[]) => Layer[]) => void;
  map: Map;
}) {
  const [checked, setChecked] = useState(true);
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
    </button>
  );
}
