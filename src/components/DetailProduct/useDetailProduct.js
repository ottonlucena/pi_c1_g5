import { useQuery } from 'react-query';
import { obtenerProductoPorId } from '../../data/juegos';

const useDetailProduct = (id) => {
  return useQuery(['product', id], () => obtenerProductoPorId(id));
};

export default useDetailProduct;
