import React, { useState, useEffect } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAdminListUser from "./useAdminListUser";
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
} from "./AdminListUser.style";
import EditUserForm from "./EditUserForm";
import { Dialog, DialogSurface, DialogTitle, DialogBody, DialogActions, DialogContent, Button } from "@fluentui/react-components";
import styled from "styled-components";

const SecondaryButton = styled(Button)`
  background-color: #f5e9fc;
  color: #795af6;

  &:hover {
    background-color: #795af6;
    color: white;
  }
`;

const PrimaryButton = styled(Button)`
  background-color: #f5e9fc;
  color: #795af6;

  &:hover {
    background-color: #795af6;
    color: white;
  }
`;

const AdminListUser = () => {
  const { data, isLoading, error } = useAdminListUser();
  const [datos, setDatos] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [usuarioActual, setUsuarioActual] = useState(null);
  const [usuarioAEliminar, setUsuarioAEliminar] = useState(null);

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

  const toggleEditModal = () => {
    setIsEditOpen(!isEditOpen);
  };

  const toggleDeleteModal = () => {
    setIsDeleteOpen(!isDeleteOpen);
  };

  const handleEditClick = (user) => {
    setUsuarioActual(user);
    toggleEditModal();
  };

  const handleRowClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleDeleteClick = (e, user) => {
    e.stopPropagation();
    setUsuarioAEliminar(user);
    toggleDeleteModal();
  };

  const confirmDelete = async () => {
    try {
      await deleteUser(usuarioAEliminar.id);
      setDatos((prevData) => prevData.filter((user) => user.id !== usuarioAEliminar.id));
      toast.success("Usuario eliminado correctamente");
    } catch (error) {
      toast.error("Error al eliminar el usuario");
    } finally {
      toggleDeleteModal();
    }
  };

  const handleUpdateUser = async (usuarioActualizado) => {
    try {
      await updateUser(usuarioActualizado);
      setDatos((prevDatos) => {
        return prevDatos.map((usuario) =>
          usuario.id === usuarioActualizado.id ? usuarioActualizado : usuario
        );
      });
      toggleEditModal();
      toast.success("Usuario actualizado correctamente");
    } catch (error) {
      toast.error("Error al actualizar el usuario");
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
              <ListRow onClick={() => handleRowClick(index)}>
                <ListCell>{usuario.id}</ListCell>
                <ListCell>{usuario.nombre}</ListCell>
                <ListCell>{usuario.apellido}</ListCell>
                <ListCell>{usuario.email}</ListCell>
                <ListCell>
                  <IconButton onClick={() => handleEditClick(usuario)}>
                    <AiFillEdit />
                  </IconButton>
                  <IconButton onClick={(e) => handleDeleteClick(e, usuario)}>
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

      <Dialog open={isEditOpen} onDismiss={toggleEditModal}>
        <DialogSurface style={{ width: '98%', padding: '15px 30px 15px 30px' }}>
          <DialogBody>
            <DialogTitle>Editar Usuario</DialogTitle>
            <DialogContent>
              <EditUserForm user={usuarioActual} onSave={handleUpdateUser} />
            </DialogContent>
            <DialogActions>
              <SecondaryButton onClick={toggleEditModal}>Cerrar</SecondaryButton>
              <PrimaryButton form="edit-user-form" type="submit">Guardar Cambios</PrimaryButton>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>

      <Dialog open={isDeleteOpen} onDismiss={toggleDeleteModal}>
        <DialogSurface style={{ width: '98%', padding: '15px 30px 15px 30px' }}>
          <DialogBody>
            <DialogTitle>Confirmar Eliminación</DialogTitle>
            <DialogContent>
              <p>¿Está seguro de que desea eliminar al usuario <strong>{usuarioAEliminar?.nombre}</strong>?</p>
            </DialogContent>
            <DialogActions>
              <SecondaryButton onClick={toggleDeleteModal}>Cancelar</SecondaryButton>
              <PrimaryButton onClick={confirmDelete}>Eliminar</PrimaryButton>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </ListContainer>
  );
};

export default AdminListUser;



