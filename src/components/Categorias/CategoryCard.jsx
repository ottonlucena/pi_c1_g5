import { useState } from 'react';
import styles from './CategoryCard.module.css';

const CategoryCard = ({ categoryName, categoryDescription, categoryEmoji }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={styles.categoryCard}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.categoryTitle}>{categoryName} {categoryEmoji}</div>
      {isHovered && <div className={styles.categoryDescription}>{categoryDescription}</div>}
    </div>
  );
};

export default CategoryCard;
