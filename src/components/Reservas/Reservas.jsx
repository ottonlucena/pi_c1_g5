import React from 'react';
import { format, isBefore, isAfter } from 'date-fns';
import { useReservas } from './useReservas';
import Styles from './Reservas.module.css';

const Reservas = () => {
  const userId = 22;
  const { isLoading, isError, data: user, error } = useReservas(userId);

  if (isLoading) {
    return <div>Cargando información del usuario...</div>;
  }

  if (isError) {
    return <div>Error al cargar la información: {error.message}</div>;
  }

  const esProximaReserva = (fechaInicio) => {
    const hoy = new Date();
    return isAfter(new Date(fechaInicio), hoy);
  };

  const esReservaFinalizada = (fechaInicio) => {
    const hoy = new Date();
    return isBefore(new Date(fechaInicio), hoy);
  };

  return (
    <div className={Styles.granContenedor}>
      <h2>Reservas confirmadas</h2>
      {user.reservas.map((reserva) =>
        reserva.reservaJuegos.map((reservaJuego) => (
          <div key={reservaJuego.juego.id} className={Styles.juegoContenedor}>
            <img
              src={reservaJuego.juego.img_url}
              alt={reservaJuego.juego.nombre}
              className={Styles.imagenJuego}
            />
            <div className={Styles.juegoInformacion}>
              <p className={Styles.juegoNombre}>{reservaJuego.juego.nombre}</p>
              <p className={Styles.juegoDetalles}>
                <strong>Cantidad:</strong> {reservaJuego.cantidad}
              </p>
              <p className={Styles.juegoDetalles}>
                <strong>Fecha de inicio:</strong> {format(new Date(reserva.fechaInicio), 'dd/MM/yyyy')}
              </p>
              <p className={Styles.juegoDetalles}>
                <strong>Fecha de fin:</strong> {format(new Date(reserva.fechaFin), 'dd/MM/yyyy')}
              </p>
              <p className={Styles.juegoDetalles}>
                <strong>Valor unitario: $</strong> {reservaJuego.juego.valorArriendo}
              </p>
              <p className={Styles.juegoDetalles}>
                <strong>Valor de la reserva: $</strong> {reserva.total}
              </p>
              {esProximaReserva(reserva.fechaInicio) && (
                <button className={Styles.botonConfirmada} disabled>Reserva confirmada</button>
              )}
              {esReservaFinalizada(reserva.fechaInicio) && (
                <button className={Styles.botonFinalizada} disabled>Reserva finalizada</button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Reservas;
