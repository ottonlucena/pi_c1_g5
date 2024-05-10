
import RandomProductsList from './components/Card/RandomProductsList';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar.jsx';


const menuItems = ['Nosotros', 'Servicios', 'Contacto', 'Galería'];
import LogoFestivall from './assets/FestivallSVG.svg';
const App = () => {
  return (
    <>
      <Navbar menuItems={menuItems} logo={LogoFestivall} />
      <RandomProductsList/>
      <Footer/>
    </>
  );
};

export default App;
