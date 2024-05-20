import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styles from "./DetailProduct.module.css";
import { IoIosArrowBack } from "react-icons/io";
import Modal from "../Modal/Modal";
import GalleryImgs from "../GalleryImgs/GalleryImgs";
import useModalStore from "../Modal/useModalStore";
import styled from "styled-components";

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

  // Simulación de datos de producto
  useEffect(() => {
    // Definición del array dentro del callback de useEffect
    const exampleProducts = [
      { 
          id: 1, 
          nombre: "Cotillon", 
          descripcion: "Todo lo que necesitas para que tu fiesta sea inolvidable: disfraces, sombreros, serpentinas, y mucho más. Nuestro cotillón incluye una variedad de accesorios coloridos y divertidos que animarán cualquier celebración. Ideal para cumpleaños, bodas, aniversarios, y eventos corporativos. Transforma cualquier ambiente en una fiesta llena de alegría y diversión con nuestra selección de cotillón de alta calidad.",
          largo: 1.4,
          ancho: 2,
          altura: 2,
          capacidad: 20,
          valorArriendo: 2400,
          cantidad: 3,
          img_url: "../../Documents/assets/celebrations.jpeg",
          tipo: "NINOS",
          caracteristicas: [
              "Variedad de accesorios",
              "Colores vibrantes",
              "Perfecto para cualquier celebración",
              "Alta calidad",
              "Animación garantizada"
          ]
      },
      { 
          id: 2, 
          nombre: "Castillo Inflable",  
          descripcion: "Un castillo inflable ideal para mantener a los niños entretenidos durante horas. Este inflable cuenta con colores vivos y una estructura segura que permite a los niños saltar y jugar sin preocupaciones. Perfecto para fiestas infantiles, eventos escolares, y reuniones familiares. La construcción resistente garantiza que los niños puedan disfrutar de una diversión sin fin mientras los padres pueden relajarse sabiendo que sus hijos están en un entorno seguro.",
          largo: 1.4,
          ancho: 2,
          altura: 2,
          capacidad: 20,
          valorArriendo: 2400,
          cantidad: 3,
          img_url: "../../Documents/assets/castilloinflable2.jpeg",
          tipo: "INFLABLES",
          caracteristicas: [
              "Colores vivos",
              "Estructura segura",
              "Fácil de instalar",
              "Construcción resistente",
              "Ideal para niños"
          ]
      },
      { 
          id: 3, 
          nombre: "Castillo Inflable",  
          descripcion: "Este castillo inflable es espacioso y seguro, diseñado para proporcionar diversión y risas en cualquier evento. Con una amplia área de salto y paredes laterales altas, es perfecto para grupos grandes de niños. Su diseño atractivo y colorido atraerá a los más pequeños y les proporcionará una experiencia inolvidable. Ideal para alquiler en cumpleaños, ferias, y festivales. Asegúrate de que tu evento sea recordado por todos con este increíble castillo inflable.",
          largo: 1.4,
          ancho: 2,
          altura: 2,
          capacidad: 20,
          valorArriendo: 2400,
          cantidad: 3,
          img_url: "../../Documents/assets/castilloinflable3.jpeg",
          tipo: "INFLABLES",
          caracteristicas: [
              "Área de salto amplia",
              "Paredes laterales altas",
              "Diseño atractivo",
              "Ideal para grupos grandes",
              "Perfecto para eventos"
          ]
      },
      { 
          id: 4, 
          nombre: "Castillo Inflable",  
          descripcion: "El castillo inflable perfecto para fiestas, con colores vibrantes y una estructura robusta que garantiza horas de diversión. Este inflable es fácil de instalar y ofrece una zona de juego segura y divertida para los niños. Sus materiales de alta calidad aseguran durabilidad y resistencia, haciendo que sea una opción ideal para cualquier tipo de evento al aire libre. Proporciona entretenimiento sin fin y crea momentos memorables para los más pequeños.",
          largo: 1.4,
          ancho: 2,
          altura: 2,
          capacidad: 20,
          valorArriendo: 2400,
          cantidad: 3,
          img_url: "../../Documents/assets/castilloinflable4.jpeg",
          tipo: "INFLABLES",
          caracteristicas: [
              "Colores vibrantes",
              "Estructura robusta",
              "Fácil de instalar",
              "Materiales de alta calidad",
              "Seguridad garantizada"
          ]
      },
      { 
          id: 5, 
          nombre: "Castillo Inflable",  
          descripcion: "Un divertido castillo inflable que ofrece una experiencia única de saltos y juegos, ideal para cualquier reunión infantil. Con una superficie amplia y paredes acolchadas, este castillo proporciona un entorno seguro para que los niños puedan saltar y jugar a su antojo. Su diseño atractivo y resistente lo convierte en la pieza central perfecta para cualquier evento infantil, asegurando que todos los niños se diviertan de manera segura y supervisada.",
          largo: 1.4,
          ancho: 2,
          altura: 2,
          capacidad: 20,
          valorArriendo: 2400,
          cantidad: 3,
          img_url: "../../Documents/assets/castilloinflable1.jpeg",
          tipo: "INFLABLES",
          caracteristicas: [
              "Superficie amplia",
              "Paredes acolchadas",
              "Entorno seguro",
              "Diseño resistente",
              "Ideal para reuniones infantiles"
          ]
      },
      { 
          id: 6, 
          nombre: "Centro de Juegos",  
          descripcion: "Un centro de juegos completo con actividades para niños de todas las edades. Este centro de juegos incluye una variedad de estructuras y juegos que mantendrán a los niños activos y entretenidos durante horas. Con zonas de escalada, toboganes, y áreas de juego interactivo, es perfecto para fiestas, eventos escolares, y reuniones familiares. Fomenta la actividad física y el juego creativo en un entorno seguro y controlado, proporcionando diversión para todos.",
          largo: 1.4,
          ancho: 2,
          altura: 2,
          capacidad: 20,
          valorArriendo: 2400,
          cantidad: 3,
          img_url: "../../Documents/assets/centrodejuegos.jpeg",
          tipo: "INFLABLES",
          caracteristicas: [
              "Actividades variadas",
              "Zonas de escalada",
              "Toboganes incluidos",
              "Juego interactivo",
              "Fomenta la actividad física"
          ]
      },
      { 
          id: 7, 
          nombre: "Jenga Gigante",  
          descripcion: "El clásico juego de Jenga en una versión gigante. Desafía a tus amigos y familiares a construir la torre más alta sin que se caiga. Este Jenga gigante es perfecto para exteriores e interiores, y es ideal para fiestas, barbacoas, y eventos corporativos. Hecho de madera de alta calidad, garantiza durabilidad y diversión para todos. Perfecto para desarrollar habilidades de concentración y destreza mientras se disfruta de un buen rato en compañía.",
          largo: 1.4,
          ancho: 2,
          altura: 2,
          capacidad: 20,
          valorArriendo: 2400,
          cantidad: 3,
          img_url: "../../Documents/assets/jengaGiant.jpeg",
          tipo: "DESTREZA",
          caracteristicas: [
              "Versión gigante",
              "Ideal para exteriores e interiores",
              "Hecho de madera",
              "Desarrolla concentración",
              "Diversión asegurada"
          ]
      },
      { 
          id: 8, 
          nombre: "Soga de Fuerza",  
          descripcion: "Un emocionante juego de soga de fuerza que pondrá a prueba la resistencia y el trabajo en equipo de todos los participantes. Este juego es ideal para eventos al aire libre, fiestas infantiles, y competencias deportivas. Incluye una soga resistente y de alta calidad, diseñada para soportar la fuerza y la tensión de múltiples jugadores. Fomenta la cooperación y el espíritu de equipo mientras se disfruta de una actividad divertida y desafiante.",
          largo: 1.4,
          ancho: 2,
          altura: 2,
          capacidad: 20,
          valorArriendo: 2400,
          cantidad: 3,
          img_url: "../../Documents/assets/juegoinfantil1.jpeg",
          tipo: "DESTREZA",
          caracteristicas: [
              "Resistencia y trabajo en equipo",
              "Ideal para exteriores",
              "Soga de alta calidad",
              "Soporta múltiples jugadores",
              "Fomenta la cooperación"
          ]
      },
      { 
          id: 9, 
          nombre: "Paintball",  
          descripcion: "La actividad perfecta para los amantes de la adrenalina. Disfruta de un emocionante juego de paintball con tus amigos. Equipado con pistolas de paintball de alta precisión y protecciones completas, este juego es ideal para eventos de team building, cumpleaños, y reuniones de amigos. Proporciona una experiencia intensa y llena de acción, donde la estrategia y la velocidad son clave para ganar. Asegura horas de diversión y competición sana en un entorno seguro.",
          largo: 1.4,
          ancho: 2,
          altura: 2,
          capacidad: 20,
          valorArriendo: 2400,
          cantidad: 3,
          img_url: "../../Documents/assets/paintball.jpeg",
          tipo: "DESTREZA",
          caracteristicas: [
              "Alta adrenalina",
              "Equipamiento completo",
              "Ideal para team building",
              "Experiencia intensa",
              "Estrategia y velocidad"
          ]
      },
      { 
          id: 10, 
          nombre: "Metegol",  
          descripcion: "Un clásico juego de metegol que garantiza diversión y competencia en cualquier reunión o evento social. Este metegol está diseñado con materiales duraderos y una construcción robusta para soportar juegos intensos. Ideal para fiestas, bares, y eventos familiares. Promueve la interacción y la diversión entre los jugadores, proporcionando horas de entretenimiento. Perfecto para todas las edades, desde niños hasta adultos, que disfruten de un buen desafío.",
          largo: 1.4,
          ancho: 2,
          altura: 2,
          capacidad: 20,
          valorArriendo: 2400,
          cantidad: 3,
          img_url: "../../Documents/assets/soccertable.jpeg",
          tipo: "MECANICOS",
          caracteristicas: [
              "Diseño robusto",
              "Materiales duraderos",
              "Interacción y diversión",
              "Ideal para todas las edades",
              "Horas de entretenimiento"
          ]
      },
      { 
          id: 11, 
          nombre: "Pileta Inflable",  
          descripcion: "Una pileta inflable ideal para refrescarse y divertirse durante los calurosos días de verano. Perfecta para fiestas y reuniones familiares, esta pileta inflable es fácil de montar y proporciona un lugar seguro para que los niños jueguen y se refresquen. Fabricada con materiales resistentes y duraderos, asegura una experiencia de uso prolongada. Añade un toque de diversión acuática a cualquier evento al aire libre y mantén a los niños felices y entretenidos durante horas.",
          largo: 1.4,
          ancho: 2,
          altura: 2,
          capacidad: 20,
          valorArriendo: 2400,
          cantidad: 3,
          img_url: "../../Documents/assets/poolgames.jpeg",
          tipo: "INFLABLES",
          caracteristicas: [
              "Fácil de montar",
              "Materiales resistentes",
              "Ideal para días calurosos",
              "Diversión acuática",
              "Segura para niños"
          ]
      }
      // Más productos...
  ];

    const selectedProduct = exampleProducts.find(
      (item) => item.id === parseInt(id)
    );
    setProduct(selectedProduct);
  }, [id]); // Solo depende del id

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
          <img src={product && product.img_url} alt={product && product.nombre} />
        </div>
      </div>
     
      <Modal>
        <GalleryImgs />
      </Modal>
    </div>
  );
};

export default DetailProduct;
