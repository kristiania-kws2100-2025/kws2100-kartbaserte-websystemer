import TileLayer from "ol/layer/Tile";
import { OSM, StadiaMaps, WMTS } from "ol/source";
import { Layer } from "ol/layer";
import React, { useEffect, useMemo } from "react";
import { useSessionState } from "../../hooks/useSessionState";
import { useColorScheme } from "../../hooks/useColorScheme";
import { optionsFromCapabilities } from "ol/source/WMTS";
import { WMTSCapabilities } from "ol/format";
import proj4 from "proj4";

import { register } from "ol/proj/proj4.js";

export const osmLayer = new TileLayer({ source: new OSM() });

type LayerOptions = Record<
  "osm" | "stadia" | "kartverket",
  {
    layer: Layer;
    label: string;
  }
>;

/*
proj4.defs(
  "EPSG:21781",
  "+proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +k_0=1 " +
    "+x_0=600000 +y_0=200000 +ellps=bessel " +
    "+towgs84=660.077,13.551,369.344,2.484,1.783,2.939,5.66 +units=m +no_defs",
);

 */
//const projection = "urn:ogc:def:crs:EPSG:6.3:25832";
proj4.defs(
  "EPSG:25832",
  "+proj=utm +zone=32 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs",
);
register(proj4);

const kartverketTopo = new TileLayer();

const parser = new WMTSCapabilities();
fetch("https://cache.kartverket.no/v1/wmts/1.0.0/WMTSCapabilities.xml").then(
  async function (response) {
    const result = parser.read(await response.text());
    const options = optionsFromCapabilities(result, {
      layer: "toporaster",
      matrixSet: "utm32n",
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
