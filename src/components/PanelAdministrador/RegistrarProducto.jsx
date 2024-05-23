import { useState, useEffect } from 'react';
import styles from "./RegistrarProducto.module.css";
import { agregarProducto } from '../../data/juegos';
import { leerCategorias, inicializarCategorias } from '../../data/dataService';

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
  const [caracteristicas, setCaracteristicas] = useState(['', '', '', '', '']);
  const [error, setError] = useState('');

  useEffect(() => {
    inicializarCategorias();
    const categorias = leerCategorias();
    setCategorias(categorias);
  }, []);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (!nombre || !descripcion || !largo || !ancho || !altura || !capacidad || !valorArriendo || !cantidad || imagenes.length === 0 || !categoria || caracteristicas.some(car => !car)) {
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
      img_url: imagenes[0] ? URL.createObjectURL(imagenes[0]) : '',
      caracteristicas
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
    setCaracteristicas(['', '', '', '', '']);
    alert('Producto registrado exitosamente!');
  };

  const handleChangeNumericInput = (setter, value) => {
    if (value >= 0) {
      setter(value);
    }
  };

  return (
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
            </div>
            <div className={styles.metaData}>
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
              <div className={styles.inputContainer}>
                <label htmlFor="caracteristica1" className={styles.label}>Característica 1:</label>
                <input
                  type="text"
                  id="caracteristica1"
                  value={caracteristicas[0]}
                  onChange={(e) => setCaracteristicas([e.target.value, ...caracteristicas.slice(1)])}
                  className={`${styles.input} ${styles.textInput}`}
                  required
                />
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="caracteristica2" className={styles.label}>Característica 2:</label>
                <input
                  type="text"
                  id="caracteristica2"
                  value={caracteristicas[1]}
                  onChange={(e) => setCaracteristicas([caracteristicas[0], e.target.value, ...caracteristicas.slice(2)])}
                  className={`${styles.input} ${styles.textInput}`}
                  required
                />
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="caracteristica3" className={styles.label}>Característica 3:</label>
                <input
                  type="text"
                  id="caracteristica3"
                  value={caracteristicas[2]}
                  onChange={(e) => setCaracteristicas([caracteristicas[0], caracteristicas[1], e.target.value, ...caracteristicas.slice(3)])}
                  className={`${styles.input} ${styles.textInput}`}
                  required
                />
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="caracteristica4" className={styles.label}>Característica 4:</label>
                <input
                  type="text"
                  id="caracteristica4"
                  value={caracteristicas[3]}
                  onChange={(e) => setCaracteristicas([caracteristicas[0], caracteristicas[1], caracteristicas[2], e.target.value, caracteristicas[4]])}
                  className={`${styles.input} ${styles.textInput}`}
                  required
                />
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="caracteristica5" className={styles.label}>Característica 5:</label>
                <input
                  type="text"
                  id="caracteristica5"
                  value={caracteristicas[4]}
                  onChange={(e) => setCaracteristicas([caracteristicas[0], caracteristicas[1], caracteristicas[2], caracteristicas[3], e.target.value])}
                  className={`${styles.input} ${styles.textInput}`}
                  required
                />
              </div>
            </div>
          </div>
            <div className={styles.inputContainer}>
              <label htmlFor="imagenes" className={styles.label}>Imagenes:</label>
              <input
                type="file"
                id="imagenes"
                onChange={(e) => setImagenes(Array.from(e.target.files))}
                className={`${styles.input} ${styles.fileInput}`}
                required
                multiple
              />
            </div>
          <button type="submit" className={styles.submitButton}>Registrar </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrarProducto;












