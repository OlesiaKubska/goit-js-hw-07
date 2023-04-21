import { galleryItems } from './gallery-items.js';//Ця функція імпортує необхідний масив даних з модуля gallery-items.js.

// Change code below this line

const galleryList = document.querySelector('.gallery'); //створюємо змінну galleryList, щоб зберігати посилання на елемент ul зі списком елементів галереї
const galleryElements = createGallery(galleryItems);
galleryList.append(...galleryElements);

galleryList.addEventListener('click', onGalleryItemClick);

//створимо функцію createGallery, яка приймає масив зображень та генерує розмітку для кожного елемента галереї
function createGallery(items) {
    return items
        //використовуємо метод map для перетворення кожного елемента масиву galleryItems в HTML-розмітку
        .map(({ preview, original, description }) => {
            const item = document.createElement('li'); //створює необхідні DOM-елементи лист li та додає їх до дерева DOM
            item.classList.add('gallery__item');

            const link = document.createElement('a'); //створює необхідні DOM-елементи посилання a та додає їх до дерева DOM.
            link.classList.add('gallery__link');
            link.href = original;

            const image = document.createElement('img'); //створює необхідні DOM-елементи зображення img та додає їх до дерева DOM.
            image.classList.add('gallery__image');
            image.src = preview;
            image.dataset.source = original;
            image.alt = description;
// Результатом виконання функції є новий масив з DOM-елементами, який додається до елементу ul з класом .gallery за допомогою методу append.
            link.appendChild(image);
            item.appendChild(link);
            
            return item;
        });
}

//створює новий екземпляр модального вікна з бібліотеки basicLightbox 
const instance = basicLightbox.create(`
    <img width="1280" height="auto" src="">`, {
        onShow: (instance) => {
        window.addEventListener('keydown', onEscKeyPress);
        },
        onClose: (instance) => {
        window.removeEventListener('keydown', onEscKeyPress);
        },
    }
);

//onGalleryItemClick викликається при кліку на елемент галереї та запускає модальне вікно з зображенням в оригінальному розмірі.
function onGalleryItemClick(e) {
    e.preventDefault();
    //перевіряє, чи був клік зроблений на зображенні (елементі img),
    const datasetSource = e.target.dataset.source;
    if (!datasetSource) return;
    instance.element().querySelector('img').src = datasetSource;
    
    instance.show();
}

function onEscKeyPress(e) {
    if (e.code !== 'Escape') return;
    instance.close();
}

//виводить масив galleryItems в консоль, щоб переконатися, що дані були імпортовані правильно
console.log(galleryItems);