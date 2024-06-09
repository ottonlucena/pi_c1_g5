import React, { useEffect, useState } from "react";
import useRatingStore from "./useRatingStore";
import useRatingPopup from "./useRatingPopup";
import { ToastContainer, toast } from "react-toastify";

const RatingPopup = ({ onClose }) => {
  const [comentarios, setComentarios] = useState([]);

  const juegoId = useRatingStore((state) => state.juegoId);
  console.log("valor del id", juegoId);

  const { data: puntuacion, isLoading, error } = useRatingPopup(juegoId);

  useEffect(() => {
    if (isLoading) {
      toast.info("Cargando...", { autoClose: false, toastId: "ToastyLoad" });
    } else {
      toast.dismiss("ToastyLoad");
    }
    if (error) {
      toast.error("Error al cargar la data");
    }
  }, [isLoading, error]);

  if (!puntuacion) {
    return null;
  }

  // const fetchValoraciones = async (id) => {
  //   const juegoId = useRatingStore((state) => state.setJuegoId);
  //   console.log("valor del id", juegoId);
  //   try {
  //     const response = await fetch(
  //       `http://localhost:8080/api/valoracion/filter/${juegoId}`,
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("Error al obtener los comentarios");
  //     }

  //     const data = await response.json();
  //     setComentarios(data.valoraciones);
  //   } catch (error) {
  //     setError(error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   setLoading(true);
  //   setError(null);
  //   fetchValoraciones(juegoId);
  // }, [juegoId]);

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "white",
        padding: "20px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        zIndex: 1000,
      }}
    >
      <h2>Comentarios</h2>
      {puntuacion && (
        <ul>
          {puntuacion.valoraciones.map((calificacion) => (
            <li key={puntuacion.juego_id}>
              <p>
                <strong>{calificacion?.nombre}</strong> ({calificacion?.fecha}):{" "}
                {calificacion?.comentario}
              </p>
              <p>Valoración: {calificacion?.valoracion}</p>
            </li>
          ))}
        </ul>
      )}
      <button
        onClick={onClose}
        style={{
          marginTop: "10px",
          padding: "10px 20px",
          backgroundColor: "#795af6",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Cerrar
      </button>
    </div>
  );
};

export default RatingPopup;
