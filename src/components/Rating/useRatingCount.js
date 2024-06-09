import { useQuery } from "react-query";
import axios from "axios";


const useRatingCount = (juegoId) => {
  return useQuery(["ratingCount", juegoId], async () => {
    const response = await axios.get(`http://localhost:8080/api/juegos/${juegoId}`);
    const data = response.data;
    return data.cantidad_valoraciones;
  });
};

export default useRatingCount;