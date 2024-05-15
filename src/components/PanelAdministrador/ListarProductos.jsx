

import { useState, useEffect } from 'react';
import { productos as productosData } from '../../data/juegos';
import styles from './ListarProductos.module.css';
import { Link } from 'react-router-dom';

const ListarProductos = () => {
  const [productos, setProductos] = useState(productosData);
  const [mostrarLista, setMostrarLista] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const eliminarProducto = (index) => {
    const nuevosProductos = [...productos];
    nuevosProductos.splice(index, 1);
    setProductos(nuevosProductos);
  };

  const handleMostrarListaClick = () => {
    setMostrarLista(!mostrarLista);
  };

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768); // Cambia el valor 768 según lo que consideres como dimensión móvil
    };

    checkIsMobile(); // Llamada inicial para configurar el estado basado en la dimensión de la ventana al cargar la página

    window.addEventListener('resize', checkIsMobile); // Agregar listener para cambios de tamaño de ventana

    return () => {
      window.removeEventListener('resize', checkIsMobile); // Remover listener en la limpieza del efecto
    };
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.titleL}>Panel De Administrador</h2>
      <div className={styles.contBtn}>
      {!isMobile && ( // Solo renderiza el botón si no es un dispositivo móvil
          <Link to="/RegistrarProducto">
            <button className={styles.btnAgregar}>
              Agregar Producto
            </button>
          </Link>
        )}
        {isMobile ? (
          <p className= {styles.msj}>Esta función no está disponible en dispositivos móviles.</p>
        ) : (
          <button onClick={handleMostrarListaClick} className={styles.btnAgregar}>
            {mostrarLista ? 'Ocultar Lista' : 'Listar Producto'}
          </button>
        )}
      </div>
      {mostrarLista && !isMobile && (
        <table className={styles.table}>
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
              <th>Acciones</th> {/* Nuevo encabezado para el botón de eliminar */}
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
                <td>
                  <button onClick={() => eliminarProducto(index)}>Eliminar</button> {/* Botón de eliminar */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ListarProductos;




