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

console.log(geoJSON);

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

  // const staticPolygonData = {
  //   type: "Feature",
  //   geometry: {
  //     type: "Polygon",
  //     coordinates: [
  //       [
  //         [17.107, 48.145],
  //         [17.108, 48.145],
  //         [17.108, 48.146],
  //         [17.107, 48.146],
  //         [17.107, 48.145],
  //       ],
  //     ],
  //   },
  //   properties: {},
  // };

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
      {/* <Source id="static-polygon" type="geojson" data={staticPolygonData}>
        <Layer
          id="static-polygon-layer"
          type="fill"
          paint={{
            "fill-color": "#088",
            "fill-opacity": 0.5,
          }}
        />
      </Source> */}
      {/* {data.length > 0 &&
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
        ))} */}
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
      <Geocoder position="top-left" />
      <GeolocateControl />
      <NavigationControl />
      <ScaleControl />
    </Map>
  );
};

export default MapComponent;
