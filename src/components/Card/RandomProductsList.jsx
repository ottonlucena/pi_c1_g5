import { useState, useEffect } from 'react';
import styles from "./RandomProductsList.module.css";
import PaginationProductCard from "./PaginationProductCard";
import CategorySection from '../Categorias/CategorySection';

const RandomProductsList = () => {
  const [randomProducts, setRandomProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    const exampleProducts = [
      { id: 1, name: "Producto 1", image: "../../Documents/assets/celebrations.jpeg", category: "Celebraciones" },
      { id: 2, name: "Producto 2", image: "../../Documents/assets/castilloinflable2.jpeg", category: "Inflables y Castillos" },
      { id: 3, name: "Producto 3", image: "../../Documents/assets/castilloinflable3.jpeg", category: "Inflables y Castillos" },
      { id: 4, name: "Producto 4", image: "../../Documents/assets/castilloinflable4.jpeg", category: "Juegos de Agua" },
      { id: 5, name: "Producto 5", image: "../../Documents/assets/castilloinflable1.jpeg", category: "Inflables y Castillos" },
      { id: 6, name: "Producto 6", image: "../../Documents/assets/centrodejuegos.jpeg", category: "Juegos de Destreza" },
      { id: 7, name: "Producto 7", image: "../../Documents/assets/jengaGiant.jpeg", category: "Juegos de Destreza" },
      { id: 8, name: "Producto 8", image: "../../Documents/assets/juegoinfantil1.jpeg", category: "Niños Pequeños" },
      { id: 9, name: "Producto 9", image: "../../Documents/assets/paintball.jpeg", category: "Juegos Mecánicos" },
      { id: 10, name: "Producto 10", image: "../../Documents/assets/soccertable.jpeg", category: "Juegos Mecánicos" },
      { id: 11, name: "Producto 11", image: "../../Documents/assets/poolgames.jpeg", category: "Juegos de Agua" },
    ];

    setRandomProducts(exampleProducts);
    setFilteredProducts(exampleProducts);
  }, []);

  useEffect(() => {
    if (selectedCategories.length === 0) {
      setFilteredProducts(randomProducts);
    } else {
      const filtered = randomProducts.filter(product => selectedCategories.includes(product.category));
      setFilteredProducts(filtered);
    }
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