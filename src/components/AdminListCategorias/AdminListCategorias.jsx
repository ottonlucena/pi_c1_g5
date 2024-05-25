import React, { useState, useEffect } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify";
/* import { LeerCategorias } from "../../data/dataService"; */
import useAdminListCategorias from "./useAdminListCategorias";
import "react-toastify/dist/ReactToastify.css";

import {
  ListContainer,
  ListHeader,
  ListBody,
  ListRow,
  ListCell,
  AccordionContent,
  IconButton,
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

  const [openIndex, setOpenIndex] = useState(null);

  const handleRowClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleEditClick = (e, id) => {
    e.stopPropagation();
    const newName = prompt("Ingrese el nuevo nombre de la categoría:");
    if (newName) {
      setDatos((prevData) =>
        prevData.map((categoria) =>
          categoria.id === id ? { ...categoria, nombre: newName } : categoria
        )
      );
    }
  };

  const handleDeleteClick = (e, id) => {
    e.stopPropagation();
    setDatos((prevData) => prevData.filter((categoria) => categoria.id !== id));
  };

  return (
    <ListContainer>
      <ListHeader>
        <ListCell>ID</ListCell>
        <ListCell>Nombre</ListCell>
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
                <ListCell>{categoria.nombre}</ListCell>
                <ListCell>
                  <IconButton onClick={(e) => handleEditClick(e, categoria.id)}>
                    <AiFillEdit />
                  </IconButton>

                  <IconButton
                    onClick={(e) => handleDeleteClick(e, categoria.id)}
                  >
                    <AiFillDelete />
                  </IconButton>
                </ListCell>
              </ListRow>
              <AccordionContent isOpen={openIndex === index}></AccordionContent>
            </React.Fragment>
          ))}
      </ListBody>
      <ToastContainer position="top-center" />
    </ListContainer>
  );
};

export default AdminListCategorias;
