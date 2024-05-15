/* import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BsSearch } from "react-icons/bs";
import { FaTrashAlt } from 'react-icons/fa';
import { GrEdit } from "react-icons/gr";
import { Button } from '@mui/material';
import { FaRegSave } from "react-icons/fa";
import DetailProduct from '../DetailProduct/DetailProduct.jsx';

import styles from './Admin.module.css';


const Admin = () => {
  const [products, setProducts] = useState([
    { id: 1, name: "Celebración", description: "Descripción de Celebracion", image: "../../Documents/assets/celebrations.jpeg" },
    { id: 2, name: "castillo inflable", description: "Descripción de castillo inflable", image: "../../Documents/assets/castilloinflable2.jpeg" },
    { id: 3, name: "Castillo 3", description: "Descripción de Castillo 3", image: "../../Documents/assets/castilloinflable3.jpeg" },
    { id: 4, name: "Inflable 2", description: "Descripción de Inflable 2", image: "../../Documents/assets/castilloinflable4.jpeg" },
    { id: 5, name: "Castillo", description: "Descripción de castillo", image: "../../Documents/assets/castilloinflable1.jpeg" },
    { id: 6, name: "Centro de juegos", description: "Descripción de centro de juegos", image: "../../Documents/assets/centrodejuegos.jpeg" },
    { id: 7, name: "Jenga", description: "Descripción de Jenga", image: "../../Documents/assets/jengaGiant.jpeg" },
    { id: 8, name: "Juego infantil", description: "Descripción de Juego infantil", image: "../../Documents/assets/juegoinfantil1.jpeg" },
    { id: 9, name: "Painball", description: "Descripción de Painball", image: "../../Documents/assets/paintball.jpeg" },
    { id: 10, name: "Tabla de soccer", description: "Descripción de Tabla de soccer", image: "../../Documents/assets/soccertable.jpeg" },
    { id: 11, name: "Juegos de piscina", description: "Descripción de Juegos de piscina", image: "../../Documents/assets/poolgames.jpeg" },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  //
  const handleEditProduct = (productId, newName, newDescription) => {
    const updatedProducts = products.map(product => {
      if (product.id === productId) {
        return { ...product, name: newName, description: newDescription };
      }
      return product;
    });
    setProducts(updatedProducts);
    setEditingProduct(null); 
  };

 
  const handleDeleteProduct = (productId) => {
    const updatedProducts = products.filter(product => product.id !== productId);
    setProducts(updatedProducts);
  };

 
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  
  const filteredProducts = products.filter(product => {
    return product.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

 
  const checkMobileDevice = () => {
    const isMobileDevice = window.matchMedia("(max-width: 768px)").matches;
    setIsMobile(isMobileDevice);
  };

 
  useEffect(() => {
    checkMobileDevice();
    window.addEventListener("resize", checkMobileDevice);
    return () => window.removeEventListener("resize", checkMobileDevice);
  }, []);


  if (isMobile) {
    return (
      <div className={styles.panel}>
        <h2>Panel de Administración</h2>
        <p>No disponible en dispositivos móviles.</p>
      </div>
    );
  }

  
  return (
    <div className={styles.panel}>
      <h2>Panel de Administración</h2>
      
      <div className={styles.act}>
        <form action="#" method="get">
          <label htmlFor="search">Buscar productos:</label>
          <input type="text" id="search" name="search" value={searchTerm} onChange={handleSearchChange} />
          <button type="submit"><BsSearch /></button>
        </form>
        <div className="newProduct">
          <Link to="/RegistrarProducto">
            <Button type="submit">Agregar Juego</Button>
          </Link>
        </div>
        <div className="ListProduct">
          <Link to="">
            <Button type="submit">Listar productos</Button>
          </Link>
        </div>
      </div>

      <div className="admin-table-container">
        <table className={styles.adminTable}>
          <thead className={styles.thead}>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(product => (
              <tr className={styles.columnas} key={product.id}>
                <td>{product.id}</td>
                <td className={styles.name}>{editingProduct === product.id ? <input type="text" defaultValue={product.name} onChange={(e) => product.name = e.target.value} /> : product.name}</td>
                <td>{editingProduct === product.id ? <input type="text" defaultValue={product.description} onChange={(e) => product.description = e.target.value} /> : product.description}</td>
                <td>
                  {editingProduct === product.id ? (
                    <button className='save' onClick={() => handleEditProduct(product.id, product.name, product.description)}> <FaRegSave color='#549ad9'/></button>
                  ) : (
                    <>
                      <button onClick={() => handleDeleteProduct(product.id)}><FaTrashAlt color='#549ad9'/></button>
                      <button onClick={() => setEditingProduct(product.id)}><GrEdit color='#549ad9'/></button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin; */