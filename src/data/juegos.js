// data.js

let productos = [
    {
      nombre: "raqueti",
      descripcion: "juego",
      largo: 1.4,
      ancho: 2,
      altura: 2,
      capacidad: 20,
      valorArriendo: 2400,
      cantidad: 3,
      img_url: "www.e2.x"
    }
  ];
  
  const agregarProducto = (nuevoProducto) => {
    productos.push(nuevoProducto);
    console.log("Producto agregado:", nuevoProducto); // Imprimir el nuevo producto en la consola
  };
  
  const mostrarProductos = () => {
    console.log("Productos registrados:");
    productos.forEach((producto, index) => {
      console.log(`${index + 1}. ${producto.nombre}: ${producto.descripcion}`);
    });
  };
  
  export { productos, agregarProducto, mostrarProductos };
  
  