import { FeatureLike } from "ol/Feature";
import { Circle, Fill, Stroke, Style, Text } from "ol/style";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { GeoJSON } from "ol/format";

export const drawingVectorSource = new VectorSource();
export const featuresAsJson = localStorage.getItem("features");
if (featuresAsJson) {
  drawingVectorSource.addFeatures(new GeoJSON().readFeatures(featuresAsJson));
}
drawingVectorSource.on("change", () => {
  const featuresAsJson = new GeoJSON().writeFeatures(
    drawingVectorSource.getFeatures(),
  );
  localStorage.setItem("features", featuresAsJson);
});

const drawingLayerStyle = (feature: FeatureLike) => [
  new Style({
    image: new Circle({
      radius: 10,
      stroke: new Stroke({ color: "white", width: 2 }),
      fill: new Fill({ color: feature.getProperties().color || "blue" }),
    }),
    text: new Text({
      text: feature.getProperties().featureName,
      offsetY: 20,
      font: "12pt sans-serif",
      stroke: new Stroke({ color: "white", width: 2 }),
      fill: new Fill({ color: "black" }),
    }),
  }),
  new Style({
    image: new Circle({
      radius: 12,
      stroke: new Stroke({ color: "black", width: 2 }),
    }),
    stroke: new Stroke({ color: "black", width: 2 }),
  }),
];
export const drawingVectorLayer = new VectorLayer({
  source: drawingVectorSource,
  style: drawingLayerStyle,
});
