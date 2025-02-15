const canvas = document.querySelector('#canvas'); // Вытягиваем канвас со страницы
const ctx = canvas.getContext('2d'); // возвращает рисовальный контекст HTML-канваса

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

    x = e.offsetX; // ивент mousemove передает информацию о положении мыши относительно канваса
    y = e.offsetY;

    if (!painting) { // если мы не рисуем, то смещаем точку начала линии
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else { // если мы рисуем, то
        ctx.lineTo(x, y); // создаем линию
        ctx.stroke(); // отрисовываем ее
    }
}

const onMouseDown = (e) => {
    e.preventDefault();

    startPainting();
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
