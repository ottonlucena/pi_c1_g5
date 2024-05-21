import React from 'react';
import styles from './CategoryCard.module.css';

const CategoryCard = ({ categoryName, categoryDescription, categoryEmoji, isSelected, onClick }) => {
  return (
    <div className={`${styles.categoryCard} ${isSelected ? styles.selected : ''}`} onClick={onClick}>
      <div className={styles.categoryTitle}>
        {categoryEmoji} {categoryName}
      </div>
      <div className={styles.categoryDescription}>
        {categoryDescription}
      </div>
    </div>
  );
};

export default CategoryCard;