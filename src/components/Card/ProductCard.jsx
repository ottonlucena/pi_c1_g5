
import { Link } from 'react-router-dom';
import styles from "./ProductCard.module.css";

const ProductCard = ({ product }) => {
  // Verificar si el producto está definido
  if (!product) {
    return <div>No hay información del producto</div>;
  }

  // Acceder a las propiedades del producto
  const { id, name, image } = product;

  return (
    <div className={styles.productCard}>
      <div className={styles.productImage}>
        <img src={image} alt={name} />
      </div>
      <div className={styles.productDetails}>
        <h3>{name}</h3>
        <Link to={`/detalle/${id}`} className={styles.detailButton}>Ver Detalle</Link>
      </div>
    </div>
  );
};

export default ProductCard;


