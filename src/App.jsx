import RandomProductsList from './components/Card/RandomProductsList';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar.jsx';
import Modal from './components/Modal/Modal';
import GalleryImgs from './components/GalleryImgs/GalleryImgs.jsx';

import LogoFestivall from '/FestivallSVG.svg';
import listimages from './data/listimages.js';
import useModalStore from './components/Modal/useModalStore';

const menuItems = ['Nosotros', 'Servicios', 'Contacto', 'Galería'];
const images = listimages();
const App = () => {
  const { openModal } = useModalStore();
  return (
    <>
      <button onClick={openModal}>Abrir Galería</button>

      <Navbar menuItems={menuItems} logo={LogoFestivall} />
      <RandomProductsList />
      <Modal title='Galería de Imágenes'>
        <GalleryImgs images={images} />
      </Modal>
      <Footer />
    </>
  );
};

export default App;
