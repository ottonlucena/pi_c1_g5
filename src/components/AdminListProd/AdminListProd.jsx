import React, { useState, useEffect } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify";
import {
  ListContainer,
  ListHeader,
  ListBody,
  ListRow,
  ListCell,
  AccordionContent,
  IconButton,
  DescriptionTitle,
} from "./AdminListProd.style";
import useAdminListProd from "./useAdminListProd";
import { eliminarProducto, actualizarProducto } from "../../data/juegos";

const AdminListProd = () => {
  const [datos, setDatos] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const { data, isLoading, error } = useAdminListProd();

  useEffect(() => {
    if (isLoading) {
      toast.info("Cargando...", { autoClose: false, toastId: "ToastyLoad" });
    } else {
      toast.dismiss("ToastyLoad");
    }
    if (error) {
      toast.error("Error al cargar la data");
    }
    if (data) {
      setDatos(data);
    }
  }, [isLoading, error, data]);

  const handleEditClick = async (e, producto, propiedad) => {
    e.stopPropagation();
    const newValue = prompt(`Ingrese el nuevo valor para ${propiedad}:`);
    if (newValue !== null) {
      try {
        // Crear una copia del producto actualizado
        let updatedProduct = { ...producto };
  
        // Actualizar la propiedad correspondiente
        if (propiedad.startsWith("tipo.")) {
          const subProp = propiedad.split(".")[1];
          updatedProduct = {
            ...updatedProduct,
            tipo: {
              ...updatedProduct.tipo,
              [subProp]: newValue
            }
          };
        } else {
          updatedProduct[propiedad] = newValue;
        }
        
        // Actualizar el producto en el servidor
        await actualizarProducto(updatedProduct);
  
        // Actualizar el estado local con el producto actualizado
        setDatos((prevData) =>
          prevData.map((prod) =>
            prod.id === producto.id ? updatedProduct : prod
          )
        );
  
        toast.success("Producto actualizado correctamente");
      } catch (error) {
        console.error("Error al actualizar el producto:", error.message);
        toast.error("Error al actualizar el producto.");
      }
    }
  };
  
  const handleRowClick = (index) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  const handleDeleteClick = async (e, id) => {
    e.stopPropagation();
    if (window.confirm("¿Estás seguro de que deseas eliminar este juego?")) {
      try {
        await eliminarProducto(id);
        setDatos((prevData) =>
          prevData.filter((producto) => producto.id !== id)
        );
        toast.success("Producto eliminado correctamente");
      } catch (error) {
        console.error("Error al eliminar el producto:", error.message);
        toast.error("Error al eliminar el producto.");
      }
    }
  };

  return (
    <ListContainer>
      <ListHeader>
        <ListCell>ID</ListCell>
        <ListCell>Nombre</ListCell>
        <ListCell>Largo (Metros)</ListCell>
        <ListCell>Valor Arriendo</ListCell>
        <ListCell>Capacidad</ListCell>
        <ListCell>Altura</ListCell>
        <ListCell>Ancho</ListCell>
        <ListCell>Cantidad</ListCell>
        <ListCell>Categoria</ListCell>
        <ListCell>Imagen</ListCell>
        <ListCell>Acciones</ListCell>
      </ListHeader>
      <ListBody>
        {datos &&
          datos.map((producto, index) => (
            <React.Fragment key={producto.id}>
              <ListRow
                onClick={() => handleRowClick(index)}
                isOdd={index % 2 !== 0}
              >
                <ListCell>{producto.id}</ListCell>
                <ListCell>{producto.nombre}</ListCell>
                <ListCell>{producto.largo}</ListCell>
                <ListCell>{producto.valorArriendo}</ListCell>
                <ListCell>{producto.capacidad}</ListCell>
                <ListCell>{producto.altura}</ListCell>
                <ListCell>{producto.ancho}</ListCell>
                <ListCell>{producto.cantidad}</ListCell>
                <ListCell>{producto.tipo?.title || "N/A"}</ListCell>
                <ListCell
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={producto.img_url}
                    alt="imagen"
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                    }}
                  />
                </ListCell>

                <ListCell>
                  <IconButton
                    onClick={(e) => handleEditClick(e, producto, "nombre")}
                  >
                    <AiFillEdit />
                  </IconButton>
                  <IconButton
                    onClick={(e) => handleEditClick(e, producto, "tipo.title")}
                  >
                    <AiFillEdit />
                  </IconButton>
                  <IconButton
                    onClick={(e) => handleDeleteClick(e, producto.id)}
                  >
                    <AiFillDelete />
                  </IconButton>
                </ListCell>
              </ListRow>
              <AccordionContent isOpen={openIndex === index}>
                <DescriptionTitle>Descripción:</DescriptionTitle>
                <p>{producto.descripcion}</p>
              </AccordionContent>
            </React.Fragment>
          ))}
      </ListBody>
      <ToastContainer position="top-center" />
    </ListContainer>
  );
};

export default AdminListProd;
