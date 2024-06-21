import React, { useState, useEffect } from "react";
import { getUserById } from "../../data/user";
import useReservas from "./useReservas";
import Styles from "./Reservas.module.css";

const Reservas = () => {
  const userId = 22;
  const [userData, setUserData] = useState(null);
  const { data: user, isLoading, isError, error } = useReservas(userId);
  useEffect(() => {
    if (user) {
      setUserData(user);
      console.log(
        "esta es la data del usuaruos",
        JSON.stringify(userData, null, 2)
      );
    }

    if (isLoading) return <p>Cargando...</p>;
    if (isError) return <p>Error: {error.message}</p>;
  }, [userId]);

  return (
    <div>
      <h1>Gracias por tu paciencia    Reservas de {user.nombre} {user.apellido}</h1>
    </div>
    // <div className={Styles.granContenedor}>
    //   <div className={Styles.info}>
    //     <h2>
    //       Reservas de {userData.nombre} {userData.apellido}
    //     </h2>
    //     <div>
    //       {userData.reservaJuegos.map((reserva) => (
    //         <div key={reserva.id} className={Styles.reserva}>
    //           <h3>{reserva.juego.nombre}</h3>
    //           {/* <p>Fecha de inicio: {reserva.fecha}</p> */}
    //           {/* <p>Fecha de fin: {reserva.fechaFin}</p> */}
    //           <p>Cantidad: {reserva.cantidadJuego}</p>
    //           <p>Valor: {reserva.juego.total}</p>
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    // </div>
  );
};
export default Reservas;
