import React from 'react';
import Styles from './Contact.module.css'

const Contacto = () => {
  return (
 <div className={Styles.granContenedor}>
       <div className={Styles.contenedor}>
      <div  className={Styles.contenedor1}>
        <h2>¡Contáctanos!</h2>
        <p>
          ¿Tienes alguna pregunta o comentario? ¿Quieres formar parte de nuestro
          equipo? No dudes en contactarnos. 
        
        </p>
        <p>
          <b>Dirección:</b> Sherman calle Wallaby 42 Sydney
        </p>
        <p>
          <b>Teléfono:</b> +57 123 456 7890
        </p>
        <p>
          <b>Correo electrónico:</b> festivall.vivelaemocion@gmail.com
        </p>
      </div>

      <div className={Styles.contenedor2}>
        <h2>Envíanos un mensaje</h2>
        <form>
          <label>
            Nombre:
            <input type="text" name="nombre" required style={{ padding: '5px', margin: '5px 0' }} />
          </label>
          <br />
          <label>
            Correo electrónico:
            <input type="email" name="correo" required style={{ padding: '5px', margin: '5px 0' }} />
          </label>
          <br />
          <label>
            Mensaje:
            <textarea name="mensaje" required style={{ padding: '10px', margin: '5px 0' }} />
          </label>
          <br />
          <button type="submit">Enviar mensaje</button>
        </form>
      </div>
    </div>
 </div>
  );
};

export default Contacto;
