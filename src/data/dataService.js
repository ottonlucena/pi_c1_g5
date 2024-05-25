// dataService.js
const API_URL = "http://localhost:8080/api/tipo-juegos";

export const  LeerCategorias = async () =>  {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("error", response.statusText);
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error("error", error);
    throw error;
  }
}

export const agregarCategoria = async (nuevaCategoria) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevaCategoria),
    });
    if (!response.ok) {
      throw new Error("Error al agregar la categoría");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export const eliminarCategoria = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Error al eliminar la categoría");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const actualizarCategoria = async (id, categoriaActualizada) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoriaActualizada),
    });
    if (!response.ok) {
      throw new Error("Error al actualizar la categoría");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
