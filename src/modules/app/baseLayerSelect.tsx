import TileLayer from "ol/layer/Tile";
import { OSM, StadiaMaps } from "ol/source";
import { Layer } from "ol/layer";
import React, { ChangeEvent, useEffect, useMemo, useState } from "react";

export const osmLayer = new TileLayer({ source: new OSM() });

type LayerOptions = Record<
  "osm" | "stadia",
  {
    layer: Layer;
    label: string;
  }
>;

export function BaseLayerSelect({
  setBaseLayer,
}: {
  setBaseLayer: (layer: Layer) => void;
}) {
  const [selectedLayerValue, setSelectedLayerValue] =
    useState<keyof LayerOptions>("osm");
  const stadiaLayer = useMemo<Layer>(
    () =>
      new TileLayer({
        source: new StadiaMaps({ layer: "alidade_smooth" }),
      }),
    [],
  );

  const layerOptions = useMemo<LayerOptions>(
    () => ({
      osm: {
        label: "OpenStreetMap",
        layer: osmLayer,
      },
      stadia: {
        label: "Stadia",
        layer: stadiaLayer,
      },
    }),
    [],
  );
  const selectedLayer = useMemo(
    () => layerOptions[selectedLayerValue],
    [layerOptions, selectedLayerValue],
  );
  useEffect(() => setBaseLayer(selectedLayer.layer), [selectedLayer]);

  return (
    <select
      onChange={(e) =>
        setSelectedLayerValue(e.target.value as keyof LayerOptions)
      }
    >
      {Object.entries(layerOptions).map(([k, v]) => (
        <option key={k} value={k}>
          {v.label}
        </option>
      ))}
    </select>
  );
}
