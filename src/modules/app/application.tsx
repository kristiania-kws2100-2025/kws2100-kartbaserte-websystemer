import React, {useEffect, useRef} from "react";
import {Map, View} from "ol";
import TileLayer from "ol/layer/Tile";
import {OSM} from "ol/source";

const map = new Map({
    layers: [new TileLayer({source: new OSM()})],
    view: new View({center: [10.6, 59.9], zoom: 6})
})

export function Application() {
    const mapRef = useRef()
    useEffect(() => {
        map.setTarget(mapRef.current);
    }, []);
    return <div ref={mapRef}>I am a React map - for real!</div>;
}
