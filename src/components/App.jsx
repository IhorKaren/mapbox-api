import Map, { Marker, Source, Layer } from 'react-map-gl';
import { useState, useRef } from 'react';
import { Container } from './Container/Container.styled';

const data = [
  {
    address: 'Námestie SNP 1, 811 01 Bratislava, Slovensko',
    latitude: 48.145974,
    longitude: 17.107218,
  },
  {
    address: 'Hviezdoslavovo námestie 1, 811 01 Bratislava, Slovensko',
    latitude: 48.145934,
    longitude: 17.107315,
  },
  {
    address: 'Nábrežie Dunaja 1, 811 01 Bratislava, Slovensko',
    latitude: 48.144715,
    longitude: 17.107934,
  },
  {
    address: 'Panská ulica 2, 811 01 Bratislava, Slovensko',
    latitude: 48.145965,
    longitude: 17.107325,
  },
  {
    address: 'Mlynské nivy 1, 811 01 Bratislava, Slovensko',
    latitude: 48.145565,
    longitude: 17.108025,
  },
];

export const App = () => {
  const mapRef = useRef(null);

  return (
    <Container>
      <Map
        mapboxAccessToken={process.env.REACT_APP_MAP_ACCESS_KEY}
        mapLib={import('mapbox-gl')}
        initialViewState={{
          longitude: 17.1077,
          latitude: 48.1486,
          zoom: 15,
        }}
        ref={instance => (mapRef.current = instance)}
        width="100%"
        height="900px"
        mapStyle="mapbox://styles/mapbox/streets-v12"
      >
        {data.map(house => (
          <Marker
            key={house.address}
            latitude={house.latitude}
            longitude={house.longitude}
            offsetLeft={-15}
            offsetTop={-15}
          >
            <button
              style={{ width: '30px', height: '30px', fontSize: '30px' }}
              type="button"
            >
              <img
                width={20}
                src={'../../public/logo192.png'}
                alt="house"
                className="w-8"
              />
            </button>
          </Marker>
        ))}
      </Map>
    </Container>
  );
};

// const geojson = {
//   type: 'FeatureCollection',
//   features: [
//     {
//       type: 'Feature',
//       id: 1,
//       geometry: { type: 'Point', coordinates: [48.145565, 17.108025] },
//     },
//     {
//       type: 'Feature',
//       id: 2,
//       geometry: { type: 'Point', coordinates: [48.145965, 17.107325] },
//     },
//     {
//       type: 'Feature',
//       id: 3,
//       geometry: { type: 'Point', coordinates: [17.1077, 48.1486] },
//     },
//   ],
// };

// const layerStyle = {
//   id: 'point',
//   type: 'fill',
//   source: 'mapbox',
//   filter: ['==', 'class', 'park'],
//   paint: {
//     'fill-color': '#4E3FC8',
//   },
// };

// <Source id="my-data" type="geojson" data={geojson}>
// <Layer {...layerStyle} />
// </Source>
