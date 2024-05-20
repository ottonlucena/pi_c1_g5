import { useState, useEffect } from 'react';
import styles from "./RegistrarProducto.module.css";
import { agregarProducto } from '../../data/juegos';
import { leerCategorias, inicializarCategorias } from '../../data/dataService';

// Simulación de las categorías obtenidas desde la base de datos


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
  const [categoria, setCategoria] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    inicializarCategorias();
    const categorias = leerCategorias();
    setCategorias(categorias);
    /* localStorage.clear(); */
  }, []);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (!nombre || !descripcion || !largo || !ancho || !altura || !capacidad || !valorArriendo || !cantidad || imagenes.length === 0 || !categoria) {
      setError('Por favor complete todos los campos.');
      return;
    }

    const nuevoProducto = {
      nombre,
      descripcion,
      largo: parseFloat(largo),
      ancho: parseFloat(ancho),
      altura: parseFloat(altura),
      capacidad: parseInt(capacidad),
      valorArriendo: parseInt(valorArriendo),
      cantidad: parseInt(cantidad),
      categoria,
      img_url: imagenes[0] ? URL.createObjectURL(imagenes[0]) : ''
    };
    agregarProducto(nuevoProducto);

    setNombre('');
    setDescripcion('');
    setLargo('');
    setAncho('');
    setAltura('');
    setCapacidad('');
    setValorArriendo('');
    setCantidad('');
    setCategoria('');
    setImagenes([]);
    alert('Producto registrado exitosamente!');
  };

  const handleChangeNumericInput = (setter, value) => {
    if (value >= 0) {
      setter(value);
    }
  };

  return (
    <>
      <div className={styles.containerPrincipal}>
        <div className={styles.formContainer}>
          <h2 className={styles.titleForm}>Agregar Juego</h2>
          {error && <p className={styles.error}>{error}</p>}
          <form onSubmit={handleFormSubmit} className={styles.form}>
            <div className={styles.formSection}>
              <div className={styles.generalInfo}>
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
                  <label htmlFor="categoria" className={styles.label}>Categoría:</label>
                  <select
                    id="categoria"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    className={`${styles.input} ${styles.selectInput}`}
                    required
                  >
                    <option value="">Seleccione una categoría</option>
                    {categorias.map((cat, index) => (
                      <option key={index} value={cat.titulo}>{cat.titulo}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className={styles.metaData}>
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
                  <label htmlFor="descripcion" className={styles.label}>Descripción:</label>
                  <textarea
                    id="descripcion"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    className={`${styles.input} ${styles.textAreaInput}`}
                    required
                  />
                </div>            
              </div>
            </div>
            <div className={styles.imageContainer}>
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
            <div className={styles.formButtons}>
              <button type="submit" className={styles.submitButton}>Guardar Juego</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegistrarProducto;










