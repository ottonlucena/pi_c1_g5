import { useState } from 'react';
import styles from '../Modal/SignUpModal.module.css';
import { TbEyeClosed } from 'react-icons/tb';
import { RxEyeOpen } from 'react-icons/rx';
import sendEmail from '../SendEmail/SendEmail';
import sendEmail from '../SendEmail/SendEmail';

const SignUpModal = ({ showModal, setShowModal }) => {
  const [formData, setFormData] = useState({
    rut: '',
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
    direccion: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
      setShowModal(false);
      window.location.reload();
    }, 2000);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span className={styles.close} onClick={() => setShowModal(false)}>
              &times;
            </span>
            <h2 className={styles.titulo}>Crear una cuenta</h2>
            <form className={styles.inputContainer} onSubmit={handleSubmit}>
              <label htmlFor='firstName'>Nombre:</label>
              <input
                className={styles.input}
                type='text'
                id='nombre'
                name='nombre'
                value={formData.nombre}
                onChange={handleChange}
                required
              />

              <label htmlFor='lastName'>Apellidos:</label>
              <input
                className={styles.input}
                type='text'
                id='lastName'
                name='lastName'
                value={formData.lastName}
                onChange={handleChange}
                required
              />

              <label htmlFor='email'>Correo electrónico:</label>
              <input
                className={styles.input}
                type='email'
                id='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                required
              />

              <label htmlFor='password'>Contraseña:</label>
              <div className={styles.passwordContainer}>
                <input
                  className={styles.input}
                  type={showPassword ? 'text' : 'password'}
                  id='password'
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <span
                  className={styles.togglePassword}
                  onClick={toggleShowPassword}
                >
                  {showPassword ? <TbEyeClosed /> : <RxEyeOpen />}
                </span>
              </div>
              <label htmlFor='confirmPassword'>Confirmar Contraseña:</label>
              <input
                className={styles.input}
                type='password'
                id='confirmPassword'
                name='confirmPassword'
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <button className={styles.submit} type='submit'>
                Registrarse
              </button>
            </form>
            {showSuccessMessage && <p>La cuenta se ha creado correctamente.</p>}
            {error && <p>{error}</p>}
          </div>
        </div>
      )}
    </>
  );
};

export default SignUpModal;
