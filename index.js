const canvas = document.querySelector('#canvas'); // Вытягиваем канвас со страницы
const ctx = canvas.getContext('2d'); // позволяет управлять пикселями HTML-канваса
const controls = document.querySelector('.controls');
const range = document.querySelector('#range');
const mode = document.querySelector('#mode-button');

// Значения по-умолчанию

const initialColor = '#2c2c2c'

// Размер канваса на HTML странице задан CSS, который JS не видит, поэтому отдельно задаем
canvas.width = 700;
canvas.height = 700;

ctx.lineWidth = 5.0; // начальная толщина линии
ctx.lineCap = 'round';
ctx.lineJoin = 'round';
ctx.strokeStyle = initialColor; // начальный цвет рисования
ctx.fillStyle = initialColor; // начальный цвет заливки

let painting = false; // начальное значение "не рисуем"
let filling = false; // начальное значение "не заливаем"

// Функции, обрабатывающие логику рисования

const stopPainting = () => {
    painting = false;
}

const startPainting = () => {
    painting = true;
}

const onMouseMove = (e) => {
    e.preventDefault();

    let x = e.offsetX; // ивент mousemove передает информацию о положении мыши относительно канваса
    let y = e.offsetY;

    if (!painting) { // если мы не рисуем, то смещаем точку начала линии
        ctx.beginPath(); // позволяет задать стартовую точку, откуда начнется рисование
        ctx.moveTo(x, y); // перемещает эту стартовую точку к курсору
    } else { // если мы рисуем, то
        ctx.lineTo(x, y); // создаем линию (длинной в 1 пиксель)
        ctx.stroke(); // отрисовываем ее
    }
}

const onMouseDown = () => {
    if (!filling) {
        startPainting();
    } else if (filling) {
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

// Изменение цвета линий
const changeColor = (e) => {
    const computedStyle = window.getComputedStyle(e.target);
    // получаем высчитанный стиль из SCSS файла
    ctx.strokeStyle = computedStyle.backgroundColor;
    // присваиваем значение background-color к цвету линии
    ctx.fillStyle = computedStyle.backgroundColor;
    // присваиваем значение background-color к цвету заливки
}

// Настройка толщины линии
const changeRange = (e) => {
    ctx.lineWidth = e.target.value;
}

// Переключение режимов рисования
const changeMode = () => {
    filling = !filling; // Переключает режим Рисование/Заливка
    // Обрабатывает текст кнопки в соответствии с режимом
    if (!filling) {
        mode.textContent = "Заливка";
    } else if (filling) {
        mode.textContent = "Рисование";
    }
}

// Заливка канваса белым цветом
const fillWhite = () => {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = ctx.strokeStyle // возвращает выбранный цвет заливки
}

fillWhite(); // Вызываем единожды всегда, иначе при сохранении картинки фон будет прозрачным

// Предотвращаем вызов контекстного меню при клике ПКМ по канвасу
const contextMenu = (e) => {
    e.preventDefault();
}

// Функция сохранения рисунка в файл
const saveAs = () => {
    const link = document.createElement('a');
    // создает виртуальный HTML элемент ссылки
    link.href = canvas.toDataURL('image/png');
    // с помощью метода .toDataURL('image/png') преобразует данные из канваса в PNG файл
    link.download = 'PaintJS export';
    // задает название файла по-умолчанию
    link.click();
    // кликает по виртуальное ссылке
}

// Обработчики событий:

if (canvas) { // если канвас существует (прогрузился)
    canvas.addEventListener('mousemove', onMouseMove);
    // при движении курсора по канвасу, выполняем функцию onMouseMove()
    canvas.addEventListener('mousedown', onMouseDown);
    // при клике по канвасу
    canvas.addEventListener('mouseup', stopPainting);
    // при отпускании клика по канвасу
    canvas.addEventListener('mouseleave', stopPainting);
    // при покидании канваса остановить рисование
    canvas.addEventListener('contextmenu', contextMenu);
}

// Обработчики событий кликов по элементам меню:
controls.addEventListener('click', (e) => {
    if (e.target.classList.contains('color')) {
        changeColor(e);
    } else if (e.target.id === 'mode-button') {
        changeMode();
    } else if (e.target.id === 'clear-button') {
        fillWhite();
    } else if (e.target.id === 'save-button') {
        saveAs();
    }
});

// Обработчик события изменения положения ползунка range
if (range) {
    range.addEventListener('input', changeRange);
}
