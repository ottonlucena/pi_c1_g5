import { useState } from 'react';
import styles from "./RegistrarProducto.module.css";

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

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Validaciones
    if (!nombre || !descripcion || !largo || !ancho || !altura || !capacidad || !valorArriendo || !cantidad || imagenes.length === 0) {
      setError('Por favor complete todos los campos.');
      return;
    }

    // Aquí podrías enviar los datos al backend para su procesamiento
    // y manejo de errores.
    // Por ahora, solo se mostrará un mensaje de éxito.
    alert('Producto registrado exitosamente!');
  };

  const handleChangeNumericInput = (setter, value) => {
    if (value >= 0) {
      setter(value);
    }
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
    </div>
  );
};

export default RegistrarProducto;







