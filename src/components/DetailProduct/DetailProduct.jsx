import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styles from "./DetailProduct.module.css";
import { IoIosArrowBack } from 'react-icons/io';

const DetailProduct = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  // Simulación de datos de producto
  useEffect(() => {
    const simulateProductData = () => {
      // Simulamos la respuesta de la API
      const simulatedProduct = {
        id: id,
        name: "Producto de Ejemplo",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing eliam lobortis odio id urna scelerisque, quis tristique magna fringilla.",
        image: "https://via.placeholder.com/400", // Placeholder URL para la imagen
      };
      setProduct(simulatedProduct);
    };

    simulateProductData();
  }, [id]);

  return (
    <div className={styles.detailContainer}>
      <div className={styles.productHeader}>
        <h1 className={styles.productTitle}>{product && product.name}</h1> {/* Alineado a la izquierda */}
        <Link to="/" className={styles.goBack}> {/* Enlace para volver atrás alineado a la derecha */}
        <IoIosArrowBack color="white" size={40} />
        </Link>
      </div>
      <div className={styles.productBody}>
        <p>{product && product.description}</p> {/* Texto descriptivo del producto */}
        <img src={product && product.image} alt={product && product.name} /> {/* Imagen del producto */}
      </div>
        <button>Ver mas</button>
    </div>
  );
};

export default DetailProduct;