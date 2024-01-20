import Map, { Marker, NavigationControl, ScaleControl } from "react-map-gl";
import "./Map.css";
import geoJson from "../../data/houses_of _bratislava.json";
import MarkerComponent from "../Marker/Marker";

const MapComponent = () => {
  return (
    <Map
      mapboxAccessToken={process.env.REACT_APP_MAP_ACCESS_KEY}
      initialViewState={{
        longitude: 17.107,
        latitude: 48.145,
        zoom: 16,
        minZoom: 14,
      }}
      mapStyle="mapbox://styles/mapbox/streets-v12"
      style={{ width: "100%", height: 900 }}
    >
      {geoJson.features.map((el) => (
        <Marker
          key={el.address}
          longitude={el.longitude}
          latitude={el.latitude}
          anchor="bottom"
        >
          <MarkerComponent
            latitude={el.latitude}
            longitude={el.longitude}
            price={el.price}
            address={el.address}
          />
        </Marker>
      ))}
      <NavigationControl />
      <ScaleControl />
    </Map>
  );
};

export default MapComponent;
