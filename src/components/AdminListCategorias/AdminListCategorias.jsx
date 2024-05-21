import React, { useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import {
  ListContainer,
  ListHeader,
  ListBody,
  ListRow,
  ListCell,
  AccordionContent,
  IconButton,
  DescriptionTitle,
} from './AdminListCategorias.style';
import { useAdminListCategorias } from './useAdminListCategorias';

const AdminListCategorias = () => {
  const { categorias, handleDeleteClick } = useAdminListCategorias();
  const [openIndex, setOpenIndex] = useState(null);

  const handleRowClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <ListContainer>
      <ListHeader>
        <ListCell>ID</ListCell>
        <ListCell>Título</ListCell>
        <ListCell>Acciones</ListCell>
      </ListHeader>
      <ListBody>
        {categorias.map((categoria, index) => (
          <React.Fragment key={index}>
            <ListRow
              onClick={() => handleRowClick(index)}
              isOdd={index % 2 !== 0}
            >
              <ListCell>{index + 1}</ListCell>
              <ListCell>{categoria.titulo}</ListCell>
              <ListCell>
                <IconButton onClick={(e) => handleDeleteClick(e, index)}>
                  <AiFillDelete />
                </IconButton>
              </ListCell>
            </ListRow>
            <AccordionContent isOpen={openIndex === index}>
              <DescriptionTitle>Descripción:</DescriptionTitle>
              <p>{categoria.descripcion}</p>
              {categoria.imagen && <img src={categoria.imagen} alt={categoria.titulo} />}
            </AccordionContent>
          </React.Fragment>
        ))}
      </ListBody>
    </ListContainer>
  );
};

export default AdminListCategorias;
