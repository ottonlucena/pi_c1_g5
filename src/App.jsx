import Navbar from './components/Navbar/Navbar.jsx';

const menuItems = ['Nosotros', 'Servicios', 'Contacto', 'Galería'];
import LogoFestivall from './assets/FestivallSVG.svg';
const App = () => {
  return (
    <>
      <Navbar menuItems={menuItems} logo={LogoFestivall} />
    </>
  );
};

export default App;
