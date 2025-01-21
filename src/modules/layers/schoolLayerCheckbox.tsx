import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { GeoJSON } from "ol/format";
import { Layer } from "ol/layer";
import React, { useEffect, useState } from "react";

const schoolLayer = new VectorLayer({
  source: new VectorSource({
    url: "/kws2100-kartbaserte-websystemer/geojson/schools.geojson",
    format: new GeoJSON(),
  }),
});

export function SchoolLayerCheckbox({
  setLayers,
}: {
  setLayers: (value: (prevState: Layer[]) => Layer[]) => void;
}) {
  const [checked, setChecked] = useState(true);
  useEffect(() => {
    if (checked) {
      setLayers((old) => [...old, schoolLayer]);
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
