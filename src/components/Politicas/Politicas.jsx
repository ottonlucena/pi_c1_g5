import usePoliticasStore from './usePoliticasStore';

import {
  ModalOverlay,
  FullScreenModalContentWrapper,
  ModalHeader,
  ModalTitle,
  CloseButton,
  ModalContent,
  ModalBody,
} from './Politicas.styled';

const Politicas = ({ children }) => {
  const { isPoliticasOpen, closePoliticas } = usePoliticasStore();

  return (
    <>
      {isPoliticasOpen && (
        <ModalOverlay onClick={closePoliticas}>
          <FullScreenModalContentWrapper onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>Políticas</ModalTitle>
              <CloseButton onClick={closePoliticas}>&times;</CloseButton>
            </ModalHeader>
            <ModalContent>
              <ModalBody>{children}</ModalBody>
            </ModalContent>
          </FullScreenModalContentWrapper>
        </ModalOverlay>
      )}
    </>
  );
};

export default Politicas;
