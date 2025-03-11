import { Feature } from "ol";
import React, { useEffect, useState } from "react";

interface PointFeatureFormProps {
  feature: Feature;
}

export function PointFeatureForm({ feature }: PointFeatureFormProps) {
  const [featureName, setFeatureName] = useState("");
  useEffect(() => feature.setProperties({ featureName }), [featureName]);

  const [color, setColor] = useState("red");
  useEffect(() => feature.setProperties({ color }), [color]);

  return (
    <>
      <h2>Update point properties</h2>
      <div>
        Feature name:{" "}
        <input
          value={featureName}
          onChange={(e) => setFeatureName(e.target.value)}
        />
      </div>
      <div>
        Color:{" "}
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </div>
    </>
  );
}
