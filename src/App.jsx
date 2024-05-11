
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RandomProductsList from "./components/Card/RandomProductsList";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar.jsx";
import DetailProduct from "./components/DetailProduct/DetailProduct.jsx";

const menuItems = ["Nosotros", "Servicios", "Contacto", "Galería"];
import LogoFestivall from "./assets/FestivallSVG.svg";
import ProductCard from "./components/Card/ProductCard.jsx";
import CategorySection from "./components/Categorias/CategorySection.jsx";
const App = () => {
  return (
    <BrowserRouter>
    <Navbar menuItems={menuItems} logo={LogoFestivall} />
    <CategorySection/>
    <Routes>
      <Route path="/" element={<RandomProductsList />} />
      <Route path="/detalle/:id" element={<DetailProduct />} />
      <Route path="/product/:id" element={<ProductCard />} />
    </Routes>
    <Footer />
  </BrowserRouter>
  );
};

export default App;
