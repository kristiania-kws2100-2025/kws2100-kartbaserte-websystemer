import React, {MouseEvent, useEffect, useRef} from "react";
import {Map, MapBrowserEvent, View} from "ol";
import TileLayer from "ol/layer/Tile";
import {OSM} from "ol/source";

import "ol/ol.css";
import {useGeographic} from "ol/proj";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import {GeoJSON} from "ol/format";
import {Fill, Stroke, Style, Text} from "ol/style";
import {FeatureLike} from "ol/Feature";

useGeographic();

function focusStyle(feature: FeatureLike) {
    return new Style({
        stroke: new Stroke({color: "red", width: 2}),
        text: new Text({
            text: feature.getProperties().name,
            fill: new Fill({color: "red"}),
            stroke: new Stroke({color: "white"}),
        })
    });
}

const municipalityLayer = new VectorLayer({
    source: new VectorSource({url: "/kws2100-kartbaserte-websystemer/geojson/kommuner.json", format: new GeoJSON()}),
    style: new Style({stroke: new Stroke({color: "red", width: 2})})
});

const map = new Map({
    layers: [
        new TileLayer({source: new OSM()}),
        municipalityLayer,
        new VectorLayer({
            source: new VectorSource({url: "/kws2100-kartbaserte-websystemer/geojson/vgs.json", format: new GeoJSON()}),
        }),
    ],
    view: new View({center: [10.6, 59.9], zoom: 10})
})

export function Application() {
    const mapRef = useRef()
    const focusFeatures = useRef([]);

    function handlePointerMove(e: MapBrowserEvent<MouseEvent>) {
        for (const feature of focusFeatures.current) {
            feature.setStyle(undefined);
        }
        const features = municipalityLayer.getSource().getFeaturesAtCoordinate(e.coordinate);
        for (const feature of features) {
            feature.setStyle(focusStyle);
        }
        focusFeatures.current = features;
    }

    useEffect(() => {
        map.setTarget(mapRef.current);
        map.on("pointermove", handlePointerMove);
    }, []);
    return <div ref={mapRef}></div>;
}
