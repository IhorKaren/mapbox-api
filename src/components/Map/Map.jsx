import Map, {
  Marker,
  NavigationControl,
  GeolocateControl,
  ScaleControl,
} from "react-map-gl";
import "./Map.css";
import geoJson from "../../data/houses_of_bratislava.json";
import MarkerComponent from "../Marker/Marker";
import Geocoder from "components/Geocoder/Geocoder";

const MapComponent = () => {
  const change = (e) => {
    console.log(e);
  };

  return (
    <Map
      mapboxAccessToken={process.env.REACT_APP_MAP_ACCESS_KEY}
      initialViewState={{
        longitude: 17.107,
        latitude: 48.145,
        zoom: 16,
      }}
      doubleClickZoom={false}
      // onMove={change}
      mapStyle="mapbox://styles/ihorkaren/clrngnxkz005x01pjf3ukeup4"
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
