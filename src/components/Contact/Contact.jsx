import Styles from './Contact.module.css';
import emailjs from 'emailjs-com';

const Contacto = () => {
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_di6xjep',
        'template_rzmruld',
        e.target,
        'ZAPktphb4_mUEdgNy'
      )
      .then((response) => {
        'Email enviado:', response;
        alert('¡Tu mensaje se ha enviado correctamente!');
      })
      .catch((error) => {
        console.error('Error al enviar el email:', error);
        alert(
          'Ocurrió un error al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.'
        );
      });

    e.target.reset();
  };

  return (
    <div className={Styles.granContenedor}>
      <div className={Styles.contenedor}>
        <div className={Styles.contenedor1}>
          <h2>¡Contáctanos!</h2>
          <p>
            ¿Tienes alguna pregunta o comentario? ¿Quieres formar parte de
            nuestro equipo? No dudes en contactarnos.
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
          <form className={Styles.formContact} onSubmit={sendEmail}>
            <label>
              Nombre:
              <input
                type='text'
                name='from_name'
                required
                style={{ padding: '5px', margin: '5px 0' }}
              />
            </label>
            <br />
            <label>
              Correo electrónico:
              <input
                type='email'
                name='to_email'
                required
                style={{ padding: '5px', margin: '5px 0' }}
              />
            </label>
            <br />
            <label>
              Mensaje:
              <textarea
                name='message_html'
                required
                style={{ padding: '10px', margin: '5px 0' }}
              />
            </label>
            <br />
            <button type='submit'>Enviar mensaje</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contacto;
