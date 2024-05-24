
import { Link } from 'react-router-dom';
import styles from "./ProductCard.module.css";

const ProductCard = ({ product }) => {
  // Verificar si el producto está definido
  if (!product) {
    return <div>No hay información del producto</div>;
  }

  // Acceder a las propiedades del producto
  const { id, nombre, img_url } = product;

  return (
    <div className={styles.productCard}>
      <div className={styles.productImage}>
        <img src={img_url} alt={nombre} />
      </div>
      <div className={styles.productDetails}>
        <h3>{nombre}</h3>
        <Link to={`/detalle/${id}`} className={styles.detailButton}>Ver Detalle</Link>
      </div>
    </div>
  );
};

export default ProductCard;


