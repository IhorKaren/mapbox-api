import { useControl } from "react-map-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

const Geocoder = ({ position }) => {
  // eslint-disable-next-line no-unused-vars
  const geocoder = useControl(
    () => {
      const ctrl = new MapboxGeocoder({
        marker: false,
        accessToken: process.env.REACT_APP_MAP_ACCESS_KEY,
      });

      return ctrl;
    },
    {
      position: position,
    }
  );
};

export default Geocoder;
