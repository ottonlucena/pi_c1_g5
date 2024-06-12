import { useState, useEffect } from 'react';
import styles from './RandomProductsList.module.css';
import PaginationProductCard from './PaginationProductCard';
import CategorySection from '../Categorias/CategorySection';
import { useQuery } from 'react-query';
import { Spinner } from '@fluentui/react-components';

const RandomProductsList = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const filterByTypos = (arr, selectedCategories = []) => {
    if (selectedCategories.length === 0) {
      return arr;
    }
    return arr.filter((item) => selectedCategories.includes(item.tipo.title));
  };

  const { data, error, isFetching } = useQuery('productos', fetchProducts);

  useEffect(() => {
    if (data) {
      setAllProducts(data);
      setFilteredProducts(filterByTypos(data, selectedCategories));
    }
  }, [data, selectedCategories]);

  async function fetchProducts() {
    const response = await fetch('http://localhost:8080/api/juegos');
    if (!response.ok) {
      throw new Error('No hay conexión');
    }
    return response.json();
  }

  if (isFetching) {
    return (
      <div className={styles.spinnerContainer}>
        <Spinner appearance='primary' label={'Cargando Juegos...'} />
      </div>
    );
  }

  if (error) return 'Ha ocurrido un error: ' + error.message;

  const handleCategorySelect = (categories) => {
    setSelectedCategories(categories);
    setFilteredProducts(filterByTypos(allProducts, categories));
  };

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
