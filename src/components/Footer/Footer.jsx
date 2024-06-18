import './Footer.module.css';
import LogoFestivall from '/FestivallSVG.svg';
import { FaInstagram } from 'react-icons/fa';
import { FaFacebookSquare } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer>
      <img src={LogoFestivall} alt='Logo de la aplicacion Festivall' />

      <p className='footerText'>© 2024- Todos los derechos reservados G5</p>
      <ul className='social-icons'>
        <li>
        <a href={"https://www.instagram.com/festivall.vivelaemocion/"} target='_blank' rel='noopener noreferrer'>
            <FaInstagram color='#6743dd' />
          </a>
        </li>
        <li>
          {/* <FaFacebookSquare color='#6743dd' /> */}
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
