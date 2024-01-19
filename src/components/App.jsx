import { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

import { Container } from './Container/Container.styled';

mapboxgl.accessToken = process.env.REACT_APP_MAP_ACCESS_KEY;

export const App = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  // eslint-disable-next-line no-unused-vars
  const [lng, setLng] = useState(17.1077);
  // eslint-disable-next-line no-unused-vars
  const [lat, setLat] = useState(48.1486);
  // eslint-disable-next-line no-unused-vars
  const [zoom, setZoom] = useState(15);

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom,
    });

    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  console.log(process.env.REACT_APP_MAP_ACCESS_KEY);

  return (
    <Container>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container" />
    </Container>
  );
};
