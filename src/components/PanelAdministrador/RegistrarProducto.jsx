import { useState } from 'react';
import styles from "./RegistrarProducto.module.css";
import { agregarProducto } from '../../data/juegos';
import ListarProductos from './ListarProductos';

const RegistrarProducto = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [largo, setLargo] = useState('');
  const [ancho, setAncho] = useState('');
  const [altura, setAltura] = useState('');
  const [capacidad, setCapacidad] = useState('');
  const [valorArriendo, setValorArriendo] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [imagenes, setImagenes] = useState([]);
  const [error, setError] = useState('');
  const [mostrarLista, setMostrarLista] = useState(false);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Validaciones
    if (!nombre || !descripcion || !largo || !ancho || !altura || !capacidad || !valorArriendo || !cantidad || imagenes.length === 0) {
      setError('Por favor complete todos los campos.');
      return;
    }

    // Agregar nuevo producto al arreglo de productos
    const nuevoProducto = {
      nombre,
      descripcion,
      largo: parseFloat(largo),
      ancho: parseFloat(ancho),
      altura: parseFloat(altura),
      capacidad: parseInt(capacidad),
      valorArriendo: parseInt(valorArriendo),
      cantidad: parseInt(cantidad),
      img_url: imagenes[0] ? URL.createObjectURL(imagenes[0]) : '' // Se usa solo la primera imagen como URL de ejemplo
    };
    agregarProducto(nuevoProducto);

    // Limpiar campos después de agregar el producto
    setNombre('');
    setDescripcion('');
    setLargo('');
    setAncho('');
    setAltura('');
    setCapacidad('');
    setValorArriendo('');
    setCantidad('');
    setImagenes([]);

    // Mensaje de éxito
    alert('Producto registrado exitosamente!');
  };

  const handleChangeNumericInput = (setter, value) => {
    if (value >= 0) {
      setter(value);
    }
  };

  const handleMostrarListaClick = () => {
    setMostrarLista(!mostrarLista);
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.titleForm}>Agregar Juego</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleFormSubmit} className={styles.form}>
        <div className={styles.inputContainer}>
          <label htmlFor="nombre" className={styles.label}>Nombre:</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className={`${styles.input} ${styles.textInput}`}
            required
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="descripcion" className={styles.label}>Descripción:</label>
          <textarea
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className={`${styles.input} ${styles.textAreaInput}`}
            required
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="largo" className={styles.label}>Largo (metros):</label>
          <input
            type="number"
            id="largo"
            value={largo}
            onChange={(e) => handleChangeNumericInput(setLargo, e.target.value)}
            className={`${styles.input} ${styles.numberInput}`}
            required
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="ancho" className={styles.label}>Ancho (metros):</label>
          <input
            type="number"
            id="ancho"
            value={ancho}
            onChange={(e) => handleChangeNumericInput(setAncho, e.target.value)}
            className={`${styles.input} ${styles.numberInput}`}
            required
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="altura" className={styles.label}>Altura (metros):</label>
          <input
            type="number"
            id="altura"
            value={altura}
            onChange={(e) => handleChangeNumericInput(setAltura, e.target.value)}
            className={`${styles.input} ${styles.numberInput}`}
            required
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="capacidad" className={styles.label}>Capacidad:</label>
          <input
            type="number"
            id="capacidad"
            value={capacidad}
            onChange={(e) => handleChangeNumericInput(setCapacidad, e.target.value)}
            className={`${styles.input} ${styles.numberInput}`}
            required
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="valorArriendo" className={styles.label}>Valor de Arriendo:</label>
          <input
            type="number"
            id="valorArriendo"
            value={valorArriendo}
            onChange={(e) => handleChangeNumericInput(setValorArriendo, e.target.value)}
            className={`${styles.input} ${styles.numberInput}`}
            required
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="cantidad" className={styles.label}>Cantidad:</label>
          <input
            type="number"
            id="cantidad"
            value={cantidad}
            onChange={(e) => handleChangeNumericInput(setCantidad, e.target.value)}
            className={`${styles.input} ${styles.numberInput}`}
            required
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="imagenes" className={styles.label}>Imágenes:</label>
          <input
            type="file"
            id="imagenes"
            accept="image/*"
            onChange={(e) => setImagenes([...e.target.files])}
            className={`${styles.input} ${styles.fileInput}`}
            multiple
            required
          />
        </div>
        <button type="submit" className={`${styles.button} ${styles.submitButton}`}>Guardar Juego</button>
      </form>
      <button onClick={handleMostrarListaClick} className={styles.button}>Listar Productos</button>
      {mostrarLista && <ListarProductos/>}
    </div>
  );
};

export default RegistrarProducto;








