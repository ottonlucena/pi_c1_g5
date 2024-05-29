const API_URL = "http://localhost:8080/api/juegos";

// Obtener todos los juegos
const obtenerProductos = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("error", response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("error", error);
    throw error;
  }
};

// Agregar un nuevo juego
const agregarProducto = async (nuevoProducto) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(nuevoProducto),
  });

  if (!response.ok) {
    throw new Error("Error al agregar el producto");
  }

  const data = await response.json();
  console.log("Producto agregado:", data);
  return data;
};

// Obtener un juego por ID
const obtenerProductoPorId = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  const data = await response.json();
  return data;
};

const actualizarProducto = async (productoActualizado) => {
  try {
    const response = await fetch(`${API_URL}/${productoActualizado.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productoActualizado),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Error al actualizar el producto: ${error.message}`);
    }

    const data = await response.json();
    console.log("Producto actualizado:", data);
    return data;
  } catch (error) {
    throw new Error(`Error al actualizar el producto: ${error.message}`);
  }
};



// Eliminar un juego
const eliminarProducto = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Error al eliminar el producto con id ${id}`);
  }

  console.log(`Producto con id ${id} eliminado.`);
  return id;
};

export {
  obtenerProductos,
  agregarProducto,
  obtenerProductoPorId,
  actualizarProducto,
  eliminarProducto,
};
