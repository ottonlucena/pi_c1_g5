import React from 'react';

const RatingPopup = ({ onClose }) => {
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
      {/* Aquí van los comentarios desde la db que vinculo jorge*/}
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
