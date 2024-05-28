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
  const [datos, setDatos] = useState();
  const [editingProduct, setEditingProduct] = useState(null);
  const { data, isLoading, error } = useAdminListProd();

  useEffect(() => {
    if (isLoading) {
      toast.info("Cargando...", { autoClose: false, toastId: "ToastyLoad" });
    } else {
      toast.dismiss("ToastyLoad");
    }
    if (error) {
      toast.error("Error en al cargar la data");
    }
    if (data) {
      setDatos(data);
    }
  }, [isLoading, error, data]);

  /* useEffect(() => {
    const categoria = async () => {
      try {
        const fetchedData = await LeerCategorias();
        setData(fetchedData);
      } catch (error) {
        console.error("error", error);
        throw error;
      }
    };
    categoria();
  }, []); */

  const handleEditClick = (e, producto) => {
    e.stopPropagation();
    setEditingProduct(producto.id);
  };

  const handleSave = (updatedProduct) => {
    setDatos((prevData) =>
      prevData.map((producto) =>
        producto.id === updatedProduct.id ? updatedProduct : producto
      )
    );
    setEditingProduct(null);
  };

  const handleDeleteClick = async (e, id) => {
    e.stopPropagation();
    if (window.confirm("¿Estás seguro de que deseas eliminar este juego?")) {
      try {
        await eliminarProducto(id);
        setDatos((prevData) =>
          prevData.filter((producto) => producto.id !== id)
        );
      } catch (error) {
        console.error("Error al eliminar el producto:", error.message);
        toast.error("Error al eliminar el producto.");
      }
    }
  };

  const [openIndex, setOpenIndex] = useState(null);

  const handleRowClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
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
                  <IconButton onClick={(e) => handleEditClick(e, producto)}>
                    <AiFillEdit />
                  </IconButton>

                  <IconButton
                    onClick={(e) => handleDeleteClick(e, producto.id)}
                  >
                    <AiFillDelete />
                  </IconButton>
                </ListCell>
              </ListRow>
              <AccordionContent isOpen={openIndex === index || editingProduct === producto.id}>
              <DescriptionTitle>Descripción:</DescriptionTitle>
              <p>{producto.descripcion}</p>
              {editingProduct === producto.id && (
                <EditProductForm
                  producto={producto}
                  onCancel={() => setEditingProduct(null)}
                  onSave={handleSave}
                />
              )}
            </AccordionContent>
            </React.Fragment>
          ))}
      </ListBody>
      <ToastContainer position="top-center" />
    </ListContainer>
  );
};

export default AdminListProd;
