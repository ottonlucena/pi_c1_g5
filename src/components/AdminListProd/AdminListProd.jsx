import React, { useState } from 'react';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import {
  ListContainer,
  ListHeader,
  ListBody,
  ListRow,
  ListCell,
  AccordionContent,
  IconButton,
  DescriptionTitle,
} from './AdminListProd.style';
import { useAdminListProd } from './useAdminListProd';

const AdminListProd = () => {
  const {
    productos,
    handleSortNombre,
    handleSortAlquiler,
    handleEditClick,
    handleDeleteClick,
  } = useAdminListProd();
  const [openIndex, setOpenIndex] = useState(null);

  const handleRowClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <ListContainer>
      <ListHeader>
        <ListCell isId>ID</ListCell>
        <ListCell onClick={handleSortNombre} sortable>
          Nombre
        </ListCell>
        <ListCell isCantidad>Cantidad</ListCell>
        <ListCell onClick={handleSortAlquiler} sortable isAlquiler>
          Alquiler
        </ListCell>
        <ListCell>Acciones</ListCell>
      </ListHeader>
      <ListBody>
        {productos.map((producto, index) => (
          <React.Fragment key={producto.id}>
            <ListRow
              onClick={() => handleRowClick(index)}
              isOdd={index % 2 !== 0}
            >
              <ListCell isId>{producto.id}</ListCell>
              <ListCell>{producto.nombre}</ListCell>
              <ListCell isCantidad>{producto.cantidad}</ListCell>
              <ListCell isAlquiler>{producto.alquiler}</ListCell>
              <ListCell>
                <IconButton onClick={(e) => handleEditClick(e, producto.id)}>
                  <AiFillEdit />
                </IconButton>
                <IconButton onClick={(e) => handleDeleteClick(e, producto.id)}>
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
    </ListContainer>
  );
};

export default AdminListProd;
