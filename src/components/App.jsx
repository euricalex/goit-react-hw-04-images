import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar/SearchBar';
import * as API from './api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppWrapper } from './App.styled';

export function App() {
  const [searchName, setSearchName] = useState('');
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (searchName.trim() === '') {
      return;
    }

    setCurrentPage(1);
    setTotalPages(0);
    setIsLoading(true);

    const loadImages = async () => {
      try {
        const data = await API.getImages(searchName, currentPage);

        if (data.hits.length === 0) {
          toast.dismiss();
          toast.info('Image was not found...', {
            position: toast.POSITION.TOP_RIGHT,
          });
          return;
        }

        const normalizedImages = API.normalizedImages(data.hits);

        setImages((prevImages) => [...prevImages, ...normalizedImages]);
        setTotalPages(data.totalPages);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    loadImages();
  }, [searchName, currentPage]);

  const handleSubmit = (query) => {
    if (query.trim() === '') {
      toast.info('Enter a search query.', {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    setSearchName(`${Date.now()}/${query}`);
    setImages([]);
    setCurrentPage(1);
  };

  const resetGallery = () => {
    setImages([]);
    setTotalPages(0);
    setCurrentPage(1);
    setSearchName('');
  };

  const loadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <AppWrapper>
      <ToastContainer transition={Slide} />
      <SearchBar onSubmit={handleSubmit} onReset={resetGallery} />
      {images.length > 0 && <ImageGallery images={images} />}

      {isLoading && <Loader />}
      {images.length > 0 && totalPages !== currentPage && !isLoading && (
        <Button onClick={loadMore} />
      )}
    </AppWrapper>
  );
}

export default App;
