import TileLayer from "ol/layer/Tile";
import { OSM, StadiaMaps, WMTS } from "ol/source";
import { Layer } from "ol/layer";
import React, { useEffect, useMemo } from "react";
import { useSessionState } from "../../hooks/useSessionState";
import { useColorScheme } from "../../hooks/useColorScheme";
import { optionsFromCapabilities } from "ol/source/WMTS";
import { WMTSCapabilities } from "ol/format";

export const osmLayer = new TileLayer({ source: new OSM() });

type LayerOptions = Record<
  "osm" | "stadia" | "kartverket",
  {
    layer: Layer;
    label: string;
  }
>;

const kartverketTopo = new TileLayer();

const parser = new WMTSCapabilities();
fetch("https://cache.kartverket.no/v1/wmts/1.0.0/WMTSCapabilities.xml").then(
  async function (response) {
    const result = parser.read(await response.text());
    const options = optionsFromCapabilities(result, {
      layer: "toporaster",
      matrixSet: "webmercator",
    });
    kartverketTopo.setSource(new WMTS(options!));
  },
);

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
      kartverket: {
        label: "Kartverket Topo (mercator)",
        layer: kartverketTopo,
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
          {v.label}
        </option>
      ))}
    </select>
  );
}
