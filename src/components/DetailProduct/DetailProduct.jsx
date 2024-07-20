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
import useDetailProduct from "./useDetailProduct";
import { Spinner } from "@fluentui/react-components";
import Rating from "../Rating/Rating";
import Politicas from "../Politicas/Politicas";
import usePoliticasStore from "../Politicas/usePoliticasStore";
import Scheduler from "../Calendar/Scheduler";

export const Button = styled.button`
  margin-top: 15%;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export const MoreButton = styled(Button)`
  background-color: #795af6;
  color: #fff;
`;

export const PoliticasButton = styled(Button)`
  background-color: orange;
  color: #fff;
  margin-left: 5px;
`;

const DetailProduct = () => {
  const { id } = useParams();
  const { isModalOpen, openModal, closeModal } = useModalStore();
  const { isPoliticasOpen, openPoliticas, closePoliticas } =
    usePoliticasStore();
  const { data: product, isLoading, error } = useDetailProduct(id);
  const [politicas, setPoliticas] = useState([]);

  useEffect(() => {
    if (error) {
      toast.error("Error al cargar la data");
    }
    0;
  }, [error]);

  useEffect(() => {
    if (isPoliticasOpen) {
      fetch(
        `https://sunny-exploration-production.up.railway.app/api/politicas/juego/${id}`
      )
        .then((response) => response.json())
        .then((data) => setPoliticas(data))
        .catch((error) => {
          console.error("Error fetching politicas:", error);
          toast.error("Error al cargar las políticas");
        });
    }
  }, [isPoliticasOpen, id]);

  if (isLoading) {
    return (
      <div className={styles.spinnerContainer}>
        <Spinner appearance="primary" label="Cargando detalle..." />
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className={styles.detailContainer}>
      <div className={styles.productHeader}>
        <h1 className={styles.productTitle}>{product?.nombre}</h1>
        <Link to="/" className={styles.goBack}>
          <IoIosArrowBack color="white" size={40} />
        </Link>
      </div>
      <div className={styles.productBody}>
        <div className={styles.productDescription}>
          <p>{product?.descripcion}</p>
          <MoreButton onClick={openModal}>Ver más</MoreButton>
          <PoliticasButton onClick={openPoliticas}>
            Ver políticas
          </PoliticasButton>
        </div>
        <div className={styles.productImage}>
          <img src={product?.img_url} alt={product?.nombre} />
          <Rating
            promedioValoracion={product ? product.promedioValoracion : 0}
          />
        </div>
      </div>
      <Scheduler />
      <div className={styles.contCarac}>
        <div className={styles.productCharacteristics}>
          {product?.caracteristicas.map((caracteristica, index) => (
            <div key={index} className={styles.characteristic}>
              <div className={styles.characteristicItem}>
                <FaCircle color="#f5e9fc" size={10} />
                <p>{caracteristica.nombre}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Politicas>
        {politicas.length > 0 ? (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {politicas.map((politica, index) => (
              <div className="policy-column" key={index}>
                <h4>{politica.titulo}</h4>
                <div
                  dangerouslySetInnerHTML={{ __html: politica.descripcion }}
                />
              </div>
            ))}
          </div>
        ) : (
          "Cargando políticas..."
        )}
      </Politicas>
      <Modal>
        <GalleryImgs />
      </Modal>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default DetailProduct;
