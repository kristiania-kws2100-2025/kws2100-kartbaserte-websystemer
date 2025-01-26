# Selecting background layers

This lecture demonstrates selecting background layers

The basic technique we will be using is to have the layers represented as React state:

```tsx
const [baseLayer, setBaseLayer] = useState<Layer>(osmLayer);
useEffect(() => map.setLayers([baseLayer]), [baseLayer]);
```

We have a dropdown that selects the layer based on the user choice:

```tsx
const [selectedLayerValue, setSelectedLayerValue] =
  useState<keyof LayerOptions>("osm");
const selectedLayer = useMemo(
  () => layerOptions[selectedLayerValue],
  [layerOptions, selectedLayerValue],
);

useEffect(() => setBaseLayer(selectedLayer), [selectedLayer]);
```

We have a number of layers options:

```tsx
const layerOptions = useMemo<LayerOptions>(
  () => ({
    osm: { label: "OpenStreetMap", layer: osmLayer },
    stadia: { label: "Stadia", layer: stadiaLayer },
    photo: { label: "Flyfoto fra Kartverket", layer: aerialPhoto },
    arctic: { label: "Arctic", layer: arctic },
  }),
  [stadiaLayer],
);
```

In this example, we change the StadiaMap layer based on the user color preference:

```tsx
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
```

We load the aerialPhoto layer based on the WMTS definition

```tsx
const parser = new WMTSCapabilities();
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
```

This requires the definition of the UTM-33 projection (`npm install proj4`):

```tsx
proj4.defs([
  [
    "EPSG:25833",
    "+proj=utm +zone=33 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs",
  ],
]);
register(proj4);
```

The Arctic layer definition is downloaded from https://arctic-sdi.org/services/topografic-basemap/ and stored locally
in `public/wmts/arctic-sdi.xml` (due to CORS-issues). It is read as WMTS and we define the projection:

```tsx
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

proj4.defs([
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
```

To display correctly, we need to update the view when we change the base map:

```tsx
const [view, setView] = useState(new View({ center: [10.8, 59.9], zoom: 7 }));
useEffect(() => map.setView(view), [view]);
useEffect(() => {
  const projection = baseLayer.getSource()?.getProjection();
  if (projection) {
    setView(
      (v) => new View({ center: v.getCenter(), zoom: v.getZoom(), projection }),
    );
  }
}, [baseLayer]);
```
