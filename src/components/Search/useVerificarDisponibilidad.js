import { useMutation } from 'react-query';
import { verificarDisponibilidad } from '../../data/juegos';

const useVerificarDisponibilidad = () => {
  return useMutation((datosReserva) => verificarDisponibilidad(datosReserva));
};

export default useVerificarDisponibilidad;