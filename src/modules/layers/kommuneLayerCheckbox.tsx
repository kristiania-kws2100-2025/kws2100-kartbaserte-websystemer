import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { GeoJSON } from "ol/format";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Layer } from "ol/layer";
import { CheckboxButton } from "../widgets/checkboxButton";
import { Map } from "ol";

const source = new VectorSource({
  url: "/kws2100-kartbaserte-websystemer/geojson/kommuner.geojson",
  format: new GeoJSON(),
});
const municipalityLayer = new VectorLayer({ source });

export function KommuneLayerCheckbox({
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
