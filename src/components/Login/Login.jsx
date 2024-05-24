import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import backgroundImage from '/loginBackground.jpg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createGlobalStyle } from 'styled-components';
import '@fontsource/playfair-display';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Playfair Display', serif;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  position: relative;
  transition: flex-direction 0.3s ease;

  @media (max-width: 1500px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 956px) {
    justify-content: flex-start;
  }
`;

const LeftSide = styled.div`
  width: 50%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;

  @media (max-width: 1500px) {
    width: auto;
    padding: 1rem;
    margin-bottom: 2rem;
    transform: translateY(-50%);
  }

  @media (max-width: 956px) {
    transform: none;
    margin-bottom: 0;
  }
`;

const RightSide = styled.div`
  width: 50%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 1500px) {
    width: auto;
    padding: 1rem;
    margin-top: 0;
  }
`;

const WelcomeText = styled.div`
  position: relative;
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  padding: 0 20px;
  margin-bottom: 2rem;
  transition: font-size 0.3s ease;

  @media (max-width: 1200px) {
    font-size: calc(9rem - (2 * ((100vw - 1200px) / 640)));
  }

  @media (max-width: 956px) {
    position: static;
    transform: none;
    margin-top: 0;
    text-align: center;
    font-size: 5.2rem;
  }
`;

const WelcomeTitle = styled.h1`
  font-weight: bolder;
  margin-bottom: 0;
  font-size: 9rem;
  transition: font-size 0.3s ease;

  @media (max-width: 1200px) {
    font-size: calc(9rem - (4 * ((100vw - 1200px) / 640)));
  }

  @media (max-width: 956px) {
    font-size: 5rem;
    margin-bottom: none;
    margin-top: none;
    text-align: center;
  }
`;

const WelcomeSubtitle = styled.p`
  font-size: 3.5rem;
  transition: font-size 0.3s ease;

  @media (max-width: 956px) {
    font-size: 1.2rem;
  }
`;

const Card = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0px -10px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 1s ease-in-out;
  position: relative;
  z-index: 1;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 956px) {
    max-width: 80%;
    margin-top: 2rem;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 1rem;
  border: 1px solid #e5e5e5;
  border-radius: 0.3rem;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #795af6;
  }
`;

const Button = styled.button`
  background-color: #795af6;
  color: #ffffff;
  padding: 0;
  border: none;
  border-radius: 25px;
  width: 100%;
  height: 40px;
  font-size: 1rem;
  cursor: pointer;
  transition: border-color 0.3s ease;

  &:hover {
    background-color: #6646d1;
  }
`;

const Paragraph = styled.p`
  font-size: 0.72rem;
  font-weight: bolder;
  color: #032b44;
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const notify = () => toast('...Realizando Log in!');

  const handleSubmit = () => {
    notify();
  };

  return (
    <Container>
      <GlobalStyle />
      <LeftSide>
        <WelcomeText>
          <WelcomeTitle>Bienvenido</WelcomeTitle>
          <WelcomeSubtitle>de vuelta...</WelcomeSubtitle>
        </WelcomeText>
      </LeftSide>
      <RightSide>
        <Card>
          <h2>User Login</h2>
          <form>
            <Input
              type='email'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type='button' onClick={handleSubmit}>
              Log in
            </Button>
          </form>
          <Paragraph>Olvidó su Ususario/Contraseña?</Paragraph>
          <Paragraph>Crea tu Cuenta... →</Paragraph>
        </Card>
      </RightSide>
      <ToastContainer position='top-center' />;
    </Container>
  );
};

export default Login;
