import TileLayer from "ol/layer/Tile";
import { OSM, StadiaMaps } from "ol/source";
import { Layer } from "ol/layer";
import React, { useEffect, useMemo } from "react";
import { useSessionState } from "../../hooks/useSessionState";
import { useColorScheme } from "../../hooks/useColorScheme";

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
  const [selectedLayerValue, setSelectedLayerValue] = useSessionState<
    keyof LayerOptions
  >("osm", "baseLayer");
  const colorScheme = useColorScheme();
  const stadiaLayer = useMemo<Layer>(
    () =>
      new TileLayer({
        source: new StadiaMaps({
          layer:
            colorScheme === "dark" ? "alidade_smooth_dark" : "alidade_smooth",
        }),
      }),
    [colorScheme],
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
    [stadiaLayer],
  );
  const selectedLayer = useMemo(
    () => layerOptions[selectedLayerValue],
    [layerOptions, selectedLayerValue],
  );
  useEffect(() => setBaseLayer(selectedLayer.layer), [selectedLayer]);
  return (
    <select
      value={selectedLayerValue}
      onChange={(e) =>
        setSelectedLayerValue(e.target.value as keyof LayerOptions)
      }
    >
      {Object.entries(layerOptions).map(([k, v]) => (
        <option key={k} value={k}>
          {v.label} ({colorScheme})
        </option>
      ))}
    </select>
  );
}
