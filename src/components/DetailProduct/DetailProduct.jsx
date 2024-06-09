import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styles from "./DetailProduct.module.css";
import { IoIosArrowBack } from "react-icons/io";
import Modal from "../Modal/Modal";
import GalleryImgs from "../GalleryImgs/GalleryImgs";
import useModalStore from "../Modal/useModalStore";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaCircle } from "react-icons/fa";

import { obtenerProductoPorId } from "../../data/juegos";

export const MoreButton = styled.button`
  margin-top: 15%;
  padding: 10px 20px;
  background-color: #795af6;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  @media (min-width: 769px) {
    bottom: -60px;
    right: 0;
  }

  @media (max-width: 768px) {
    position: static;
    margin: 20px auto 0;
  }
`;

const DetailProduct = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const { isModalOpen, openModal, closeModal } = useModalStore();

  useEffect(() => {
    const getProduct = async () => {
      try {
        toast.info("Cargando producto...", {
          autoClose: false,
          toastId: "ToastyLoad",
        });
        const data = await obtenerProductoPorId(id);
        setProduct(data);
        toast.dismiss("ToastyLoad");
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Error al cargar el producto");
      }
    };

    getProduct();
  }, [id]);

  return (
    <div className={styles.detailContainer}>
      <div className={styles.productHeader}>
        <h1 className={styles.productTitle}>{product && product.nombre}</h1>
        <Link to="/" className={styles.goBack}>
          <IoIosArrowBack color="white" size={40} />
        </Link>
      </div>
      <div className={styles.productBody}>
        <div className={styles.productDescription}>
          <p>{product && product.descripcion}</p>
          <MoreButton onClick={openModal}>Ver más</MoreButton>
        </div>
        <div className={styles.productImage}>
          <img
            src={product && product.img_url}
            alt={product && product.nombre}
          />
        </div>
      </div>
      <h2 className={styles.caractTitle}>Caracteristicas</h2>
      <div className={styles.contCarac}>
        <div className={styles.productCharacteristics}>
          {product &&
            product.caracteristicas &&
            product.caracteristicas.map((caracteristica, index) => (
              <div key={index} className={styles.characteristic}>
                <div className={styles.characteristicItem}>
                  <FaCircle color="#f5e9fc" size={10} />
                  <p>{caracteristica.nombre}</p>
                </div>
              </div>
            ))}
        </div>
      </div>

      <Modal>
        <GalleryImgs />
      </Modal>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default DetailProduct;
