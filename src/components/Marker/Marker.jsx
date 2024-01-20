import { useState } from "react";
import "./Marker.css";

const Marker = ({ price, address }) => {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  return (
    <>
      <button
        className="marker"
        type="button"
        onClick={() => setIsPopUpOpen(!isPopUpOpen)}
      ></button>
      {!isPopUpOpen && <div className="price">{price}</div>}
      {isPopUpOpen && (
        <div className="popUp">
          <button
            className="popUpClose"
            type="button"
            onClick={() => setIsPopUpOpen(false)}
          >
            x
          </button>{" "}
          {address}
        </div>
      )}
    </>
  );
};

export default Marker;
