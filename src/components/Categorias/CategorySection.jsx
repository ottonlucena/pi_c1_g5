import CategoryCard from "./CategoryCard";
import styles from "./CategorySection.module.css";

const CategorySection = () => {
  return (
    <div className={styles.categorySection}>
      <CategoryCard
        categoryName="Inflables y Castillos"
        categoryDescription="Atracciones inflables para fiestas y eventos al aire libre."
        categoryEmoji="🏰"
      />
      <CategoryCard
        categoryName="Juegos de Agua"
        categoryDescription="Toboganes y juegos acuáticos para refrescarse en verano."
        categoryEmoji="💦"
      />
      <CategoryCard
        categoryName="Juegos Mecánicos"
        categoryDescription="Atracciones emocionantes para todas las edades."
        categoryEmoji="🎡"
      />

      <CategoryCard
        categoryName="Juegos de Destreza"
        categoryDescription="Actividades con premios para desafiar habilidades."
        categoryEmoji="🎯"
      />
      <CategoryCard
        categoryName="Niños Pequeños"
        categoryDescription="Carruseles y áreas de juegos para los más pequeños."
        categoryEmoji="👶"
      />
    </div>
  );
};

export default CategorySection;
