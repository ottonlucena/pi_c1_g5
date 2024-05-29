import { useState } from 'react';
import CategoryCard from "./CategoryCard";
import styles from "./CategorySection.module.css";


const categories = [
  { value: 'INFLABLES', name: "Inflables y Castillos", description: "Atracciones inflables para fiestas y eventos al aire libre.", emoji: "🏰" },
  { value: 'AGUA', name: "Juegos de Agua", description: "Toboganes y juegos acuáticos para refrescarse en verano.", emoji: "💦" },
  { value: 'MECANICOS', name: "Juegos Mecánicos", description: "Atracciones emocionantes para todas las edades.", emoji: "🎡" },
  { value: 'DESTREZA', name: "Juegos de Destreza", description: "Actividades con premios para desafiar habilidades.", emoji: "🎯" },
  { value: 'NINOS', name: "Niños Pequeños", description: "Carruseles y áreas de juegos para los más pequeños.", emoji: "👶" },
  { value: 'TODOS', name: "Todos", description: "Mostrar todos los productos.", emoji: "🔍" }
];

const CategorySection = ({ onCategoryClick }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategoryClick = (category) => {
    let updatedCategories = [...selectedCategories];
    if (category.value === 'TODOS') {
      updatedCategories = [];
    } else {
      const index = selectedCategories.indexOf(category.value);
      if (index !== -1) {
        updatedCategories.splice(index, 1);
      } else {
        updatedCategories.push(category.value);
      }
    }
    setSelectedCategories(updatedCategories);
    onCategoryClick(updatedCategories);
  };

  return (
    <div className={styles.categorySection}>
      {categories.map(category => (
        <CategoryCard
          key={category.value}
          categoryName={category.name}
          categoryDescription={category.description}
          categoryEmoji={category.emoji}
          isSelected={selectedCategories.includes(category.value)}
          onClick={() => handleCategoryClick(category)}
        />
      ))}
    </div>
  );
};

export default CategorySection;