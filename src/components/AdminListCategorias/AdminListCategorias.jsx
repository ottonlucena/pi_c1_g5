import React, { useState, useEffect } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify";
import useAdminListCategorias from "./useAdminListCategorias";
import "react-toastify/dist/ReactToastify.css";
import {
  actualizarCategoria,
  eliminarCategoriaPorNombre,
} from "../../data/dataService"; // Asegúrate de importar tus servicios aquí

import {
  ListContainer,
  ListHeader,
  ListBody,
  ListRow,
  ListCell,
  AccordionContent,
  IconButton,
  DescriptionTitle,
} from "./AdminListCategorias.style";

const AdminListCategorias = () => {
  const [datos, setDatos] = useState();
  const { data, isLoading, error } = useAdminListCategorias();

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

  const [openIndex, setOpenIndex] = useState(null);

  const handleRowClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleEditClick = async (e, categoria, propiedad) => {
    e.stopPropagation();
    console.log("Categoría pasada a handleEditClick:", categoria);
    console.log("Propiedad a actualizar:", propiedad);
    const newValue = prompt(`Ingrese el nuevo valor para ${propiedad}:`);
    if (newValue !== null) {
      try {
        const categoriaActualizada = { ...categoria, [propiedad]: newValue };
        await actualizarCategoria(categoria.title, categoriaActualizada); // Usamos el título en lugar del ID
        setDatos((prevData) =>
          prevData.map(
            (cat) =>
              cat.title === categoria.title ? { ...categoriaActualizada } : cat // Actualizamos solo la categoría con el título correspondiente
          )
        );
        toast.success("Categoría actualizada correctamente");
      } catch (error) {
        toast.error("Error al actualizar la categoría");
      }
    }
  };
  const handleDeleteClick = async (e, title) => {
    e.stopPropagation();
    if (window.confirm("¿Está seguro de que desea eliminar esta categoría?")) {
      try {
        await eliminarCategoriaPorNombre(title);
        setDatos((prevData) =>
          prevData.filter((categoria) => categoria.title !== title)
        );
        toast.success("Categoría eliminada correctamente");
      } catch (error) {
        toast.error("Error al eliminar la categoría");
      }
    }
  };

  return (
    <ListContainer>
      <ListHeader>
        <ListCell>ID</ListCell>
        <ListCell>Nombre</ListCell>
        <ListCell>Imagen</ListCell>
        <ListCell>Acciones</ListCell>
      </ListHeader>
      <ListBody>
        {datos &&
          datos.map((categoria, index) => (
            <React.Fragment key={categoria.id}>
              <ListRow
                onClick={() => handleRowClick(index)}
                isOdd={index % 2 !== 0}
              >
                <ListCell>{categoria.id}</ListCell>
                <ListCell>{categoria.title}</ListCell>
                <ListCell>
                  <img
                    src={categoria.img_url}
                    alt="imagen"
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                    }}
                  />
                </ListCell>
                <ListCell>
                  <IconButton
                    onClick={(e) => handleDeleteClick(e, categoria.title)}
                  >
                    <AiFillDelete />
                  </IconButton>
                  <IconButton
                    onClick={(e) =>
                      handleEditClick(e, categoria, "title")
                    }
                  >
                    <AiFillEdit />
                  </IconButton>
                  <IconButton
                    onClick={(e) =>
                      handleEditClick(e, categoria, "img_url")
                    }
                  >
                    <AiFillEdit />
                  </IconButton>
                </ListCell>
              </ListRow>
              <AccordionContent isOpen={openIndex === index}>
                <DescriptionTitle>Descripción:</DescriptionTitle>
                <p>{categoria.description}</p>
                <IconButton
                  onClick={(e) =>
                    handleEditClick(e, categoria, "description")
                  }
                >
                  <AiFillEdit />
                </IconButton>
              </AccordionContent>
            </React.Fragment>
          ))}
      </ListBody>
      <ToastContainer position="top-center" />
    </ListContainer>
  );
};

export default AdminListCategorias;
