import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "./Map.css";
import geoJson from "../../data/houses_of _bratislava.json";

mapboxgl.accessToken =
  "pk.eyJ1IjoiaWhvcmthcmVuIiwiYSI6ImNscmtraGp5NjA5ZGQya3F6bzNhcm5wdGMifQ.2TIRinxIjYANsJUWnyWkBg";

const Map = () => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [17.1077, 48.1486],
      zoom: 15,
    });

    geoJson.features.map((feature) =>
      new mapboxgl.Marker()
        .setLngLat({ lng: feature.longitude, lat: feature.latitude })
        .addTo(map)
    );

    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    return () => map.remove();
  }, []);

  return <div className="map-container" ref={mapContainerRef} />;
};

export default Map;
