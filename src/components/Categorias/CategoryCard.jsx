import styles from './CategoryCard.module.css';
import Tooltip from '../ToolTip/ToolTip';

const CategoryCard = ({ categoryName, categoryDescription, categoryEmoji, onCategoryClick }) => {
  return (
    <div className={styles.categoryCard} onClick={() => onCategoryClick(categoryName)}>
      <Tooltip text={categoryDescription}>
        <div className={styles.categoryTitle}>
          {categoryName} {categoryEmoji}
        </div>
      </Tooltip>
    </div>
  );
};

export default CategoryCard;