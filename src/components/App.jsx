import { useState, useEffect } from "react";
import MapComponent from "./Map/Map";
import { getAllAdverts } from "services/getAllAdverts";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getAdvertsData() {
      try {
        const response = await getAllAdverts();

        if (response) {
          const filteredArray = await response.filter((el) => el.geoPoints);

          setData([...filteredArray]);

          return;
        }

        setData([]);

        return;
      } catch (error) {
        console.log(error);
      }
    }

    getAdvertsData();
  }, []);

  return <MapComponent data={data} />;
}

export default App;
