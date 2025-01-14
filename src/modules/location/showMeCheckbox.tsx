import VectorSource from "ol/source/Vector";
import { Feature } from "ol";
import React, { useEffect, useState } from "react";
import { Point } from "ol/geom";
import { CheckboxButton } from "../widgets/checkboxButton";

export function ShowMeCheckbox({
  vectorSource,
}: {
  vectorSource: VectorSource;
}) {
  const feature = new Feature();

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (checked) {
      const number = navigator.geolocation.watchPosition(
        ({ coords: { latitude, longitude } }) => {
          feature.setGeometry(new Point([longitude, latitude]));
        },
        (positionError) => {
          console.log({ positionError });
        },
      );
      vectorSource.addFeature(feature);
      return () => navigator.geolocation.clearWatch(number);
    } else {
      vectorSource.clear();
    }
  }, [checked]);

  return (
    <CheckboxButton onClick={() => setChecked((t) => !t)} checked={checked}>
      Show my location in map
    </CheckboxButton>
  );
}
