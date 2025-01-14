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
const overlay = new Overlay({
  autoPan: true,
  positioning: "bottom-center",
});

function KommuneOverlay({ features }: { features: KommuneProperties[] }) {
  if (features.length > 0) {
    return (
      <div>
        <h3>{features[0].kommunenavn}</h3>
        <p>
          <strong>Navn:</strong> {features[0].kommunenavn}
        </p>
      </div>
    );
  }
  return <div></div>;
}

export function KommuneLayerCheckbox({
  setLayers,
  map,
}: {
  setLayers: Dispatch<SetStateAction<Layer[]>>;
  map: Map;
}) {
  function handleClick(e: MapBrowserEvent<MouseEvent>) {
    const kommuner = source
      .getFeaturesAtCoordinate(e.coordinate)
      .map((f) => f.getProperties());
    if (kommuner.length > 0) {
      overlay.setPosition(e.coordinate);
    } else {
      overlay.setPosition(undefined);
    }
    setSelectedFeatures(kommuner);
  }

  const [selectedFeatures, setSelectedFeatures] = useState<KommuneProperties[]>(
    [],
  );
  const [checked, setChecked] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  useEffect(() => overlay.setElement(overlayRef.current || undefined), []);

  useEffect(() => {
    if (checked) {
      setLayers((old) => [...old, municipalityLayer]);
      map.on("click", handleClick);
      map.addOverlay(overlay);
    }
    return () => {
      overlay.setPosition(undefined);
      map.removeOverlay(overlay);
      map.un("click", handleClick);
      setLayers((old) => old.filter((l) => l !== municipalityLayer));
    };
  }, [checked]);
  return (
    <CheckboxButton checked={checked} onClick={() => setChecked((s) => !s)}>
      Show municipalities
      <div ref={overlayRef} className={"overlay"}>
        <KommuneOverlay features={selectedFeatures} />
      </div>
    </CheckboxButton>
  );
}
