import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { GeoJSON } from "ol/format";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Layer } from "ol/layer";
import { CheckboxButton } from "../widgets/checkboxButton";
import { Feature, Map, MapBrowserEvent } from "ol";

type TypedFeature<T> = { getProperties(): T } & Feature;

interface KommuneProperties {
  kommunenummer: string;
  kommunenavn: string;
  id: string;
  name: string;
}

const source = new VectorSource<TypedFeature<KommuneProperties>>({
  url: "/kws2100-kartbaserte-websystemer/geojson/kommuner.geojson",
  format: new GeoJSON(),
});
const municipalityLayer = new VectorLayer({ source });

export function KommuneLayerCheckbox({
  setLayers,
  map,
}: {
  setLayers: Dispatch<SetStateAction<Layer[]>>;
  map: Map;
}) {
  const [checked, setChecked] = useState(false);

  function handleClick(e: MapBrowserEvent<MouseEvent>) {
    for (const feature of source.getFeaturesAtCoordinate(e.coordinate)) {
      const { kommunenavn, kommunenummer } = feature.getProperties();
      console.log({ kommunenummer, kommunenavn });
    }
  }

  useEffect(() => {
    if (checked) {
      setLayers((old) => [...old, municipalityLayer]);
      map.on("click", handleClick);
    } else {
      setLayers((old) => old.filter((l) => l !== municipalityLayer));
    }
    return () => map.un("click", handleClick);
  }, [checked]);
  return (
    <CheckboxButton checked={checked} onClick={() => setChecked((s) => !s)}>
      Show municipalities
    </CheckboxButton>
  );
}
