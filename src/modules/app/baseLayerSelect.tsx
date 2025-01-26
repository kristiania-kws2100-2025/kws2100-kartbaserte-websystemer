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
import { View } from "ol";

export const osmLayer = new TileLayer({ source: new OSM() });

type LayerOptions = Record<
  "osm" | "stadia" | "kartverket",
  {
    layer: Layer;
    label: string;
  }
>;

proj4.defs([
  [
    "EPSG:25832",
    "+proj=utm +zone=32 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs",
  ],
  [
    "EPSG:25833",
    "+proj=utm +zone=33 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs",
  ],
  [
    "EPSG:3575",
    "+proj=laea +lat_0=90 +lon_0=10 +x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs +type=crs",
  ],
]);
register(proj4);

const parser = new WMTSCapabilities();

const kartverketTopo = new TileLayer();
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

const aerialPhoto = new TileLayer();
fetch(
  "http://opencache.statkart.no/gatekeeper/gk/gk.open_nib_utm33_wmts_v2?SERVICE=WMTS&REQUEST=GetCapabilities",
).then(async function (response) {
  const result = parser.read(await response.text());
  const options = optionsFromCapabilities(result, {
    layer: "Nibcache_UTM33_EUREF89_v2",
    matrixSet: "default028mm",
  });
  aerialPhoto.setSource(new WMTS(options!));
});

const arctic = new TileLayer();
fetch("/kws2100-kartbaserte-websystemer/wmts/arctic-sdi.xml").then(
  async function (response) {
    const result = parser.read(await response.text());
    const options = optionsFromCapabilities(result, {
      layer: "arctic_cascading",
      matrixSet: "3575",
    });
    arctic.setSource(new WMTS(options!));
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
      photo: {
        label: "Flyfoto fra Kartverket",
        layer: aerialPhoto,
      },
      arctic: {
        label: "Arctic",
        layer: arctic,
      },
    }),
    [stadiaLayer],
  );
  const selectedLayer = useMemo(
    () => layerOptions[selectedLayerValue].layer,
    [layerOptions, selectedLayerValue],
  );
  useEffect(() => setBaseLayer(selectedLayer), [selectedLayer]);
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
