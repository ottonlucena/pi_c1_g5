import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import styles from "./FeaturedProducts.module.css";

const FeaturedProducts = () => {
  const [randomProducts, setRandomProducts] = useState([]);

  // Función para cargar productos aleatorios
  const loadRandomProducts = () => {
    const exampleProducts = [
      {
        id: 1,
        name: "Producto 1",
        image: "../../Documents/assets/celebrations.jpeg",
      },
      {
        id: 2,
        name: "Producto 2",
        image: "../../Documents/assets/castilloinflable2.jpeg",
      },
      {
        id: 3,
        name: "Producto 3",
        image: "../../Documents/assets/castilloinflable3.jpeg",
      },
      {
        id: 4,
        name: "Producto 4",
        image: "../../Documents/assets/castilloinflable4.jpeg",
      },
      {
        id: 5,
        name: "Producto 5",
        image: "../../Documents/assets/castilloinflable1.jpeg",
      },
      {
        id: 6,
        name: "Producto 6",
        image: "../../Documents/assets/centrodejuegos.jpeg",
      },
      {
        id: 7,
        name: "Producto 7",
        image: "../../Documents/assets/jengaGiant.jpeg",
      },
      {
        id: 8,
        name: "Producto 8",
        image: "../../Documents/assets/juegoinfantil1.jpeg",
      },
      {
        id: 9,
        name: "Producto 9",
        image: "../../Documents/assets/paintball.jpeg",
      },
      {
        id: 10,
        name: "Producto 10",
        image: "../../Documents/assets/soccertable.jpeg",
      },
      {
        id: 11,
        name: "Producto 11",
        image: "../../Documents/assets/poolgames.jpeg",
      },
      // Más productos...
    ];

    const getRandomProducts = (products, count) => {
      const shuffledProducts = products.sort(() => 0.5 - Math.random());
      return shuffledProducts.slice(0, count);
    };

    setRandomProducts(getRandomProducts(exampleProducts, 3)); // Mostrar solo tres tarjetas
  };

  // Cargar productos aleatorios al montar el componente
  useEffect(() => {
    loadRandomProducts();
  }, []);

  // Función para manejar el clic en el botón "Explorar más"
  const handleLoadMoreClick = () => {
    loadRandomProducts(); // Cargar nuevos productos aleatorios
  };

  return (
    <div className={styles.featuredProducts}>
      <h2 className={styles.title1}>
        Productos destacados
        <FaStar className={styles.icon} />
      </h2>
      <div className={styles.productGrid}>
        <div className={styles.cardContainer}>
          {/* Renderizar las tarjetas */}
          {randomProducts.map((product, index) => (
            <div key={index} className={styles.productCard}>
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <Link to={`/detalle/${product.id}`}>
                <button className={styles.buttonContainer}>Ver Detalle</button>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <button className={styles.btnExplorar} onClick={handleLoadMoreClick}>
        Explorar más
      </button>
    </div>
  );
};

export default FeaturedProducts;
