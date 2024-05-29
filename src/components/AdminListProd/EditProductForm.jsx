
  
  /* // Importaciones necesarias
  import { useState } from "react";
  import { toast } from "react-toastify";
  import { actualizarProducto } from "../../data/juegos";
  import styles from "./EditProductForm.module.css";
  
  const EditProductForm = ({ producto, onCancel, onSave }) => {
    const [formData, setFormData] = useState({ ...producto });
    const [nuevaCaracteristica, setNuevaCaracteristica] = useState("");
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleCaracteristicaChange = (e, index) => {
      const newCaracteristicas = [...formData.caracteristicas];
      newCaracteristicas[index] = e.target.value;
      setFormData((prev) => ({ ...prev, caracteristicas: newCaracteristicas }));
    };
  
    const handleAddCaracteristica = () => {
      if (nuevaCaracteristica.trim()) {
        setFormData((prev) => ({
          ...prev,
          caracteristicas: [...prev.caracteristicas, nuevaCaracteristica.trim()],
        }));
        setNuevaCaracteristica("");
      }
    };
  
    const handleRemoveCaracteristica = (index) => {
      const newCaracteristicas = formData.caracteristicas.filter((_, i) => i !== index);
      setFormData((prev) => ({ ...prev, caracteristicas: newCaracteristicas }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await actualizarProducto(formData.id, formData);
        toast.success("Producto actualizado exitosamente.");
        onSave(formData); // Llamada a onSave después de una actualización exitosa
      } catch (error) {
        console.error("Error al actualizar el producto:", error.message);
        toast.error("Error al actualizar el producto.");
      }
    };
  
    return (
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <div className={styles.section1}>
          <div>
            <label>Nombre:</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Descripción:</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Largo:</label>
            <input
              type="number"
              name="largo"
              value={formData.largo}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Ancho:</label>
            <input
              type="number"
              name="ancho"
              value={formData.ancho}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Altura:</label>
            <input
              type="number"
              name="altura"
              value={formData.altura}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Capacidad:</label>
            <input
              type="number"
              name="capacidad"
              value={formData.capacidad}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Valor Arriendo:</label>
            <input
              type="number"
              name="valorArriendo"
              value={formData.valorArriendo}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Cantidad:</label>
            <input
              type="number"
              name="cantidad"
              value={formData.cantidad}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={styles.section2}>
          <div>
            <label>Imagen URL:</label>
            <input
              type="text"
              name="img_url"
              value={formData.img_url}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Tipo:</label>
            <input
              type="text"
              name="tipo"
              value={formData.tipo?.nombre || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  tipo: { ...prev.tipo, nombre: e.target.value },
                }))
              }
            />
          </div>
          <div>
            <label>Características:</label>
            {formData.caracteristicas.map((caracteristica, index) => (
              <div key={index}>
                <input
                  type="text"
                  value={caracteristica}
                  onChange={(e) => handleCaracteristicaChange(e, index)}
                />
                <button type="button" onClick={() => handleRemoveCaracteristica(index)}>
                  Eliminar
                </button>
              </div>
            ))}
            <input
              type="text"
              value={nuevaCaracteristica}
              onChange={(e) => setNuevaCaracteristica(e.target.value)}
              placeholder="Añadir nueva característica"
            />
            <button type="button" onClick={handleAddCaracteristica}>
              Añadir
            </button>
          </div>
          <button type="submit">Guardar</button>
          <button type="button" onClick={onCancel}>Cancelar</button>
        </div>
      </form>
    );
  };
  
  export default EditProductForm; */
  


