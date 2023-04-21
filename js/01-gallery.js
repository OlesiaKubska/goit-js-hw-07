import { galleryItems } from './gallery-items.js'; //Ця функція імпортує необхідний масив даних з модуля gallery-items.js.
// Change code below this line
const gallery = document.querySelector('.gallery'); //створюємо змінну gallery, щоб зберігати посилання на елемент ul зі списком елементів галереї
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

//onGalleryItemClick викликається при кліку на елемент галереї та запускає модальне вікно з зображенням в оригінальному розмірі. 
function onGalleryItemClick(e) {
    e.preventDefault();
//перевіряє, чи був клік зроблений на зображенні (елементі img),
    const img = e.target;
    if (img.nodeName !== 'IMG') {
        return;
    }
//створює новий екземпляр модального вікна з бібліотеки basicLightbox 
    const instance = basicLightbox.create(`
        <div class="modal">
            <img src="${img.dataset.source}" class="modal__image" alt="${img.alt}" />
        </div>
    `);
    
    instance.show();

    document.addEventListener('keydown', onModalClose); //додає обробник події keydown для закриття модального вікна при натисканні клавіші Escape.
}


//onModalClose  викликається при натисканні клавіші Escape під час відкритого модального вікна. 
function onModalClose(e) {
    if (e.code !== 'Escape') {
        return;
    }


    document.removeEventListener('keydown', onModalClose); //видаляє обробник події keydown, щоб не викликати цю функцію більше.
}


gallery.append(...createGallery(galleryItems)); //додає до галереї усі створені елементи зображень, створені за допомогою функції createGallery.

gallery.addEventListener('click', onGalleryItemClick); //додає обробник події click до галереї, який викликає функцію onGalleryItemClick для обробки кліків на елементах галереї.

//виводить масив galleryItems в консоль, щоб переконатися, що дані були імпортовані правильно
console.log(galleryItems);
