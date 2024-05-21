import { useState, useEffect } from 'react';
import { leerCategorias } from '../../data/dataService';

export const useAdminListCategorias = () => {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    setCategorias(leerCategorias());
  }, []);

  const handleDeleteClick = (e, id) => {
    e.stopPropagation();
    const nuevasCategorias = categorias.filter((_, index) => index !== id);
    setCategorias(nuevasCategorias);
    localStorage.setItem('categorias', JSON.stringify(nuevasCategorias));
  };

  return {
    categorias,
    handleDeleteClick,
  };
};

