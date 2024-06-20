import React, { useState, useEffect } from 'react';
import { getUserIdByEmail, getUserById } from '../../data/user'; // Corregido el import
import Styles from './Reservas.module.css';

const Reservas = ({ userEmail }) => {
  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        setLoading(true);
        const id = await getUserIdByEmail(userEmail); // Corregido para usar userEmail en lugar de userId
        setUserId(id); // Guarda el ID del usuario obtenido por email
      } catch (error) {
        console.error('Error al obtener el ID del usuario por email:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserId();
  }, [userEmail]); // Debes usar userEmail como dependencia en lugar de userId

  useEffect(() => {
    if (!userId) {
      return; // Evita la llamada a getUserById si userId no está definido
    }

    const fetchUserData = async () => {
      try {
        setLoading(true);
        const user = await getUserById(userId);
        setUserData(user); // Guarda los datos del usuario obtenidos por ID
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
    return null; // Puedes retornar algo aquí si deseas
  }

  // Aquí renderizas la información de userData en tu componente Reservas
  return (
    <div className={Styles.granContenedor}>
      <div className={Styles.info}>
        <h2>Reservas de {userData.nombre} {userData.apellido}</h2>
        {/* Aquí puedes renderizar la información de las reservas del usuario */}
      </div>
    </div>
  );
};

export default Reservas;
