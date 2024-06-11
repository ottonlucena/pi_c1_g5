import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import styles from "./FeaturedProducts.module.css";
import { obtenerProductos } from "../../data/juegos";
import { Spinner } from "@fluentui/react-components";

const FeaturedProducts = () => {
  const [randomProducts, setRandomProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Función para cargar productos aleatorios desde el servicio
  const loadRandomProducts = async () => {
    try {
      setIsLoading(true);
      const exampleProducts = await obtenerProductos();
      const shuffledProducts = exampleProducts.sort(() => 0.5 - Math.random());
      setRandomProducts(shuffledProducts.slice(0, 3)); // Mostrar solo tres tarjetas
    } catch (error) {
      console.error("Error al cargar productos aleatorios:", error);
    } finally {
      setIsLoading(false);
    }
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
      {isLoading ? (
        <div className={styles.spinnerContainer}>
          <Spinner appearance="primary" label="Cargando Destacados..." />
        </div>
      ) : (
        <div className={styles.productGrid}>
          <div className={styles.cardContainer}>
            {/* Renderizar las tarjetas */}
            {randomProducts.map((product, index) => (
              <div key={index} className={styles.productCard}>
                <img src={product.img_url} alt={product.nombre} />
                <h3>{product.nombre}</h3>
                <Link to={`/detalle/${product.id}`}>
                  <button className={styles.buttonContainer}>Ver Detalle</button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
      <button className={styles.btnExplorar} onClick={handleLoadMoreClick}>
        Explorar más
      </button>
    </div>
  );
};

export default FeaturedProducts;


