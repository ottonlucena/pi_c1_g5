import { useState, useEffect } from 'react';
import styles from './RandomProductsList.module.css';
import PaginationProductCard from './PaginationProductCard';
import CategorySection from '../Categorias/CategorySection';

const RandomProductsList = () => {
  const [randomProducts, setRandomProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const getRandomProducts = (products, count) => {
    const shuffled = products.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

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
        setRandomProducts(getRandomProducts(data, 6));
        setFilteredProducts(filterByTypos(data, selectedCategories));
      } catch (error) {
        console.error('No se pueden obtener datos:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    setFilteredProducts(filterByTypos(randomProducts, selectedCategories));
  }, [selectedCategories, randomProducts]);

  const handleCategorySelect = (categories) => {
    setSelectedCategories(categories);
    console.log('Categoria seleccionada:', categories);
    console.log('Llamando filterByTypos', filterByTypos(randomProducts, categories));
    setFilteredProducts(filterByTypos(randomProducts, categories));
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
