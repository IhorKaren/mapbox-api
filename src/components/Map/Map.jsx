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

const geojson = {
  type: "vector",
  url: "https://api.maptiler.com/tiles/v3/tiles.json?key=jkyOg7nIBllWn5tcjnsS",
};

const buildId = 230491553;

const parkLayer = {
  id: "buildings-3d",
  type: "fill-extrusion",
  source: "openmaptiles",
  "source-layer": "building",
  metadata: {},
  minzoom: 14,
  filter: ["==", ["id"], buildId],
  paint: {
    "fill-extrusion-color": "#ff0000",
    "fill-extrusion-height": ["get", "render_height"],
    "fill-extrusion-base": ["get", "render_min_height"],
    "fill-extrusion-opacity": 0.3,
  },
};

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

      <Source id="my-data" type="geojson" data={geojson}>
        <Layer {...parkLayer} />
      </Source>
      <Geocoder position="top-left" />
      <GeolocateControl />
      <NavigationControl />
      <ScaleControl />
    </Map>
  );
};

export default MapComponent;
