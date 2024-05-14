import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RandomProductsList from './components/Card/RandomProductsList';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar.jsx';
import Admin from './components/PanelAdministrador/Admin.jsx'
import DetailProduct from './components/DetailProduct/DetailProduct.jsx';
import FeaturedProducts from './components/ProductsFav/FeaturedProducts.jsx';
import LogoFestivall from '../public/FestivallSVG.svg';
import ProductCard from './components/Card/ProductCard.jsx';
import CategorySection from './components/Categorias/CategorySection.jsx';
import { MdAdminPanelSettings } from 'react-icons/md';
import RegistrarProducto from './components/PanelAdministrador/RegistrarProducto.jsx';

const menuItems = ['Nosotros', 'Servicios', 'Contacto', 'Galería'];

/* import RegistrarProducto from "./components/PanelAdministrador/RegistrarProducto.jsx"; */
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar menuItems={menuItems} logo={LogoFestivall} />
        <CategorySection />
        <Routes>
          <Route
            path='/'
            element={
              <div>
                <RandomProductsList />
                <FeaturedProducts />
              </div>
            }
          />
          <Route path='/detalle/:id' element={<DetailProduct />} />
          <Route path='/product/:id' element={<ProductCard />} />
          <Route path='/RegistrarProducto' element={<RegistrarProducto />} />
          <Route path='/admin' element={<Admin />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
