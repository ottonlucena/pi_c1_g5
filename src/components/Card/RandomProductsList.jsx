import { useState, useEffect } from 'react';
import styles from './RandomProductsList.module.css';
import PaginationProductCard from './PaginationProductCard';
import CategorySection from '../Categorias/CategorySection';
import { Spinner } from '@fluentui/react-components';
import { obtenerProductos } from '../../data/juegos';

const RandomProductsList = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Función para filtrar productos por categorías seleccionadas
  const filterProductsByCategories = (productos, categories) => {
    if (categories.length === 0) {
      return productos; // Devuelve todos los productos si no hay categorías seleccionadas
    }
    return productos.filter((producto) =>
      categories.includes(producto.tipo.filtro)
    );
  };

  // Cargar productos al inicio
  const loadProducts = async () => {
    try {
      setIsLoading(true);
      const productos = await obtenerProductos();
      setAllProducts(productos);
      setFilteredProducts(
        filterProductsByCategories(productos, selectedCategories)
      );
    } catch (error) {
      console.error('Error al cargar productos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Cargar productos al montar el componente
  useEffect(() => {
    loadProducts();
  }, []);

  // Actualizar productos filtrados cuando cambian las categorías seleccionadas o los productos cargados
  useEffect(() => {
    setFilteredProducts(
      filterProductsByCategories(allProducts, selectedCategories)
    );
  }, [selectedCategories, allProducts]);

  // Manejar la selección de categorías desde CategorySection
  const handleCategorySelect = (categories) => {
    'Categorías recibidas de CategorySection:', categories;
    setSelectedCategories(categories);

    // Verificar si "Todos" está en las categorías seleccionadas
    if (categories.includes('Todos')) {
      setFilteredProducts(allProducts); // Mostrar todos los productos si se selecciona "Todos"
    } else {
      setFilteredProducts(filterProductsByCategories(allProducts, categories));
    }
  };

  // Mostrar spinner de carga si aún se están cargando los productos
  if (isLoading) {
    return (
      <div className={styles.spinnerContainer}>
        <Spinner appearance='primary' label={'Cargando Juegos...'} />
      </div>
    );
  }

  // Renderizar la lista de productos filtrados después de cargar
  return (
    <div>
      <CategorySection onCategoryClick={handleCategorySelect} />
      <div className={styles.randomProductsList}>
        <PaginationProductCard products={filteredProducts} itemsPerPage={6} />
      </div>
    </div>
  );
};

export default RandomProductsList;
