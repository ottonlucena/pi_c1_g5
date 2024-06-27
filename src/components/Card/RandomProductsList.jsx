import { useState, useEffect } from 'react';
import styles from './RandomProductsList.module.css';
import PaginationProductCard from './PaginationProductCard';
import CategorySection from '../Categorias/CategorySection';
import { Spinner } from '@fluentui/react-components';
import { obtenerProductos } from '../../data/juegos';
import { useAtom } from "jotai";
import { availableGamesAtom } from "../../data/Store/availableStore";
import { Button } from "@fluentui/react-components";

const RandomProductsList = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [availableGames, setAvailableGames] = useAtom(availableGamesAtom);

  useEffect(() => {
    console.log("muestro data en el store", availableGames);
    loadProducts(); // Cargar productos al montar el componente
  }, [availableGames]);

  // Función para filtrar productos por categorías seleccionadas
  const filterProductsByCategories = (productos, categories) => {
    if (categories.length === 0) {
      return productos; // Devuelve todos los productos si no hay categorías seleccionadas
    }
    return productos.filter((producto) =>
      categories.includes(producto.tipo.filtro)
    );
  };

  // Cargar productos
  const loadProducts = async (loadAll = false) => {
    try {
      setIsLoading(true);
      const productos = await obtenerProductos();
      const productosToSet = loadAll ? productos : (availableGames.length === 0 ? productos : availableGames);
      setAllProducts(productosToSet);
      setFilteredProducts(productosToSet); // Inicialmente, los productos filtrados son todos los productos
      if (loadAll) {
        setAvailableGames(productosToSet); // Actualizar availableGames cuando se cargan todos los productos
        setSelectedCategories([]); // Limpiar las categorías seleccionadas
      }
    } catch (error) {
      console.error('Error al cargar productos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Actualizar productos filtrados cuando cambian las categorías seleccionadas o los productos cargados
  useEffect(() => {
    setFilteredProducts(
      filterProductsByCategories(allProducts, selectedCategories)
    );
  }, [selectedCategories, allProducts]);

  // Manejar la selección de categorías desde CategorySection
  const handleCategorySelect = (categories) => {
    console.log('Categorías recibidas de CategorySection:', categories);
    setSelectedCategories(categories);

    // Verificar si "Todos" está en las categorías seleccionadas
    if (categories.includes('Todos')) {
      setFilteredProducts(allProducts); // Mostrar todos los productos si se selecciona "Todos"
    } else {
      setFilteredProducts(filterProductsByCategories(allProducts, categories));
    }
  };

  // Manejar clic en el botón para cargar todos los productos
  const handleLoadAllClick = () => {
    loadProducts(true);
  };

  // Mostrar spinner de carga si aún se están cargando los productos
  if (isLoading) {
    return (
      <div className={styles.spinnerContainer}>
        <Spinner appearance='primary' label={'Cargando Juegos...'} />
      </div>
    );
  }

  // Renderizar la lista de productos filtrados después de cargar
  return (
    <div>
      <CategorySection onCategoryClick={handleCategorySelect} />
      <div className={styles.randomProductsList}>
        <PaginationProductCard products={filteredProducts} itemsPerPage={6} />
      </div>
      <div className={styles.loadProductsButton}>
        <Button appearance='primary' onClick={handleLoadAllClick}>
          Cargar Todos los Productos
        </Button>
      </div>
    </div>
  );
};

export default RandomProductsList;




