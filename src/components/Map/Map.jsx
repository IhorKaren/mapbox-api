import React, {useEffect} from "react";
import MapLibreGL from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const MapComponent = () => {
    useEffect(() => {
        const map = new MapLibreGL.Map({
            container: "map",
            center: [17.107, 48.145],
            zoom: 15.5,
            pitch: 45,
            bearing: -17.6,
            antialias: true,
            style: "https://api.maptiler.com/maps/streets-v2/style.json?key=jkyOg7nIBllWn5tcjnsS",
        });


        map.on("load", () => {
            const layers = map.getStyle().layers;
            const labelLayerId = layers.find(
                (layer) => layer.type === "symbol" && layer.layout["text-field"]
            )?.id;
            map.addSource('openmaptiles', {
                type: 'vector',
                url: 'https://api.maptiler.com/tiles/v3/tiles.json?key=jkyOg7nIBllWn5tcjnsS'
            });
            const buildId = 230491553;
            map.addLayer(
                {
                    "id": "buildings-3d",
                    "type": "fill-extrusion",
                    "source": "openmaptiles",
                    "source-layer": "building",
                    "metadata": {},
                    "minzoom": 14,
                    filter: ['==', ['id'], buildId],
                    "paint": {
                        "fill-extrusion-color": "#ff0000",
                        'fill-extrusion-height': ["get", "render_height"],
                        'fill-extrusion-base': ["get", "render_min_height"],
                        "fill-extrusion-opacity": 0.3
                    }
                },
            );
        });
    }, []);

    return (
        <div id="map" style={{position: "absolute", top: 0, bottom: 0, width: "100%"}}></div>
    );
};

export default MapComponent;
