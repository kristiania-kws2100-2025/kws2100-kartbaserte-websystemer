import React, {useEffect, useRef} from "react";
import {Map, View} from "ol";
import TileLayer from "ol/layer/Tile";
import {OSM} from "ol/source";

import "ol/ol.css";
import {useGeographic} from "ol/proj";

useGeographic();

const map = new Map({
    layers: [new TileLayer({source: new OSM()})],
    view: new View({center: [10.6, 59.9], zoom: 12})
})

export function Application() {
    const mapRef = useRef()
    useEffect(() => {
        map.setTarget(mapRef.current);
    }, []);
    return <div ref={mapRef}></div>;
}
