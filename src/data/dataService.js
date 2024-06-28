// dataService.js
const API_URL = "https://sunny-exploration-production.up.railway.app/api/category";

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


export const eliminarCategoriaPorNombre = async (title) => {
  try {
    const response = await fetch(`${API_URL}/${title}`, {
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


export const actualizarCategoria = async (title, categoriaActualizada) => {
  try {
    const response = await fetch(`${API_URL}/${title}`, {
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





