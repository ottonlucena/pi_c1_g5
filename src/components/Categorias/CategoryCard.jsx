import styles from './CategoryCard.module.css';
import Tooltip from '../ToolTip/ToolTip';

const CategoryCard = ({ categoryName, categoryDescription, categoryEmoji }) => {
  return (
    <div className={styles.categoryCard}>
      <Tooltip text={categoryDescription}>
        <div className={styles.categoryTitle}>
          {categoryName} {categoryEmoji}
        </div>
      </Tooltip>

      {/* {isHovered && <div className={styles.categoryDescription}>{categoryDescription}</div>} */}
    </div>
  );
};

export default CategoryCard;


