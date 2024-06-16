import { useState, useEffect } from 'react';
import styles from './RandomProductsList.module.css';
import PaginationProductCard from './PaginationProductCard';
import CategorySection from '../Categorias/CategorySection';
import { Spinner } from '@fluentui/react-components';
import { obtenerProductos } from '../../data/juegos'; // Asegúrate de que la ruta sea correcta

const RandomProductsList = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const filterByTypos = (arr, selectedCategories = []) => {
    if (selectedCategories.length === 0) {
      return arr;
    }
    return arr.filter((item) => selectedCategories.includes(item.tipo.title));
  };

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      const productos = await obtenerProductos();
      setAllProducts(productos);
      setFilteredProducts(filterByTypos(productos, selectedCategories));
    } catch (error) {
      console.error('Error al cargar productos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    setFilteredProducts(filterByTypos(allProducts, selectedCategories));
  }, [selectedCategories, allProducts]);

  const handleCategorySelect = (categories) => {
    setSelectedCategories(categories);
    setFilteredProducts(filterByTypos(allProducts, categories));
  };

  if (isLoading) {
    return (
      <div className={styles.spinnerContainer}>
        <Spinner appearance='primary' label={'Cargando Juegos...'} />
      </div>
    );
  }

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
