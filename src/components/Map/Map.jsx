import React, {useEffect} from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MapComponent = () => {
    useEffect(() => {
        mapboxgl.accessToken =
            "";

        const map = new mapboxgl.Map({
            container: "map",
            style: "mapbox://styles/mapbox/light-v11",
            center: [17.107, 48.145], // Змініть ці координати на бажані
            zoom: 15.5,
            pitch: 45,
            bearing: -17.6,
            antialias: true,
        });


        map.on("load", () => {

            const layers = map.getStyle().layers;
            const labelLayerId = layers.find(
                (layer) => layer.type === "symbol" && layer.layout["text-field"]
            ).id;

            map.addLayer(
                {
                    id: "3d-buildings",
                    source: "composite",
                    "source-layer": "building",
                    filter: ["==", "extrude", "true"],
                    type: "fill-extrusion",
                    minzoom: 15,
                    paint: {
                        "fill-extrusion-color": "#aaa",
                        "fill-extrusion-height": [
                            "interpolate",
                            ["linear"],
                            ["zoom"],
                            15,
                            0,
                            15.05,
                            ["get", "height"],
                        ],
                        "fill-extrusion-base": [
                            "interpolate",
                            ["linear"],
                            ["zoom"],
                            15,
                            0,
                            15.05,
                            ["get", "min_height"],
                        ],
                        "fill-extrusion-opacity": 0.6,
                    },
                },
                labelLayerId
            );

            // setTimeout(() => {
                const longitude = 17.1047098672259;
                const latitude = 48.1027321;

                var point = map.project([longitude, latitude]);
                console.log(point);


                const marker = new mapboxgl.Marker()
                    .setLngLat([longitude, latitude]) // Встановлюємо координати маркера
                    .addTo(map); // Додаємо маркер на карту

                const features = map.queryRenderedFeatures(
                   point,
                    {layers: ['3d-buildings']}
                );


                console.log(features);
                if (!features.length) {
                    console.log("No features found at this location.");
                    return null;
                }
                //////////////////////////////////////////////////////////////////////
                var buildId = 169621165;
                ////////////////////////////////////////////////////
                //aaadress
                // var coordinates = features[0].geometry.coordinates;
                // var z = features[0]._z;
                //////////////////////////////////////////////////////////////////////
                //      1)
            map.addLayer({
                    id: 'highlighted-building',
                    type: 'fill-extrusion',
                    source: 'composite',
                    'source-layer': 'building',
                    paint: {
                        'fill-extrusion-color': '#ff0000',
                        'fill-extrusion-height': ['get', 'height'],
                        'fill-extrusion-base': ['get', 'min_height'],
                        'fill-extrusion-opacity': 0.8
                    },
                    filter: ['==', ['id'],buildId ]
                });

                // Inside the useEffect block


                //2
                //Повернути назад геометрію у вигляді масиву координат і висоту _z

            // }, 1000)
            console.log(map.getLayer("highlighted-building"));
            var layer1 = map.getLayer("highlighted-building");


        })
        map.on("click", function (e) {
            const features = map.queryRenderedFeatures(e.point, {
                layers: ["3d-buildings"]
            });
            console.log(features)
            if (!features.length) {
                console.log("No features found at this location.");
                return;
            }

            const buildingFeature = features[0];
            const buildingId = buildingFeature.id; // Make sure "id" is the correct property name
            console.log(features[0].geometry.coordinates);

            console.log("Building ID:", buildingId);
        });
    }, []);

    return (
        <div>
            <div
                id="map"
                style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    width: "100%",
                }}
            ></div>
        </div>
    );
};

export default MapComponent;