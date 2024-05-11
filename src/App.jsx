import RandomProductsList from './components/Card/RandomProductsList';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar.jsx';
import GalleryImgs from './components/GalleryImgs/GalleryImgs.jsx';

import LogoFestivall from '/FestivallSVG.svg';
import listimages from './data/listimages.js';

const menuItems = ['Nosotros', 'Servicios', 'Contacto', 'Galería'];
const images = listimages();
const App = () => {
  return (
    <>
      <Navbar menuItems={menuItems} logo={LogoFestivall} />
      <RandomProductsList />
      <GalleryImgs images={images} />
      <Footer />
    </>
  );
};

export default App;
