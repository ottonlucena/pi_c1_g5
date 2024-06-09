const API_URL = 'http://localhost:8080/api/usuarios';

// Obtener todos los usuarios
export const getUsers = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Error al obtener usuarios');
    }
    const users = await response.json();
    return users;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    throw error;
  }
};

// Crear un nuevo usuario
export const createUser = async (userData) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error('Error al crear usuario');
    }
    const newUser = await response.json();
    return newUser;
  } catch (error) {
    console.error('Error al crear usuario:', error);
    throw error;
  }
};

// Actualizar un usuario existente
export const updateUser = async (userId) => {
  try {
    const response = await fetch(API_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userId),
    });
    if (!response.ok) {
      throw new Error('Error al actualizar usuario');
    }
    const updatedUser = await response.json();
    return updatedUser;
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    throw error;
  }
};

// Eliminar un usuario
export const deleteUser = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/${userId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Error al eliminar usuario');
    }
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    throw error;
  }
};
