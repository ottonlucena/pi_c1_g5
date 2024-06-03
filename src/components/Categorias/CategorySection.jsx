import { useState, useEffect } from "react";
import CategoryCard from "./CategoryCard";
import styles from "./CategorySection.module.css";

const titleMapping = {
  INFLABLES: "Inflables y Castillos 🏰",
  AGUA: "Juegos de Agua💦",
  MECANICOS: "Juegos Mecánicos 🎡",
  DESTREZA: "Juegos de Destreza  🎯",
  NIÑOS: "Niños Pequeños👶",
  TODOS: "Todos🔍",
};

const CategorySection = ({ onCategoryClick }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/category");
        if (!response.ok) {
          throw new Error(
            `Error en la respuesta del servidor: ${response.statusText}`
          );
        }
        const data = await response.json();

        // Agregar manualmente la categoría "TODOS" al final de la lista
        const allCategory = {
          id: 0,
          title: "TODOS",
          description: "Mostrar todos los productos.",
          img_url: "../public/assets/todos.jpg",
        };

        setCategories([...data, allCategory]);
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (category) => {
    let updatedCategories = [...selectedCategories];
    if (category.title === "TODOS") {
      updatedCategories = [];
    } else {
      const index = selectedCategories.indexOf(category.title);
      if (index !== -1) {
        updatedCategories.splice(index, 1);
      } else {
        updatedCategories.push(category.title);
      }
    }
    setSelectedCategories(updatedCategories);
    onCategoryClick(updatedCategories);
  };

  return (
    <div className={styles.categorySection}>
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          categoryName={titleMapping[category.title] || category.title}
          categoryDescription={category.description}
          categoryImageUrl={category.img_url}
          isSelected={selectedCategories.includes(category.title)}
          onClick={() => handleCategoryClick(category)}
        />
      ))}
    </div>
  );
};

export default CategorySection;
