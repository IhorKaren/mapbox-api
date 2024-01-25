import axios from "axios";

axios.defaults.baseURL =
  "https://backend-nestify-advert.onrender.com/api/v1/adverts/";

export const getAllAdverts = async () => {
  try {
    const result = await axios.get("/all");
    
    return result.data;
  } catch (error) {
    console.log(error);
  }
};
