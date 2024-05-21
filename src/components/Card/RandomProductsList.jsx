import { useState, useEffect } from 'react';
import styles from "./RandomProductsList.module.css";
import PaginationProductCard from "./PaginationProductCard";
import CategorySection from '../Categorias/CategorySection';

const RandomProductsList = () => {
  const [randomProducts, setRandomProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    const exampleProducts = [
      { id: 1, name: "Producto 1", description: "Todo lo que necesitas para que tu fiesta sea inolvidable: disfraces, sombreros, serpentinas, y mucho más. Nuestro cotillón incluye una variedad de accesorios coloridos y divertidos que animarán cualquier celebración. Ideal para cumpleaños, bodas, aniversarios, y eventos corporativos. Transforma cualquier ambiente en una fiesta llena de alegría y diversión con nuestra selección de cotillón de alta calidad.", image: "../../Documents/assets/celebrations.jpeg", category: "Celebraciones" },
      { id: 2, name: "Producto 2", description: "Un castillo inflable ideal para mantener a los niños entretenidos durante horas. Este inflable cuenta con colores vivos y una estructura segura que permite a los niños saltar y jugar sin preocupaciones. Perfecto para fiestas infantiles, eventos escolares, y reuniones familiares. La construcción resistente garantiza que los niños puedan disfrutar de una diversión sin fin mientras los padres pueden relajarse sabiendo que sus hijos están en un entorno seguro.", image: "../../Documents/assets/castilloinflable2.jpeg", category: "Inflables y Castillos" },
      { id: 3, name: "Producto 3", description: "Este castillo inflable es espacioso y seguro, diseñado para proporcionar diversión y risas en cualquier evento. Con una amplia área de salto y paredes laterales altas, es perfecto para grupos grandes de niños. Su diseño atractivo y colorido atraerá a los más pequeños y les proporcionará una experiencia inolvidable. Ideal para alquiler en cumpleaños, ferias, y festivales. Asegúrate de que tu evento sea recordado por todos con este increíble castillo inflable.", image: "../../Documents/assets/castilloinflable3.jpeg", category: "Inflables y Castillos" },
      { id: 4, name: "Producto 4", description: "El castillo inflable perfecto para fiestas, con colores vibrantes y una estructura robusta que garantiza horas de diversión. Este inflable es fácil de instalar y ofrece una zona de juego segura y divertida para los niños. Sus materiales de alta calidad aseguran durabilidad y resistencia, haciendo que sea una opción ideal para cualquier tipo de evento al aire libre. Proporciona entretenimiento sin fin y crea momentos memorables para los más pequeños.", image: "../../Documents/assets/castilloinflable4.jpeg", category: "Juegos de Agua" },
      { id: 5, name: "Producto 5", description: "Un divertido castillo inflable que ofrece una experiencia única de saltos y juegos, ideal para cualquier reunión infantil. Con una superficie amplia y paredes acolchadas, este castillo proporciona un entorno seguro para que los niños puedan saltar y jugar a su antojo. Su diseño atractivo y resistente lo convierte en la pieza central perfecta para cualquier evento infantil, asegurando que todos los niños se diviertan de manera segura y supervisada.", image: "../../Documents/assets/castilloinflable1.jpeg", category: "Inflables y Castillos" },
      { id: 6, name: "Producto 6", description: "Un centro de juegos completo con actividades para niños de todas las edades. Este centro de juegos incluye una variedad de estructuras y juegos que mantendrán a los niños activos y entretenidos durante horas. Con zonas de escalada, toboganes, y áreas de juego interactivo, es perfecto para fiestas, eventos escolares, y reuniones familiares. Fomenta la actividad física y el juego creativo en un entorno seguro y controlado, proporcionando diversión para todos.", image: "../../Documents/assets/centrodejuegos.jpeg", category: "Juegos de Destreza" },
      { id: 7, name: "Producto 7", description: "El clásico juego de Jenga en una versión gigante. Desafía a tus amigos y familiares a construir la torre más alta sin que se caiga. Este Jenga gigante es perfecto para exteriores e interiores, y es ideal para fiestas, barbacoas, y eventos corporativos. Hecho de madera de alta calidad, garantiza durabilidad y diversión para todos. Perfecto para desarrollar habilidades de concentración y destreza mientras se disfruta de un buen rato en compañía.", image: "../../Documents/assets/jengaGiant.jpeg", category: "Juegos de Destreza" },
      { id: 8, name: "Producto 8", description: "Un emocionante juego de soga de fuerza que pondrá a prueba la resistencia y el trabajo en equipo de todos los participantes. Este juego es ideal para eventos al aire libre, fiestas infantiles, y competencias deportivas. Incluye una soga resistente y de alta calidad, diseñada para soportar la fuerza y la tensión de múltiples jugadores. Fomenta la cooperación y el espíritu de equipo mientras se disfruta de una actividad divertida y desafiante.", image: "../../Documents/assets/juegoinfantil1.jpeg", category: "Niños Pequeños" },
      { id: 9, name: "Producto 9", description: "La actividad perfecta para los amantes de la adrenalina. Disfruta de un emocionante juego de paintball con tus amigos. Equipado con pistolas de paintball de alta precisión y protecciones completas, este juego es ideal para eventos de team building, cumpleaños, y reuniones de amigos. Proporciona una experiencia intensa y llena de acción, donde la estrategia y la velocidad son clave para ganar. Asegura horas de diversión y competición sana en un entorno seguro.", image: "../../Documents/assets/paintball.jpeg", category: "Juegos Mecánicos" },
      { id: 10, name: "Producto 10", description: "Un clásico juego de metegol que garantiza diversión y competencia en cualquier reunión o evento social. Este metegol está diseñado con materiales duraderos y una construcción robusta para soportar juegos intensos. Ideal para fiestas, bares, y eventos familiares. Promueve la interacción y la diversión entre los jugadores, proporcionando horas de entretenimiento. Perfecto para todas las edades, desde niños hasta adultos, que disfruten de un buen desafío.", image: "../../Documents/assets/soccertable.jpeg", category: "Juegos Mecánicos" },
      { id: 11, name: "Producto 11", description: "Una pileta inflable ideal para refrescarse y divertirse durante los calurosos días de verano. Perfecta para fiestas y reuniones familiares, esta pileta inflable es fácil de montar y proporciona un lugar seguro para que los niños jueguen y se refresquen. Fabricada con materiales resistentes y duraderos, asegura una experiencia de uso prolongada. Añade un toque de diversión acuática a cualquier evento al aire libre y mantén a los niños felices y entretenidos durante horas.", image: "../../Documents/assets/poolgames.jpeg", category: "Juegos de Agua" }
      // Más productos...
    ];

    setRandomProducts(exampleProducts);
    setFilteredProducts(exampleProducts);
  }, []);

  useEffect(() => {
    if (selectedCategories.length === 0) {
      setFilteredProducts(randomProducts);
    } else {
      const filtered = randomProducts.filter(product => selectedCategories.includes(product.category));
      setFilteredProducts(filtered);
    }
  }, [selectedCategories, randomProducts]);

  const handleCategorySelect = (categories) => {
    setSelectedCategories(categories);
  };

  return (
    <div>
      <CategorySection onCategoryClick={handleCategorySelect} />
      <div className={styles.randomProductsList}>
        <PaginationProductCard products={filteredProducts} itemsPerPage={6} />
      </div>
    </div>
  );
};

export default RandomProductsList;
