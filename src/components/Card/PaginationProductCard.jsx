import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import styles from './PaginationProductCard.module.css'; 

const PaginationProductCard = ({ products, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const renderProducts = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return products.slice(startIndex, endIndex).map(product => (
      <ProductCard key={product.id} product={product} />
    ));
  };

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handleChangePage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className={styles.paginationContainer}> 
      <div className={styles.productGrid}> 
        {renderProducts()}
      </div>
      <div className={styles.paginationControls}> 
        <button onClick={() => handleChangePage(currentPage - 1)} disabled={currentPage === 1}>
          <FaArrowLeft color="CD55A4" />
        </button>
        <span> Página {currentPage} de {totalPages} </span>
        <button onClick={() => handleChangePage(currentPage + 1)} disabled={currentPage === totalPages}>
          <FaArrowRight color="CD55A4" />
        </button>
      </div>
    </div>
  );
};

export default PaginationProductCard;