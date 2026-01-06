import React, { createContext, useState, useContext } from 'react';
import MKBox from 'components/MKBox';

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', children: [] });

  const openModal = (title, children) => {
    setModalContent({ title, children });
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  }

  return (
    <ModalContext.Provider value={{ isOpen, modalContent, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};