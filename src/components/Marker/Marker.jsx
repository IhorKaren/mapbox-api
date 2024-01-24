import { useState } from "react";
import { Popup } from "react-map-gl/maplibre";
import "./Marker.css";

const MarkerComponent = ({ latitude, longitude, price, address }) => {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  return (
    <>
      <button
        className="marker"
        type="button"
        onClick={() => setIsPopUpOpen(!isPopUpOpen)}
      >
        <div className="price">{price}</div>
      </button>

      {isPopUpOpen && (
        <Popup
          latitude={latitude}
          longitude={longitude}
          closeButton
          closeOnClick={false}
          offset={10}
          maxWidth="100px"
        >
          {address}
        </Popup>
      )}
    </>
  );
};

export default MarkerComponent;
