import useModalStore from './useModalStore';

import {
  ModalOverlay,
  ModalContentWrapper,
  ModalHeader,
  ModalTitle,
  CloseButton,
  ModalContent,
  ModalBody,
} from './Modal.styled';

const Modal = ({ title, children }) => {
  const { isModalOpen, openModal, closeModal } = useModalStore();

  return (
    <>
      {/* Aquí puedes agregar un botón o elemento que abra el modal */}
      <button onClick={openModal}>Abrir Modal</button>

      {isModalOpen && (
        <ModalOverlay onClick={closeModal}>
          <ModalContentWrapper onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>{title}</ModalTitle>
              <CloseButton onClick={closeModal}>&times;</CloseButton>
            </ModalHeader>
            <ModalContent>
              <ModalBody>{children}</ModalBody>
            </ModalContent>
          </ModalContentWrapper>
        </ModalOverlay>
      )}
    </>
  );
};

export default Modal;
