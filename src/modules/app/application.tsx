import React, {useEffect, useRef} from "react";
import {Map, View} from "ol";
import TileLayer from "ol/layer/Tile";
import {OSM} from "ol/source";

import "ol/ol.css";
import {useGeographic} from "ol/proj";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import {GeoJSON} from "ol/format";
import {Stroke, Style} from "ol/style";

useGeographic();

const municipalityLayer = new VectorLayer({
    source: new VectorSource({ url: "/kws2100-kartbaserte-websystemer/geojson/kommuner.json", format: new GeoJSON() }),
    style: new Style({
        stroke: new Stroke({ color: "red", width: 2 })
    })
});

const map = new Map({
    layers: [
        new TileLayer({source: new OSM()}),
        municipalityLayer,
        new VectorLayer({
            source: new VectorSource({ url: "/kws2100-kartbaserte-websystemer/geojson/vgs.json", format: new GeoJSON() }),
        }),
    ],
    view: new View({center: [10.6, 59.9], zoom: 10})
})

export function Application() {
    const mapRef = useRef()
    useEffect(() => {
        map.setTarget(mapRef.current);
    }, []);
    return <div ref={mapRef}></div>;
}
