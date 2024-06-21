import { useQuery } from 'react-query';
import { getUserById} from '../../data/user'

const useReservas = (userId) => {
  return useQuery(['user', userId], () => getUserById(userId));
};

export default useReservas;
