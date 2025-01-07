import React, {act, useEffect, useRef} from "react";
import {createRoot} from "react-dom/client";
import {Map, MapBrowserEvent, View} from "ol";
import TileLayer from "ol/layer/Tile";
import {OSM} from "ol/source";
import {useGeographic} from "ol/proj";

import "ol/ol.css"
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import {GeoJSON} from "ol/format";
import {Fill, Stroke, Style, Text} from "ol/style";

useGeographic();

const focusedStyle = feature => new Style({
    stroke: new Stroke({
        width: 2
    }),
    text: new Text(({
        text: feature.getProperties().name,
        fill: new Fill({color: "green"}),
        stroke: new Stroke({color: "white", width: 2})
    }))
});
let municipalityLayer = new VectorLayer({
    source: new VectorSource({
        url: "/kws2100-kartbaserte-websystemer/geojson/kommuner.geojson",
        format: new GeoJSON()
    }),
    style: new Style({
        stroke: new Stroke({
            color: "blue",
            width: 2
        })
    })
});
const map = new Map({
    layers: [
        new TileLayer({ source: new OSM() }),
        municipalityLayer,
        new VectorLayer({
            source: new VectorSource({
                url: "/kws2100-kartbaserte-websystemer/geojson/vgs.geojson",
                format: new GeoJSON()
            })
        })
    ],
    view: new View({center: [10.9, 59.9], zoom: 11})
})

function Application() {
    const mapRef = useRef();
    const activeFeatures = useRef([]);

    function handlePointerMove(event: MapBrowserEvent<MouseEvent>) {
        for (const feature of activeFeatures.current) {
            feature.setStyle(undefined);
        }
        const focusedFeatures = municipalityLayer.getSource().getFeaturesAtCoordinate(event.coordinate);
        for (const feature of focusedFeatures) {
            feature.setStyle(focusedStyle)
        }
        activeFeatures.current = focusedFeatures;
    }

    useEffect(() => {
        map.setTarget(mapRef.current);
        navigator.geolocation.getCurrentPosition(pos => {
            const {longitude, latitude } = pos.coords;
            map.getView().animate({
                center: [longitude, latitude],
                zoom: 11
            })
        }, error => {
            alert(error.message)
        })

        map.on("pointermove", handlePointerMove);
    }, []);

    return <div ref={mapRef}></div>;
}

createRoot(document.getElementById("root")).render(
    <Application/>
)