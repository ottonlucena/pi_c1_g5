import React, { useEffect, useState } from 'react';
import useRatingStore from './useRatingStore';
const RatingPopup = ({ juegoId, onClose }) => {
  const juegoIdent = useRatingStore((state)=> state.juegoIdent)
  const [comentarios, setComentarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchValoraciones = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/valoracion/filter/${4}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        
      });
      
      if (!response.ok) {
        throw new Error('Error al obtener los comentarios');
      }

      const data = await response.json();
      setComentarios(data.valoraciones);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchValoraciones(juegoId);
  }, [juegoId]);

  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'white',
      padding: '20px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      zIndex: 1000
    }}>
      <h2>Comentarios</h2>
      {loading ? (
        <p>Cargando comentarios...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <ul>
          {comentarios.map((comentario, index) => (
            <li key={index}>
              <p><strong>{comentario.nombre}</strong> ({comentario.fecha}): {comentario.comentario}</p>
              <p>Valoración: {comentario.valoracion}</p>
            </li>
          ))}
        </ul>
      )}
      <button 
        onClick={onClose}
        style={{ 
          marginTop: '10px', 
          padding: '10px 20px', 
          backgroundColor: '#795af6', 
          color: '#fff', 
          border: 'none', 
          borderRadius: '5px', 
          cursor: 'pointer' 
        }}
      >
        Cerrar
      </button>
    </div>
  );
};

export default RatingPopup;
