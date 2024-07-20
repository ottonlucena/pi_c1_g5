import { getURLApiBase } from "./util";
const API_URL = getURLApiBase().toString().concat("juegos");
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
  "Producto agregado:", data;
  return data;
};

const actualizarProducto = async (nuevoProducto) => {
  const response = await fetch(API_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(nuevoProducto),
  });

  if (!response.ok) {
    throw new Error("Error al actualizar el producto");
  }

  const data = await response.json();
  "Producto actualizado:", data;
  return data;
};

// Obtener un juego por ID
const obtenerProductoPorId = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  const data = await response.json();
  return data;
};

// Eliminar un juego
const eliminarProducto = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Error al eliminar el producto con id ${id}`);
  }

  `Producto con id ${id} eliminado.`;
  return id;
};

const fetchSuggestions = async () => {
  try {
    const response = await fetch(API_URL + "/suggestion");
    const data = await response.json();
    if (!data || data.length === 0) {
      return [];
    }
    return data;
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    return [];
  }
};

const getValoraciones = async (juegoId) => {
  const response = await fetch(
    `${getURLApiBase().toString().concat("/valoracion/filter/")}${juegoId}`
  );
  if (!response.ok) {
    throw new Error("Error al obtener valoraciones");
  }
  return response.json();
};

const enviarValoracion = async (juegoId, valoracionData) => {
  const response = await fetch(
    `${getURLApiBase().toString().concat("/valoracion/")}${juegoId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(valoracionData),
    }
  );
  if (!response.ok) {
    throw new Error("Error al enviar la valoración");
  }
  return response.json();
};

const verificarDisponibilidad = async (datosReserva) => {
  const response = await fetch(
    `${getURLApiBase().toString().concat("reservas/disponibles")}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosReserva),
    }
  );

  if (!response.ok) {
    throw new Error("Error al verificar la disponibilidad");
  }

  return response.json();
};

export const postReservation = async (reservationData) => {
  try {
    console.log("Data enviada al servidor:", reservationData);
    const response = await fetch(
      `${getURLApiBase().toString().concat("reservas")}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservationData),
      }
    );

    if (!response.ok) {
      throw new Error("Error en la solicitud");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error al realizar la reserva:", error);
    throw error;
  }
};

export {
  obtenerProductos,
  agregarProducto,
  obtenerProductoPorId,
  actualizarProducto,
  eliminarProducto,
  fetchSuggestions,
  getValoraciones,
  enviarValoracion,
  verificarDisponibilidad,
};
