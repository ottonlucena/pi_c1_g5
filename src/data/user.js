const API_URL = 'https://sunny-exploration-production.up.railway.app/api/usuarios';

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

export const getUserById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`); // Corregido para usar `${API_URL}/${id}`
    if (!response.ok) {
      throw new Error('Error al obtener usuario por ID');
    }
    const user = await response.json();
    return user;
  } catch (error) {
    console.error('Error al obtener usuario por ID:', error);
    throw error;
  }
};

export const getUserIdByEmail = async (email) => {
  try {
    const response = await fetch(`${API_URL}?email=${email}`);
    if (!response.ok) {
      throw new Error('Error al obtener el ID del usuario por email');
    }
    const user = await response.json();
    return user.id;
  } catch (error) {
    console.error('Error al obtener el ID del usuario por email:', error);
    throw error;
  }
};
