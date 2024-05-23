// data.js

// dataService.js

/* import initialJuegos from '../data/juegos.json';

const obtenerProductos = () => {
  return JSON.parse(localStorage.getItem('productos')) || [];
};

const guardarProductos = (productos) => {
  localStorage.setItem('productos', JSON.stringify(productos));
};

const agregarProducto = (nuevoProducto) => {
  let productos = obtenerProductos();
  productos.push(nuevoProducto);
  guardarProductos(productos);
  console.log("Producto agregado:", nuevoProducto);
};

const mostrarProductos = () => {
  const productos = obtenerProductos();
  console.log("Productos registrados:");
  productos.forEach((producto, index) => {
    console.log(`${index + 1}. ${producto.nombre}: ${producto.descripcion}`);
  });
};

const obtenerProductoPorId = (id) => {
  const productos = obtenerProductos();
  return productos.find((producto) => producto.id === id);
};

const actualizarProducto = (id, productoActualizado) => {
  let productos = obtenerProductos();
  const index = productos.findIndex((producto) => producto.id === id);
  if (index !== -1) {
    productos[index] = productoActualizado;
    guardarProductos(productos);
    console.log("Producto actualizado:", productoActualizado);
  } else {
    console.log(`Producto con id ${id} no encontrado.`);
  }
};

const eliminarProducto = (id) => {
  let productos = obtenerProductos();
  const index = productos.findIndex((producto) => producto.id === id);
  if (index !== -1) {
    productos.splice(index, 1);
    guardarProductos(productos);
    console.log(`Producto con id ${id} eliminado.`);
  } else {
    console.log(`Producto con id ${id} no encontrado.`);
  }
};

export { agregarProducto, mostrarProductos, obtenerProductoPorId, actualizarProducto, eliminarProducto }; */


  