import React, { useState, useEffect } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify";
import useAdminListUser from "./useAdminListUser";
import "react-toastify/dist/ReactToastify.css";
import { deleteUser, updateUser } from "../../data/user";
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

const AdminListUser = () => {
  const { data, isLoading, error } = useAdminListUser();
  const [datos, setDatos] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    if (isLoading) {
      toast.info("Cargando...", { autoClose: false, toastId: "ToastyLoad" });
    } else {
      toast.dismiss("ToastyLoad");
    }
    if (error) {
      toast.error("Error al cargar los usuarios");
    }
    if (data) {
      setDatos(data);
    }
  }, [isLoading, error, data]);

  const handleRowClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleEditClick = async (e, user, propiedad) => {
    e.stopPropagation();
    const newValue = prompt(`Ingrese el nuevo valor para ${propiedad}:`, user[propiedad]);
    if (newValue !== null && newValue.trim() !== "") {
      try {
        const usuarioActualizado = { ...user, [propiedad]: newValue };
        await updateUser(user.id, usuarioActualizado);
        setDatos((prevData) =>
          prevData.map((us) => (us.id === user.id ? usuarioActualizado : us))
        );
        toast.success("Usuario actualizado correctamente");
      } catch (error) {
        toast.error("Error al actualizar el usuario");
      }
    }
  };

  const handleDeleteClick = async (e, id) => {
    e.stopPropagation();
    if (window.confirm("¿Está seguro de que desea eliminar el usuario?")) {
      try {
        await deleteUser(id);
        setDatos((prevData) => prevData.filter((user) => user.id !== id));
        toast.success("Usuario eliminado correctamente");
      } catch (error) {
        toast.error("Error al eliminar el usuario");
      }
    }
  };

  return (
    <ListContainer>
      <ListHeader>
        <ListCell>ID</ListCell>
        <ListCell>Nombre</ListCell>
        <ListCell>Apellido</ListCell>
        <ListCell>Email</ListCell>
        <ListCell>Acciones</ListCell>
      </ListHeader>
      <ListBody>
        {datos &&
          datos.map((usuario, index) => (
            <React.Fragment key={usuario.id}>
              <ListRow
                onClick={() => handleRowClick(index)}
                isOdd={index % 2 !== 0}
              >
                <ListCell>{usuario.id}</ListCell>
                <ListCell>{usuario.nombre}</ListCell>
                <ListCell>{usuario.apellido}</ListCell>
                <ListCell>{usuario.email}</ListCell>
                <ListCell>
                  <IconButton
                    onClick={(e) => handleEditClick(e, usuario, "nombre")}
                  >
                    <AiFillEdit />
                  </IconButton>
                  <IconButton
                    onClick={(e) => handleEditClick(e, usuario, "apellido")}
                  >
                    <AiFillEdit />
                  </IconButton>
                  <IconButton
                    onClick={(e) => handleDeleteClick(e, usuario.id)}
                  >
                    <AiFillDelete />
                  </IconButton>
                </ListCell>
              </ListRow>
              <AccordionContent isOpen={openIndex === index}>
                <DescriptionTitle>Detalles:</DescriptionTitle>
                <p>Email: {usuario.email}</p>
                <p>Teléfono: {usuario.telefono}</p>
                <p>Dirección: {usuario.direccion}</p>
                <p>Password: {usuario.password}</p>
              </AccordionContent>
            </React.Fragment>
          ))}
      </ListBody>
      <ToastContainer position="top-center" />
    </ListContainer>
  );
};

export default AdminListUser;

