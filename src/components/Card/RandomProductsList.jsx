import { useState, useEffect } from 'react';
import styles from "./RandomProductsList.module.css";
import PaginationProductCard from "./PaginationProductCard";


const RandomProductsList = () => {
  const [randomProducts, setRandomProducts] = useState([]);

  useEffect(() => {
    // Lógica para obtener productos aleatorios (cuando tengas la API)
    // Por ahora, usaremos datos de ejemplo
    const exampleProducts = [
      { id: 1, name: "Producto 1",  image: "../../Documents/assets/celebrations.jpeg" },
      { id: 2, name: "Producto 2",  image: "../../Documents/assets/castilloinflable2.jpeg" },
      { id: 3, name: "Producto 3",  image: "../../Documents/assets/castilloinflable3.jpeg" },
      { id: 4, name: "Producto 4",  image: "../../Documents/assets/castilloinflable4.jpeg" },
      { id: 5, name: "Producto 5",  image: "../../Documents/assets/castilloinflable1.jpeg" },
      { id: 6, name: "Producto 6",  image: "../../Documents/assets/centrodejuegos.jpeg" },
      { id: 7, name: "Producto 7",  image: "../../Documents/assets/jengaGiant.jpeg" },
      { id: 8, name: "Producto 8",  image: "../../Documents/assets/juegoinfantil1.jpeg" },
      { id: 9, name: "Producto 9",  image: "../../Documents/assets/paintball.jpeg" },
      { id: 10, name: "Producto 10",  image: "../../Documents/assets/soccertable.jpeg" },
      { id: 11, name: "Producto 11",  image: "../../Documents/assets/poolgames.jpeg" },
      // Más productos...
    ];

    // Obtener 10 productos aleatorios sin repetir
    const getRandomProducts = (products, count) => {
      const shuffledProducts = products.sort(() => 0.5 - Math.random());
      return shuffledProducts.slice(0, count);
    };

    setRandomProducts(getRandomProducts(exampleProducts, 10));
  }, []);

  return (
    <div className={styles.randomProductsList}>
    <PaginationProductCard products={randomProducts} itemsPerPage={6} />
  </div>
);
};

export default RandomProductsList;