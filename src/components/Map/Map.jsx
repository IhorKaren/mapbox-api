import React, { useRef } from "react";
import Map, {
  Marker,
  NavigationControl,
  GeolocateControl,
  ScaleControl,
  Source,
  Layer,
} from "react-map-gl/maplibre";
import "./Map.css";
import geoJSON from "../../data/houses_of_bratislava.json";
import MarkerComponent from "../Marker/Marker";
import Geocoder from "components/Geocoder/Geocoder";

const MapComponent = ({ data }) => {
  const mapRef = useRef(null);

  const change = () => {
    if (mapRef.current) {
      const bounds = mapRef.current.getMap().getBounds();

      const filtered = geoJSON.features.filter((el) => el.geoPoints);

      const filteredArray = filtered.filter((el) => {
        let lat = parseFloat(el.geoPoints.latitude);
        let lng = parseFloat(el.geoPoints.longitude);

        return (
          lat >= bounds._sw.lat &&
          lat <= bounds._ne.lat &&
          lng >= bounds._sw.lng &&
          lng <= bounds._ne.lng
        );
      });

      console.log(filteredArray);
    }
  };

  const numberParse = (number) => {
    let parsedNumber;

    parsedNumber = parseFloat(number);

    return parsedNumber;
  };

  const addLayer = (buildId) => {
    return (
      <Layer
        id="buildings-3d"
        type="fill-extrusion"
        source="openmaptiles"
        source-layer="building"
        filter={["==", ["id"], buildId]}
        paint={{
          "fill-extrusion-color": "#ff0000",
          "fill-extrusion-height": ["get", "render_height"],
          "fill-extrusion-base": ["get", "render_min_height"],
          "fill-extrusion-opacity": 0.3,
        }}
      />
    );
  };

  return (
    <Map
      ref={mapRef}
      initialViewState={{
        longitude: 17.107,
        latitude: 48.145,
        zoom: 14,
      }}
      doubleClickZoom={false}
      mapStyle="https://api.maptiler.com/maps/streets-v2/style.json?key=jkyOg7nIBllWn5tcjnsS"
      style={{ width: "100%", height: 900 }}
      onDragEnd={change}
    >
      {geoJSON.features
        .filter((el) => el.geoPoints)
        .map((el) => (
          <Marker
            key={el.id}
            longitude={numberParse(el.geoPoints.longitude)}
            latitude={numberParse(el.geoPoints.latitude)}
            anchor="bottom"
          >
            <MarkerComponent
              longitude={numberParse(el.geoPoints.longitude)}
              latitude={numberParse(el.geoPoints.latitude)}
              price={el.price}
              address={el.title}
            />
          </Marker>
        ))}
      <Source
        id="openmaptiles"
        type="vector"
        url="https://api.maptiler.com/tiles/v3/tiles.json?key=jkyOg7nIBllWn5tcjnsS"
      />
      {addLayer(230491553)}
      <Geocoder position="top-left" />
      <GeolocateControl />
      <NavigationControl />
      <ScaleControl />
    </Map>
  );
};

export default MapComponent;
