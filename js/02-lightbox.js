import { galleryItems } from './gallery-items.js';
// Change code below this line

// Створюємо функцію, яка генерує розмітку HTML для елементів галереї
function createGalleryItemsMarkup(items) {
    return items.map(({ preview, original, description }) => `
        <li class="gallery__item">
            <a class="gallery__link" href="${original}">
                <img class="gallery__image" src="${preview}" alt="${description}" />
            </a>
        </li>
    `).join('');
} // Функція повертає рядок, який містить HTML-розмітку елементів галереї.

// Вибераємо елемент контейнера галереї та візуалізуємо елементи галереї
const galleryContainer = document.querySelector('.gallery');
galleryContainer.insertAdjacentHTML('beforeend', createGalleryItemsMarkup(galleryItems)); //використовуємо метод insertAdjacentHTML() для вставки HTML-розмітки елементів галереї до вмісту контейнера.

  // Ініціалізуємо SimpleLightbox після відтворення галереї
  // селектор, за допомогою якого визначається список посилань для створення легкого боксу
const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt', //параметр captionsData вказує, що значення атрибута alt має використовуватись в якості підпису зображення
    captionDelay: 250, // параметр captionDelay встановлює затримку в мілісекундах перед відображенням підпису
});

//виводиться масив galleryItems

console.log(galleryItems);
