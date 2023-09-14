import React from 'react';
import Modal from 'react-modal';
import { Loader } from '../Loader/Loader';
import { GalleryModalImage } from './Modal.styled';

const customStyles = {
  content: {
    top: '60%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    width: 800,
  },
};

Modal.setAppElement('#root');

export  function CustomModal({ isOpen, onRequestClose, isLoadingImage, imageURL, tags }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
    >
      {isLoadingImage ? (
        <Loader />
      ) : (
        <GalleryModalImage src={imageURL} alt={tags} />
      )}
    </Modal>
  );
}

export default CustomModal;
