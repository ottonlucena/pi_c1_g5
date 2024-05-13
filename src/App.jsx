import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RandomProductsList from './components/Card/RandomProductsList';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar.jsx';
import DetailProduct from './components/DetailProduct/DetailProduct.jsx';
import Modal from './components/Modal/Modal';
import GalleryImgs from './components/GalleryImgs/GalleryImgs.jsx';

import LogoFestivall from '../public/FestivallSVG.svg';
import ProductCard from './components/Card/ProductCard.jsx';
import CategorySection from './components/Categorias/CategorySection.jsx';
import listimages from './data/listimages.js';
import useModalStore from './components/Modal/useModalStore';

const menuItems = ['Nosotros', 'Servicios', 'Contacto', 'Galería'];
const images = listimages();

const App = () => {
  const { openModal } = useModalStore();
  return (
    <>
      <BrowserRouter>
        <button onClick={openModal}>Abrir Galería</button>
        <Navbar menuItems={menuItems} logo={LogoFestivall} />
        <CategorySection />
        <Routes>
          <Route path='/' element={<RandomProductsList />} />
          <Route path='/detalle/:id' element={<DetailProduct />} />
          <Route path='/product/:id' element={<ProductCard />} />
        </Routes>
        <Modal title='Galería de Imágenes'>
          <GalleryImgs images={images} />
        </Modal>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
