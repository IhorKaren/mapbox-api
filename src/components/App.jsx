import { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { Container } from './Container/Container.styled';

mapboxgl.accessToken =
  'pk.eyJ1IjoiaWhvcmthcmVuIiwiYSI6ImNscmtraGp5NjA5ZGQya3F6bzNhcm5wdGMifQ.2TIRinxIjYANsJUWnyWkBg';

export const App = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(17.1077);
  const [lat, setLat] = useState(48.1486);
  const [zoom, setZoom] = useState(15);

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom,
    });
  });

  return (
    <Container>
      <div ref={mapContainer} className="map-container" />
    </Container>
  );
};
