
import { productos } from '../../data/juegos';

const ListarProductos = () => {
  return (
    <div>
      <h2>Lista de Productos</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Largo</th>
            <th>Ancho</th>
            <th>Altura</th>
            <th>Capacidad</th>
            <th>Valor de Arriendo</th>
            <th>Cantidad</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto, index) => (
            <tr key={index}>
              <td>{producto.nombre}</td>
              <td>{producto.descripcion}</td>
              <td>{producto.largo}</td>
              <td>{producto.ancho}</td>
              <td>{producto.altura}</td>
              <td>{producto.capacidad}</td>
              <td>{producto.valorArriendo}</td>
              <td>{producto.cantidad}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListarProductos;
