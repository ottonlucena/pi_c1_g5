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
    const normalizedCategories = selectedCategories.map((cat) =>
      cat.toLowerCase()
    );

    return arr.filter((item) =>
      normalizedCategories.includes(item.tipo.title.toLowerCase())
    );
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/juegos');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setRandomProducts(getRandomProducts(data, 6));
        setFilteredProducts(filterByTypos(data));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchProducts();
  }, []);

  // useEffect(() => {
  //   const filterProducts = () => {
  //     if (selectedCategories.length === 0) {
  //       setFilteredProducts(randomProducts);
  //     } else {
  //       const filtered = randomProducts.filter((product) =>
  //         selectedCategories.includes(product.tipo.title)
  //       );
  //       setFilteredProducts(filtered);
  //     }
  //   };

  //   filterProducts();
  // }, [selectedCategories, randomProducts]);

  const handleCategorySelect = (categories) => {
    setSelectedCategories(categories);
    console.log('Categoria seleccionada:', selectedCategories);
    console.log(
      'Llamando filterByTipos',
      filterByTypos(filteredProducts, selectedCategories)
    );
    setFilteredProducts(filterByTypos(filteredProducts, selectedCategories));
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
