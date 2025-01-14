import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { GeoJSON } from "ol/format";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { Layer } from "ol/layer";
import { CheckboxButton } from "../widgets/checkboxButton";
import { Feature, Map, MapBrowserEvent, Overlay } from "ol";

type TypedFeature<T> = { getProperties(): T } & Feature;

interface SchoolProperties {
  navn: string;
  antall_elever: number;
  antall_ansatte: number;
  laveste_trinn: number;
  hoyeste_trinn: number;
  eierforhold: string;
  kommunenummer: string;
}

const source = new VectorSource<TypedFeature<SchoolProperties>>({
  url: "/kws2100-kartbaserte-websystemer/geojson/schools.geojson",
  format: new GeoJSON(),
});
const schoolLayer = new VectorLayer({ source });
const overlay = new Overlay({
  autoPan: true,
  positioning: "bottom-center",
});

function SchoolOverlay({ features }: { features: SchoolProperties[] }) {
  if (features.length >= 2) {
    return (
      <div>
        <h3>{features.length} skoler</h3>
        <ul>
          {features
            .toSorted((a, b) => a.navn.localeCompare(b.navn))
            .slice(0, 5)
            .map(({ navn }) => (
              <li key={navn}>{navn}</li>
            ))}
          {features.length > 5 && <li>...</li>}
        </ul>
      </div>
    );
  } else if (features.length === 1) {
    return (
      <div>
        <h3>{features[0].navn}</h3>
        <p>
          <strong>Antall elever:</strong> {features[0].antall_elever}
        </p>
      </div>
    );
  }
  return <div></div>;
}

export function SchoolLayerCheckbox({
  setLayers,
  map,
}: {
  setLayers: Dispatch<SetStateAction<Layer[]>>;
  map: Map;
}) {
  function handleClick(e: MapBrowserEvent<MouseEvent>) {
    map.getFeaturesAtPixel(e.pixel, { layerFilter: (l) => l === schoolLayer });
    const schools = map
      .getFeaturesAtPixel(e.pixel, {
        layerFilter: (l) => l === schoolLayer,
        hitTolerance: 5,
      })
      .map((f) => f.getProperties()) as SchoolProperties[];
    if (schools.length > 0) {
      overlay.setPosition(e.coordinate);
    } else {
      overlay.setPosition(undefined);
    }
    setSelectedFeatures(schools);
  }

  const [selectedFeatures, setSelectedFeatures] = useState<SchoolProperties[]>(
    [],
  );
  const [checked, setChecked] = useState(true);
  const overlayRef = useRef<HTMLDivElement>(null);
  useEffect(() => overlay.setElement(overlayRef.current || undefined), []);

  useEffect(() => {
    if (checked) {
      setLayers((old) => [...old, schoolLayer]);
      map.on("click", handleClick);
      map.addOverlay(overlay);
    }
    return () => {
      overlay.setPosition(undefined);
      map.removeOverlay(overlay);
      map.un("click", handleClick);
      setLayers((old) => old.filter((l) => l !== schoolLayer));
    };
  }, [checked]);
  return (
    <CheckboxButton checked={checked} onClick={() => setChecked((s) => !s)}>
      Show schools
      <div ref={overlayRef} className={"overlay"}>
        <SchoolOverlay features={selectedFeatures} />
      </div>
    </CheckboxButton>
  );
}
