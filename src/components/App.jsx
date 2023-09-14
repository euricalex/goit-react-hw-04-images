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
      toast.info('Enter a search query.', {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    setSearchName(`${Date.now()}/${searchName}`);
    setImages([]);
    setCurrentPage(1);
    setTotalPages(0); // Добавляем сброс totalPages при изменении searchName
  }, [searchName]);

  useEffect(() => {
    if (searchName === '' || currentPage === 0) return;

    const loadImages = async () => {
      try {
        setIsLoading(true);

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
        setIsLoading(false);
      } catch (error) {
        console.error(error); // Выводим ошибку в консоль
        setIsLoading(false);
      }
    };

    // Додайте затримку перед викликом функції
    const debouncedLoadImages = debounce(loadImages, 1000); // 1000 мілісекунд (1 секунда)

    debouncedLoadImages();

    loadImages();
  }, [searchName, currentPage]);

  const resetGallery = () => {
    setImages([]);
    setTotalPages(0); // Добавляем сброс totalPages при сбросе галереи
  };

  const loadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <AppWrapper>
      <ToastContainer transition={Slide} />
      <SearchBar onSubmit={setSearchName} onReset={resetGallery} />
      {images.length > 0 && <ImageGallery images={images} />}

      {isLoading && <Loader />}
      {images.length > 0 && totalPages !== currentPage && !isLoading && (
        <Button onClick={loadMore} />
      )}
    </AppWrapper>
  );
}

export default App;

// Функція debounce для затримки викликів функцій
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}
