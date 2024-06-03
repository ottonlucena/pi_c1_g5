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
import { eliminarProducto } from "../../data/juegos";
import EditProductForm from "./EditProductForm";

const AdminListProd = () => {
  const [datos, setDatos] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [productoActual, setProductoActual] = useState(null);

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

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleEditClick = (producto) => {
    console.log("Editando producto:", producto);
    setProductoActual(producto);
    toggleModal();
  };

  const handleRowClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleDeleteClick = async (e, id) => {
    e.stopPropagation();
    console.log("Eliminando producto con ID:", id);
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
        <ListCell>Ancho (Metros)</ListCell>
        <ListCell>Altura (Metros)</ListCell>
        <ListCell>Capacidad</ListCell>
        <ListCell>Valor de Arriendo</ListCell>
        <ListCell>Cantidad</ListCell>
        <ListCell>Categoría</ListCell>
        <ListCell>Imagen</ListCell>
        <ListCell>Acciones</ListCell>
      </ListHeader>
      <ListBody>
        {datos &&
          datos.map((producto, index) => (
            <React.Fragment key={producto.id}>
              <ListRow onClick={() => handleRowClick(index)}>
                <ListCell>{producto.id}</ListCell>
                <ListCell>{producto.nombre}</ListCell>
                <ListCell>{producto.largo}</ListCell>
                <ListCell>{producto.ancho}</ListCell>
                <ListCell>{producto.altura}</ListCell>
                <ListCell>{producto.capacidad}</ListCell>
                <ListCell>{producto.valorArriendo}</ListCell>
                <ListCell>{producto.cantidad}</ListCell>
                <ListCell>{producto.tipo?.title || "N/A"}</ListCell>
                <ListCell>
                  <img
                    src={producto.img_url}
                    alt="imagen"
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                    }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "path_to_fallback_image";
                    }}
                  />
                </ListCell>

                <ListCell>
                  <IconButton onClick={() => handleEditClick(producto)}>
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
