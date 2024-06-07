import React, { useEffect, useState } from "react";
import useRatingStore from "./useRatingStore";
import useRatingPopup from "./useRatingPopup";
import { ToastContainer, toast } from "react-toastify";
import { Button } from "@fluentui/react-components";

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

  const comentarioStyle = {
    backgroundColor: "#f5f5f5", // Color de fondo
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "5px",
  };

  const nombreStyle = {
    fontWeight: "bold",
    color: "#333",
  };

  const fechaStyle = {
    fontStyle: "italic",
    color: "#666",
  };

  const comentarioTextoStyle = {
    marginTop: "5px",
    color: "#333",
  };

  const valoracionStyle = {
    marginTop: "5px",
    color: "#333",
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "#f0f0f0", 
        padding: "20px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        zIndex: 1000,
        width: "500px", 
        height: "400px",
        overflowY: "scroll",
      }}
    >
      <h2
        style={{
          fontSize: "20px", 
          fontFamily: "Segoe UI",
          fontWeight: "700",
          padding: "20px", 
        }}
      >
        Comentarios
      </h2>
      {puntuacion && (
        puntuacion.valoraciones.length > 0 ? (
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {puntuacion.valoraciones.map((calificacion) => (
              <li key={calificacion.id} style={comentarioStyle}>
                <p style={nombreStyle}>{calificacion?.nombre}</p>
                <p style={fechaStyle}>{calificacion?.fecha}</p>
                <p style={comentarioTextoStyle}>{calificacion?.comentario}</p>
                <p style={valoracionStyle}>Valoración: {calificacion?.valoracion}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Este juego aún no recibe comentarios</p>
        )
      )}
      <Button
        onClick={onClose}
        style={{
          marginTop: "10px",
          padding: "10px 20px",
          backgroundColor: "#795af6",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginBlockStart: "180px",
          marginLeft: "80%",
        }}
      >
        Cerrar
      </Button>
    </div>
  );
};

export default RatingPopup;
