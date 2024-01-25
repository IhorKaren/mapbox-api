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

const MapComponent = ({ data }) => {
  // eslint-disable-next-line no-unused-vars
  const change = (e) => {
    console.log(e);
  };

  const numberParse = (number) => {
    let parsedNumber;

    parsedNumber = parseFloat(number);

    return parsedNumber;
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
      {data.length > 0 &&
        data.map((el) => (
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
      <Geocoder position="top-left" />
      <GeolocateControl />
      <NavigationControl />
      <ScaleControl />
    </Map>
  );
};

export default MapComponent;
