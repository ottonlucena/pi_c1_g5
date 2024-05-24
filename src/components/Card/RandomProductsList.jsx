import { useState, useEffect } from 'react';
import styles from "./RandomProductsList.module.css";
import PaginationProductCard from "./PaginationProductCard";
import CategorySection from '../Categorias/CategorySection';

const RandomProductsList = () => {
  const [randomProducts, setRandomProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/juegos');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setRandomProducts(data);
        setFilteredProducts(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const filterProducts = () => {
      if (selectedCategories.length === 0) {
        setFilteredProducts(randomProducts);
      } else {
        const filtered = randomProducts.filter(product => selectedCategories.includes(product.tipo));
        setFilteredProducts(filtered);
      }
    };

    filterProducts();
  }, [selectedCategories, randomProducts]);

  const handleCategorySelect = (categories) => {
    setSelectedCategories(categories);
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


