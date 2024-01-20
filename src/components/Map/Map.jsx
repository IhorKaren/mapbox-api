import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "./Map.css";
import geoJson from "../../data/houses_of _bratislava.json";
import { createRoot } from "react-dom/client";
import Marker from "../Marker/Marker";

mapboxgl.accessToken =
  "pk.eyJ1IjoiaWhvcmthcmVuIiwiYSI6ImNscmtraGp5NjA5ZGQya3F6bzNhcm5wdGMifQ.2TIRinxIjYANsJUWnyWkBg";

const Map = () => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [17.107, 48.145],
      zoom: 16,
      minZoom: 14,
    });

    geoJson.features.forEach((feature) => {
      const ref = React.createRef();

      ref.current = document.createElement("div");

      createRoot(ref.current).render(
        <Marker price={feature.price} address={feature.address} />
      );

      new mapboxgl.Marker(ref.current)
        .setLngLat({ lng: feature.longitude, lat: feature.latitude })
        .addTo(map);
    });

    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    return () => map.remove();
  }, []);

  return <div className="map-container" ref={mapContainerRef} />;
};

export default Map;
