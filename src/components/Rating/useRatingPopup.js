import { useQuery } from "react-query";
import { getValoraciones } from "../../data/juegos";

const useRatingPopup = (id) => {
  return useQuery(["product", id], () => getValoraciones(id));
};

export default useRatingPopup;
