import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import RandomProductsList from "./components/Card/RandomProductsList";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar.jsx";
import DetailProduct from "./components/DetailProduct/DetailProduct.jsx";
import FeaturedProducts from "./components/ProductsFav/FeaturedProducts.jsx";
import LogoFestivall from "/FestivallSVG.svg";
import ProductCard from "./components/Card/ProductCard.jsx";
import CategorySection from "./components/Categorias/CategorySection.jsx";
import EmailForm from "./components/SendEmail/EmailForm.jsx";

// import { MdAdminPanelSettings } from 'react-icons/md'; // Agregar la importación aquí

import RegistrarProducto from "./components/PanelAdministrador/RegistrarProducto.jsx";
import ListarProductos from "./components/PanelAdministrador/ListarProductos.jsx";

const menuItems = ["Nosotros", "Servicios", "Contacto", "Galería"];

/* import RegistrarProducto from "./components/PanelAdministrador/RegistrarProducto.jsx"; */
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar menuItems={menuItems} logo={LogoFestivall} />
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <RandomProductsList />
                <FeaturedProducts />
              </div>
            }
          />
          <Route path="/detalle/:id" element={<DetailProduct />} />
          <Route path="/product/:id" element={<ProductCard />} />
          <Route path="/RegistrarProducto" element={<RegistrarProducto />} />
          <Route path="/admin" element={<ListarProductos />} />
          <Route path="/emailTest" element={<EmailForm />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
