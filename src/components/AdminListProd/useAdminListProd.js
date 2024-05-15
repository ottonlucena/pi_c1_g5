import { useState } from 'react';
import useProductosStore from './ProductosStore';

export const useAdminListProd = () => {
  const storeData = useProductosStore((state) => state);
  const { productos, sortProductos, eliminarProducto } = storeData;

  const [ordenNombre, setOrdenNombre] = useState('asc');
  const [ordenAlquiler, setOrdenAlquiler] = useState('asc');

  const handleSortNombre = () => {
    setOrdenNombre((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    sortProductos('nombre', ordenNombre === 'asc' ? 'desc' : 'asc');
  };

  const handleSortAlquiler = () => {
    setOrdenAlquiler((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    sortProductos('alquiler', ordenAlquiler === 'asc' ? 'desc' : 'asc');
  };

  const handleEditClick = (e, id) => {
    e.stopPropagation();
    alert(`Edit button clicked for product ID: ${id}`);
  };

  const handleDeleteClick = (e, id) => {
    e.stopPropagation();
    eliminarProducto(id);
  };

  return {
    productos,
    handleSortNombre,
    handleSortAlquiler,
    handleEditClick,
    handleDeleteClick,
  };
};
