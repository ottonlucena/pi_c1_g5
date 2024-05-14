import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styles from "./DetailProduct.module.css";
import { IoIosArrowBack } from 'react-icons/io';

const DetailProduct = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  // Simulación de datos de producto
  useEffect(() => {
    // Definición del array dentro del callback de useEffect
    const exampleProducts = [
      { id: 1, name: "Producto 1", description: "Descripción del producto 1fsdfdsfdfdf", image: "../../Documents/assets/celebrations.jpeg" },
      { id: 2, name: "Producto 2", description: "Descripción del producto 2", image: "../../Documents/assets/castilloinflable2.jpeg" },
      { id: 3, name: "Producto 3", description: "Descripción del producto 3sdcdcdcdcd", image: "../../Documents/assets/castilloinflable3.jpeg" },
      { id: 4, name: "Producto 4", description: "Descripción del producto 4", image: "../../Documents/assets/castilloinflable4.jpeg" },
      { id: 5, name: "Producto 5", description: "Descripción del producto 5", image: "../../Documents/assets/castilloinflable1.jpeg" },
      { id: 6, name: "Producto 6", description: "Descripción del producto 6", image: "../../Documents/assets/centrodejuegos.jpeg" },
      { id: 7, name: "Producto 7", description: "Descripción del producto 7", image: "../../Documents/assets/jengaGiant.jpeg" },
      { id: 8, name: "Producto 8", description: "Descripción del producto 8", image: "../../Documents/assets/juegoinfantil1.jpeg" },
      { id: 9, name: "Producto 9", description: "Descripción del producto 9", image: "../../Documents/assets/paintball.jpeg" },
      { id: 10, name: "Producto 10", description: "Descripción del producto 10", image: "../../Documents/assets/soccertable.jpeg" },
      { id: 11, name: "Producto 11", description: "Descripción del producto 11", image: "../../Documents/assets/poolgames.jpeg" },
      // Más productos...
    ];

    const selectedProduct = exampleProducts.find(item => item.id === parseInt(id));
    setProduct(selectedProduct);
  }, [id]); // Solo depende del id

  return (
    <div className={styles.detailContainer}>
      <div className={styles.productHeader}>
        <h1 className={styles.productTitle}>{product && product.name}</h1>
        <Link to="/" className={styles.goBack}>
          <IoIosArrowBack color="white" size={40} />
        </Link>
      </div>
      <div className={styles.productBody}>
        <div className={styles.productDescription}>
          <p>{product && product.description}</p>
        </div>
        <div className={styles.productImage}>
          <img src={product && product.image} alt={product && product.name} />
        </div>
      </div>
      <button className={styles.viewMoreButton}>Ver más</button>
    </div>
  );
};

export default DetailProduct;


