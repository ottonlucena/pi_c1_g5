import React, { useState } from 'react';
import styles from '../Modal/SignUpModal.module.css';

const SignUpModal = ({ showModal, setShowModal }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
      setShowModal(false);
      window.location.reload(); // Recargar la página después de 2 segundos
    }, 2000);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSignUpClick = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    setShowModal(true);
  };

  return (
    <>
      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span className={styles.close} onClick={() => setShowModal(false)}>&times;</span>
            <h2 className={styles.titulo}>Crea una cuenta</h2>
            <form onSubmit={handleSubmit}>
              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Nombre" required />
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Apellido" required />
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Correo electrónico" required />
              <div className="password-container">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Contraseña"
                  required
                />
                <span className="toggle-password" onClick={toggleShowPassword}>
                  {showPassword ? '🙈' : '👁️'}
                </span>
              </div>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirmar Contraseña"
                required
              />

            <br></br>
              <button className={styles.submit} type="submit">Registrarse</button>
            </form>
            {showSuccessMessage && <p>La cuenta se ha creado correctamente.</p>}
          </div>
        </div>
      )}
      
    </>
  );
};

export default SignUpModal;