import { useState, useEffect } from "react";
import styles from "./EditProductForm.module.css";
import { actualizarProducto } from "../../data/juegos";
import { LeerCategorias } from "../../data/dataService";
import { Button } from "@fluentui/react-components";
import styled from "styled-components";


const CaracButton = styled(Button)`
  background-color: #f5e9fc;
  color: #795af6;

  margin-top: 10px;

  &:hover {
    background-color: #795af6;
    color: white;
  }
`;

const EditProductForm = ({ producto, onSave }) => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [largo, setLargo] = useState("");
  const [ancho, setAncho] = useState("");
  const [altura, setAltura] = useState("");
  const [capacidad, setCapacidad] = useState("");
  const [valorArriendo, setValorArriendo] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [img_url, setImgUrl] = useState("");
  const [categoria, setCategoria] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [caracteristicas, setCaracteristicas] = useState(["", "", "", "", ""]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (producto) {
      setNombre(producto.nombre);
      setDescripcion(producto.descripcion);
      setLargo(producto.largo);
      setAncho(producto.ancho);
      setAltura(producto.altura);
      setCapacidad(producto.capacidad);
      setValorArriendo(producto.valorArriendo);
      setCantidad(producto.cantidad);
      setImgUrl(producto.img_url);
      setCategoria(producto.tipo.id.toString());
      setCaracteristicas(producto.caracteristicas);
    }
  }, [producto]);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const categoriasData = await LeerCategorias();
        setCategorias(categoriasData);
      } catch (error) {
        console.error("Error al leer las categorías", error);
      }
    };
    fetchCategorias();
  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (
      !nombre ||
      !descripcion ||
      !largo ||
      !ancho ||
      !altura ||
      !capacidad ||
      !valorArriendo ||
      !cantidad ||
      !img_url ||
      !categoria ||
      caracteristicas.some((car) => !car)
    ) {
      setError("Por favor complete todos los campos.");
      return;
    }

    const categoriaSeleccionada = categorias.find(
      (cat) => cat.id.toString() === categoria
    );
    if (!categoriaSeleccionada) {
      setError("Categoría seleccionada no es válida.");
      return;
    }

    const nuevoProducto = {
      id: producto.id,
      nombre,
      descripcion,
      largo: parseFloat(largo),
      ancho: parseFloat(ancho),
      altura: parseFloat(altura),
      capacidad: parseInt(capacidad),
      valorArriendo: parseInt(valorArriendo),
      cantidad: parseInt(cantidad),
      img_url,
      tipo: {
        id: categoriaSeleccionada.id,
        title: categoriaSeleccionada.title,
        description: categoriaSeleccionada.description,
        img_url: categoriaSeleccionada.img_url,
      },
      caracteristicas,
    };

    try {
      await actualizarProducto(nuevoProducto);
      onSave(nuevoProducto);
    } catch (error) {
      setError(
        error.message || "Error al actualizar el producto. Inténtelo de nuevo."
      );
      console.error("Error al actualizar el producto:", error);
    }
  };

  const handleChangeNumericInput = (setter, value) => {
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue) && numericValue >= 0) {
      setter(numericValue);
    }
  };

  const handleAddCaracteristica = () => {
    setCaracteristicas([...caracteristicas, ""]);
  };

  const handleRemoveCaracteristica = (index) => {
    setCaracteristicas(caracteristicas.filter((_, i) => i !== index));
  };

  return (
    <div className={styles.containerPrincipal}>
      <div className={styles.formContainer}>
        {error && <p className={styles.error}>{error}</p>}
        <form
          className={styles.form}
          onSubmit={handleFormSubmit}
          id="edit-product-form"
        >
          <div className={styles.formSection}>
            <div className={styles.generalInfo}>
              <div className={styles.inputContainer}>
                <label htmlFor="nombre" className={styles.label}>
                  Nombre:
                </label>
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
                <label htmlFor="descripcion" className={styles.label}>
                  Descripción:
                </label>
                <textarea
                  id="descripcion"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  className={`${styles.input} ${styles.textAreaInput}`}
                  required
                />
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="largo" className={styles.label}>
                  Largo (metros):
                </label>
                <input
                  type="number"
                  id="largo"
                  value={largo}
                  onChange={(e) =>
                    handleChangeNumericInput(setLargo, e.target.value)
                  }
                  className={`${styles.input} ${styles.numberInput}`}
                  required
                />
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="ancho" className={styles.label}>
                  Ancho (metros):
                </label>
                <input
                  type="number"
                  id="ancho"
                  value={ancho}
                  onChange={(e) =>
                    handleChangeNumericInput(setAncho, e.target.value)
                  }
                  className={`${styles.input} ${styles.numberInput}`}
                  required
                />
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="altura" className={styles.label}>
                  Altura (metros):
                </label>
                <input
                  type="number"
                  id="altura"
                  value={altura}
                  onChange={(e) =>
                    handleChangeNumericInput(setAltura, e.target.value)
                  }
                  className={`${styles.input} ${styles.numberInput}`}
                  required
                />
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="categoria" className={styles.label}>
                  Categoría:
                </label>
                <select
                  id="categoria"
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  className={`${styles.input} ${styles.selectInput}`}
                  required
                >
                  <option value="">Seleccione una categoría</option>
                  {categorias.map((cat, index) => (
                    <option key={index} value={cat.id}>
                      {cat.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="capacidad" className={styles.label}>
                  Capacidad:
                </label>
                <input
                  type="number"
                  id="capacidad"
                  value={capacidad}
                  onChange={(e) =>
                    handleChangeNumericInput(setCapacidad, e.target.value)
                  }
                  className={`${styles.input} ${styles.numberInput}`}
                  required
                />
              </div>
            </div>
            <div className={styles.metaData}>
              <div className={styles.inputContainer}>
                <label htmlFor="valorArriendo" className={styles.label}>
                  Valor de Arriendo:
                </label>
                <input
                  type="number"
                  id="valorArriendo"
                  value={valorArriendo}
                  onChange={(e) =>
                    handleChangeNumericInput(setValorArriendo, e.target.value)
                  }
                  className={`${styles.input} ${styles.numberInput}`}
                  required
                />
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="cantidad" className={styles.label}>
                  Cantidad:
                </label>
                <input
                  type="number"
                  id="cantidad"
                  value={cantidad}
                  onChange={(e) =>
                    handleChangeNumericInput(setCantidad, e.target.value)
                  }
                  className={`${styles.input} ${styles.numberInput}`}
                  required
                />
              </div>
              <div className={styles.inputContainer}>
                <CaracButton
                  type="button"
                  onClick={handleAddCaracteristica}
                  className={styles.addButton}
                >
                  Agregar Característica
                </CaracButton>
              </div>
              {caracteristicas.map((caracteristica, index) => (
                <div key={index} className={styles.inputContainer}>
                  <label
                    htmlFor={`caracteristica${index}`}
                    className={styles.label}
                  >
                    Característica {index + 1}:
                  </label>
                  <div className={styles.inputWithButton}>
                    <input
                      type="text"
                      id={`caracteristica${index}`}
                      value={caracteristica}
                      onChange={(e) =>
                        setCaracteristicas([
                          ...caracteristicas.slice(0, index),
                          e.target.value,
                          ...caracteristicas.slice(index + 1),
                        ])
                      }
                      className={`${styles.input} ${styles.textInput}`}
                      required
                    />
                    <CaracButton
                      type="button"
                      onClick={() => handleRemoveCaracteristica(index)}
                      className={styles.removeButton}
                    >
                      Eliminar
                    </CaracButton>
                  </div>
                </div>
              ))}
              <div className={styles.inputContainer}>
                <label htmlFor="img_url" className={styles.label}>
                  URL de la Imagen:
                </label>
                <input
                  type="text"
                  id="img_url"
                  value={img_url}
                  onChange={(e) => setImgUrl(e.target.value)}
                  className={`${styles.input} ${styles.textInput}`}
                  required
                />
                {img_url && (
                  <img
                    src={img_url}
                    alt="Imagen proporcionada"
                    className={styles.imagePreview}
                  />
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductForm;
