import { useState } from 'react';
import styles from './CategoryCard.module.css';

const CategoryCard = ({ categoryName, categoryDescription, categoryEmoji }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDescriptionShown, setIsDescriptionShown] = useState(false);

  const toggleDescription = () => {
    setIsDescriptionShown(!isDescriptionShown);
  };

  return (
    <div
      className={`${styles.categoryCard} ${isHovered ? styles.hovered : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={toggleDescription}
    >
      <div className={styles.categoryTitle}>{categoryName} {categoryEmoji}</div>
      <div className={`${styles.categoryDescription} ${isDescriptionShown ? styles.show : ''}`}>
        {categoryDescription}
      </div>
    </div>
  );
};

export default CategoryCard;


