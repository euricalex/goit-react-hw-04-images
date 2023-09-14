import React, { useState } from 'react';
import { GalleryListItem, GalleryListImage } from './ImageGalleryItem.styled';
import { CustomModal } from '../Modal/Modal';

export const ImageGalleryItem = ({ image }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLoadingImage, setLoadingImage] = useState(false);

  const openModal = () => {
    setModalOpen(true);
    setLoadingImage(true);

    const largeImage = new Image();
    largeImage.onload = () => {
      setLoadingImage(false);
    };
    largeImage.onerror = () => {
      setLoadingImage(false);
      console.error('Error loading image');
    };
    largeImage.src = image.largeImageURL;
  };

  const closeModal = () => setModalOpen(false);

  return (
    <>
      <GalleryListItem>
        <GalleryListImage
          onClick={openModal}
          src={image.webformatURL}
          alt={''}
        />
        <CustomModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          isLoadingImage={isLoadingImage}
          imageURL={image.largeImageURL}
        />
      </GalleryListItem>
    </>
  );
};

export default ImageGalleryItem;
