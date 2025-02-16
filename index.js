const canvas = document.querySelector('#canvas'); // Вытягиваем канвас со страницы
const ctx = canvas.getContext('2d'); // позволяет управлять пикселями HTML-канваса
const colors = document.querySelectorAll('.color');

canvas.width = 700; // размер канваса на HTML странице задан CSS, который JS не видит, поэтому отдельно задаем
canvas.height = 700;

ctx.lineWidth = 2.5; // начальная толщина линии
ctx.lineCap = 'round';
ctx.lineJoin = 'round';
ctx.strokeStyle = '2c2c2c'; // начальный цвет рисования

let painting = false; // начальное значение "не рисуем"

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

const onMouseDown = (e) => {
    e.preventDefault();

    startPainting();
}

const changeColor = (e) => {
    const computedStyle = window.getComputedStyle(e.target);
    // получаем высчитанный стиль из SCSS файла
    ctx.strokeStyle = computedStyle.backgroundColor;
    // присваиваем значение background-color к цвету линии
}

if (canvas) { // если канвас существует (прогрузился)
    canvas.addEventListener('mousemove', onMouseMove);
    // при движении курсора по канвасу, выполняем функцию onMouseMove()
    canvas.addEventListener('mousedown', onMouseDown);
    // при клике по канвасу
    canvas.addEventListener('mouseup', stopPainting);
    // при отпускании клика по канвасу
    canvas.addEventListener('mouseleave', stopPainting);
    // при покидании канваса остановить рисование
}

colors.forEach(color => { // кнопки выбора цвета
    color.addEventListener('click', changeColor);
})

