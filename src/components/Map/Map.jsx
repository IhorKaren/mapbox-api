import Map, {
  Marker,
  NavigationControl,
  GeolocateControl,
  ScaleControl,
} from "react-map-gl/maplibre";
import "./Map.css";
import geoJson from "../../data/houses_of_bratislava.json";
import MarkerComponent from "../Marker/Marker";
import Geocoder from "components/Geocoder/Geocoder";

const MapComponent = () => {
  // eslint-disable-next-line no-unused-vars
  const change = (e) => {
    console.log(e);
  };

  return (
    <Map
      initialViewState={{
        longitude: 17.107,
        latitude: 48.145,
        zoom: 14,
      }}
      doubleClickZoom={false}
      mapStyle="https://api.maptiler.com/maps/streets-v2/style.json?key=jkyOg7nIBllWn5tcjnsS"
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
      <Geocoder position="top-left" />
      <GeolocateControl />
      <NavigationControl />
      <ScaleControl />
    </Map>
  );
};

export default MapComponent;
