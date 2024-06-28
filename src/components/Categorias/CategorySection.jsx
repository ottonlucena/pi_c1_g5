import { useState, useEffect } from 'react';
import CategoryCard from './CategoryCard';
import styles from './CategorySection.module.css';

const titleMapping = [
  {
    nombreFiltro: 'Inflables y Castillos',
    imagenFiltro:
      'https://img.freepik.com/foto-gratis/vista-colorido-castillo-inflable_23-2150844327.jpg',
  },
  {
    nombreFiltro: 'Juegos de Agua',
    imagenFiltro:
      'https://bestonjuegosmecanicos.com.mx/wp-content/uploads/2017/05/Juego-Mecanico-Globo-Samba.jpg',
  },
  {
    nombreFiltro: 'Juegos Mecánicos',
    imagenFiltro:
      'https://http2.mlstatic.com/parque-de-agua-juego-inflable-con-agua-usa-D_NQ_NP_731019-MLC26420769230_112017-F.jpg',
  },
  {
    nombreFiltro: 'Juegos de Destreza',
    imagenFiltro:
      'https://i0.wp.com/concepto.de/wp-content/uploads/2018/08/destreza-e1533845828681.jpg',
  },
  {
    nombreFiltro: 'Niños Pequeños',
    imagenFiltro:
      'https://www.chiquimadrid.es/wp-content/uploads/2018/11/juegos-tradicionales-para-ni%C3%B1os.jpg',
  },
  {
    nombreFiltro: 'Todos',
    imagenFiltro:
      'https://tackletrading.com/wp-content/uploads/2015/09/Detective-1920px-min2-1024x791.jpg',
  },
];

const CategorySection = ({ onCategoryClick }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://sunny-exploration-production.up.railway.app/api/category');
        if (!response.ok) {
          throw new Error(
            `Error en la respuesta del servidor: ${response.statusText}`
          );
        }
        const data = await response.json();

        // Agregar la categoría "Todos" al final de las categorías obtenidas
        const allCategory = {
          id: 0,
          title: 'TODOS',
          description: 'Mostrar todos los productos.',
          img_url: 'https://tackletrading.com/wp-content/uploads/2015/09/Detective-1920px-min2-1024x791.jpg', // URL válida para la imagen de "TODOS"
        };

        setCategories([...data, allCategory]);
      } catch (error) {
        console.error('Error al obtener las categorías:', error);
      }
    };

    fetchCategories();
  }, []);

 const handleCategoryClick = (category) => {
  let updatedCategories = [...selectedCategories];
  if (category.title === 'TODOS') {
    if (updatedCategories.length === titleMapping.length - 1) {
      // Si ya están seleccionadas todas las categorías excepto "TODOS", deseleccionar todas
      updatedCategories = [];
    } else {
      // Seleccionar todas las categorías excepto "TODOS"
      updatedCategories = titleMapping.map(category => category.nombreFiltro).filter(category => category !== 'Todos');
    }
  } else {
    const index = selectedCategories.indexOf(category.title);
    if (index !== -1) {
      updatedCategories.splice(index, 1);
    } else {
      updatedCategories.push(category.title);
    }
    // Si TODOS estaba seleccionado, quitarlo
    const todosIndex = updatedCategories.indexOf('Todos');
    if (todosIndex !== -1) {
      updatedCategories.splice(todosIndex, 1);
    }
  }
  setSelectedCategories(updatedCategories);
  onCategoryClick(updatedCategories);
};

  return (
    <div className={styles.categorySection}>
      {titleMapping.map((category, index) => {
        const { nombreFiltro, imagenFiltro } = category;
        return (
          <CategoryCard
            key={index}
            categoryName={nombreFiltro}
            categoryDescription={''} // Aquí podrías agregar una descripción si la tuvieras disponible
            categoryImageUrl={imagenFiltro}
            isSelected={selectedCategories.includes(nombreFiltro)}
            onClick={() => handleCategoryClick({ title: nombreFiltro })}
          />
        );
      })}
    </div>
  );
};

export default CategorySection;
