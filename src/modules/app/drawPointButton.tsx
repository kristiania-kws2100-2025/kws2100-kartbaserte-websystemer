import { Feature, Map } from "ol";
import VectorSource from "ol/source/Vector";
import React, { useRef, useState } from "react";
import { Draw } from "ol/interaction";
import { PointFeatureForm } from "./pointFeatureForm";

interface DrawPointButtonProps {
  map: Map;
  source: VectorSource;
}

export function DrawPointButton({ map, source }: DrawPointButtonProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [currentFeature, setCurrentFeature] = useState<Feature>();

  function handleClick() {
    const draw = new Draw({ type: "Point", source });
    map.addInteraction(draw);
    source.once("addfeature", (e) => {
      map.removeInteraction(draw);
      setCurrentFeature(e.feature);
      dialogRef.current?.showModal();
    });
  }

  return (
    <button onClick={handleClick}>
      Add point
      <dialog ref={dialogRef}>
        {currentFeature && <PointFeatureForm feature={currentFeature} />}
        <button onClick={() => dialogRef.current?.close()}>Close</button>
      </dialog>
    </button>
  );
}
