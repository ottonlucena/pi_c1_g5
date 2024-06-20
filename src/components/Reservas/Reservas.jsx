import React, { useState, useEffect } from 'react';
import { getUserById } from '../../data/user'; 
import Styles from './Reservas.module.css';

const Reservas = ({ userId }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return; 
    
      try {
        setLoading(true);
        const user = await getUserById(userId);
        setUserData(user); 
      } catch (error) {
        console.error('Error al obtener datos del usuario por ID:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]); 

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!userData) {
    return <p>No se encontraron datos del usuario.</p>; 
  }


  return (
    <div className={Styles.granContenedor}>
      <div className={Styles.info}>
        <h2>Hola</h2>
        <h2>Reservas de {userData.nombre} {userData.apellido}</h2>
        <div>
          {userData.reservaJuegos.map((reserva) => (
            <div key={reserva.id} className={Styles.reserva}>
              <h3>{reserva.juego.nombre}</h3>
              {/* <p>Fecha de inicio: {reserva.fecha}</p> */}
              {/* <p>Fecha de fin: {reserva.fechaFin}</p> */}
              <p>Cantidad: {reserva.cantidadJuego}</p>
              <p>Valor: {reserva.juego.total}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Reservas;
