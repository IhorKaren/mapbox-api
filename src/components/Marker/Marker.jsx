import { useState } from "react";
import { Popup } from "react-map-gl";
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
        <Popup latitude={latitude} longitude={longitude} closeOnClick={false}>
          {address}
        </Popup>
      )}
    </>
  );
};

export default MarkerComponent;
