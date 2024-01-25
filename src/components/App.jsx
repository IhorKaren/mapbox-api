import { useState, useEffect } from "react";
import MapComponent from "./Map/Map";
import { getAllAdverts } from "services/getAllAdverts";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getAdvertsData() {
      try {
        const response = await getAllAdverts();

        setData([...response.filter((el) => el.geoPoints)]);

        return;
      } catch (error) {
        console.log(error);
      }
    }

    getAdvertsData();
  }, []);

  console.log(data);

  return <MapComponent data={data} />;
}

export default App;
