const API_URL = 'https://sunny-exploration-production.up.railway.app/api/caracteristicas';

// Función para obtener todas las características
export const obtenerCaracteristicas = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Error al obtener características');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener características:', error);
    throw error;
  }
};

// Función para crear una nueva característica
export const crearCaracteristica = async (nombre) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nombre }),
    });
    if (!response.ok) {
      throw new Error('Error al crear la característica');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al crear la característica:', error);
    throw error;
  }
};

// Función para actualizar una característica existente
export const actualizarCaracteristica = async (id, nombre) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nombre }),
    });
    if (!response.ok) {
      throw new Error('Error al actualizar la característica');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al actualizar la característica:', error);
    throw error;
  }
};

// Función para eliminar una característica existente
// Eliminar un juego
export const eliminarCaracteristica = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(`Error al eliminar la caracteristica con id ${id}`);
  }

  `Caracteristica con id ${id} eliminado.`;
  return id;
};
