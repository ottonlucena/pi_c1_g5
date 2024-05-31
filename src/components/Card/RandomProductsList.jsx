import { useState, useEffect } from 'react';
import styles from './RandomProductsList.module.css';
import PaginationProductCard from './PaginationProductCard';
import CategorySection from '../Categorias/CategorySection';

const RandomProductsList = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const filterByTypos = (arr, selectedCategories = []) => {
    if (selectedCategories.length === 0) {
      return arr;
    }
    return arr.filter((item) =>
      selectedCategories.includes(item.tipo.title)
    );
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/juegos');
        if (!response.ok) {
          throw new Error('No hay conexión');
        }
        const data = await response.json();
        setAllProducts(data);
        setFilteredProducts(filterByTypos(data, selectedCategories));
      } catch (error) {
        console.error('No se pueden obtener datos:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    setFilteredProducts(filterByTypos(allProducts, selectedCategories));
  }, [selectedCategories, allProducts]);

  const handleCategorySelect = (categories) => {
    setSelectedCategories(categories);
    setFilteredProducts(filterByTypos(allProducts, categories));
  };

  return (
    <div>
      <CategorySection onCategoryClick={handleCategorySelect} />
      <div className={styles.randomProductsList}>
        <PaginationProductCard
          products={filteredProducts}
          itemsPerPage={6}
        />
      </div>
    </div>
  );
};

export default RandomProductsList;