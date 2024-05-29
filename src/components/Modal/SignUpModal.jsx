import { useState } from 'react';
import styles from '../Modal/SignUpModal.module.css';
import { TbEyeClosed } from 'react-icons/tb';
import { RxEyeOpen } from 'react-icons/rx';
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
    confirmPassword: '',
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

    // Crear objeto de usuario en el formato de la base de datos
    const usuario = {
      rut: formData.rut,
      nombre: formData.nombre,
      apellido: formData.apellido,
      telefono: formData.telefono,
      email: formData.email,
      direccion: formData.direccion,
      password: formData.password,
    };

    try {
      // Enviar datos al servidor
      const response = await fetch('http://localhost:8080/api/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al enviar datos al servidor');
      }

      await sendEmail(formData.email);
      setShowSuccessMessage(true);
      // Reinicia el formulario después de 2 segundos
      setTimeout(() => {
        setShowSuccessMessage(false);
        setShowModal(false);
        window.location.reload();
      }, 2000);
    } catch (error) {
      setError('Error al enviar el formulario: ' + error.message);
      console.error('Error al enviar el formulario:', error);
    }
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
              <label htmlFor='rut'>RUT:</label>
              <input
                className={styles.input}
                type='text'
                id='rut'
                name='rut'
                value={formData.rut}
                onChange={handleChange}
                required
              />

              <label htmlFor='nombre'>Nombre:</label>
              <input
                className={styles.input}
                type='text'
                id='nombre'
                name='nombre'
                value={formData.nombre}
                onChange={handleChange}
                required
              />

              <label htmlFor='apellido'>Apellidos:</label>
              <input
                className={styles.input}
                type='text'
                id='apellido'
                name='apellido'
                value={formData.apellido}
                onChange={handleChange}
                required
              />

              <label htmlFor='telefono'>Teléfono:</label>
              <input
                className={styles.input}
                type='tel'
                id='telefono'
                name='telefono'
                value={formData.telefono}
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

              <label htmlFor='direccion'>Dirección:</label>
              <input
                className={styles.input}
                type='text'
                id='direccion'
                name='direccion'
                value={formData.direccion}
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
