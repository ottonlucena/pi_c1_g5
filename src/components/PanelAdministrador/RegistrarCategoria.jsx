import { useState } from 'react';
import styles from './RegistrarCategoria.module.css';
import { agregarCategoria } from '../../data/dataService'; // Ajusta la ruta según tu estructura de proyecto

const RegistrarCategoria = () => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState(null);
  const [mensaje, setMensaje] = useState('');

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (!titulo || !descripcion || !imagen) {
      setMensaje('Por favor complete todos los campos.');
      return;
    }

    const nuevaCategoria = {
      titulo,
      descripcion,
      imagen: URL.createObjectURL(imagen)
    };

    agregarCategoria(nuevaCategoria);
    setTitulo('');
    setDescripcion('');
    setImagen(null);
    alert('Categoria registrada exitosamente!');
  };

  return (
    <div className={styles.containerPrincipal}>
    <div className={styles.container}>
      <h2 className={styles.titleForm}>Registrar Categoría</h2>
      {mensaje && <p className={styles.mensaje}>{mensaje}</p>}
      <form onSubmit={handleFormSubmit} className={styles.form}>
      <div className={styles.generalInfo}>
        <div className={styles.inputContainer}>
          <label htmlFor="titulo" className={styles.label}>Título:</label>
          <input
            type="text"
            id="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="descripcion" className={styles.label}>Descripción:</label>
          <textarea
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className={styles.textarea}
            required
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="imagen" className={styles.label}>Imagen Representativa:</label>
          <input
            type="file"
            id="imagen"
            accept="image/*"
            onChange={(e) => setImagen(e.target.files[0])}
            className={styles.inputFile}
            required
          />
        </div>
        </div>
        <button type="submit" className={styles.submitButton}>Guardar Categoría</button>
      </form>
    </div>
    </div>
  );
};

export default RegistrarCategoria;
