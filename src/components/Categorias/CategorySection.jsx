import CategoryCard from "./CategoryCard";
import styles from "./CategorySection.module.css";

const CategorySection = ({ onCategoryClick }) => {
  const categories = [
    {
      name: "Inflables y Castillos",
      description: "Atracciones inflables para fiestas y eventos al aire libre.",
      emoji: "🏰"
    },
    {
      name: "Juegos de Agua",
      description: "Toboganes y juegos acuáticos para refrescarse en verano.",
      emoji: "💦"
    },
    {
      name: "Juegos Mecánicos",
      description: "Atracciones emocionantes para todas las edades.",
      emoji: "🎡"
    },
    {
      name: "Juegos de Destreza",
      description: "Actividades con premios para desafiar habilidades.",
      emoji: "🎯"
    },
    {
      name: "Niños Pequeños",
      description: "Carruseles y áreas de juegos para los más pequeños.",
      emoji: "👶"
    }
  ];

  return (
    <div className={styles.categorySection}>
      {categories.map(category => (
        <CategoryCard
          key={category.name}
          categoryName={category.name}
          categoryDescription={category.description}
          categoryEmoji={category.emoji}
          onCategoryClick={onCategoryClick}
        />
      ))}
    </div>
  );
};

export default CategorySection;