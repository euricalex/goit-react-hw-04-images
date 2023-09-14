import axios from "axios";

// Встановлення базової URL для всіх HTTP-запитів до API
axios.defaults.baseURL = 'https://pixabay.com/api/';

// API-ключ для доступу до API Pixabay
const API_KEY = '38243534-5c7cfe447b5c7a0fae0b6f146';

// Кількість зображень на одній сторінці
const perPage = 12;

// Функція для отримання зображень з API
export const getImages = async (query, page) => {
// Вирізаємо ідентифікатор запиту
   const trimmedRequest = query.slice(query.indexOf('/') + 1);
   // Виконуємо запит до API Pixabay з вказаними параметрами
   const response = await axios.get(
      `?key=${API_KEY}&q=${trimmedRequest}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
   );
   return response.data; // Повертаємо дані відповіді з API
};


// Функція для нормалізації масиву зображень
export const normalizedImages = imagesArray =>
   imagesArray.map(({ id, webformatURL, largeImageURL }) => {
     // У відповіді від апі приходить масив об'єктів, в яких тобі цікаві лише наступні властивості
      return { id, webformatURL, largeImageURL };
   });