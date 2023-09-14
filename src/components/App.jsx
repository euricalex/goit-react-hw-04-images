import React, { useState, useEffect, useCallback } from 'react';
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
  const [debouncedSearchName, setDebouncedSearchName] = useState('');
  const [isSearchPerformed, setIsSearchPerformed] = useState(false); // Новое состояние
  const [isInitialLoad, setIsInitialLoad] = useState(true); // Новое состояние

  // Используем useCallback для создания мемоизированной функции debounce
  const debouncedSearch = useCallback(
    debounce((query) => {
      setDebouncedSearchName(query);
    }, 1000),
    []
  );

  useEffect(() => {
    if (searchName.trim() === '') {
      if (isSearchPerformed) {
        // Проверяем, что запрос пустой и поиск был выполнен
        toast.info('Enter a search query.', {
          position: toast.POSITION.TOP_RIGHT,
        });
        return;
      }
    }

    setCurrentPage(1); // Обнуляем currentPage при новом поиске
    setTotalPages(0);
    setIsLoading(true);
    setIsSearchPerformed(false); // Сбрасываем флаг, что поиск был выполнен

    // Обновляем debouncedSearchName с задержкой
    debouncedSearch(searchName);
  }, [searchName, debouncedSearch]);

  useEffect(() => {
    if (debouncedSearchName === '' || currentPage === 0) return;

    const loadImages = async () => {
      try {
        const data = await API.getImages(debouncedSearchName, currentPage);

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

    // Если это первая загрузка страницы (isInitialLoad), не выполняем загрузку изображений
    if (!isInitialLoad) {
      loadImages();
    } else {
      setIsInitialLoad(false);
    }
  }, [debouncedSearchName, currentPage, isInitialLoad]);

  const resetGallery = () => {
    setImages([]);
    setTotalPages(0);
    setCurrentPage(1); // Добавляем сброс currentPage при сбросе галереи
    setIsSearchPerformed(false); // Сбрасываем флаг поиска
    setSearchName(''); // Добавляем сброс searchName
  };

  const loadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <AppWrapper>
      <ToastContainer transition={Slide} />
      <SearchBar onSubmit={debouncedSearch} onReset={resetGallery} />
      {images.length > 0 && <ImageGallery images={images} />}

      {isLoading && !isInitialLoad && <Loader />} {/* Изменено здесь */}
      {images.length > 0 && totalPages !== currentPage && !isLoading && (
        <Button onClick={loadMore}>Load More</Button>
      )}
    </AppWrapper>
  );
}

export default App;

// Функция debounce для задержки вызова функций
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}
