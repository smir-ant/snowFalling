const particleCount = 100; // Устанавливаем количество снежинок
const sky = document.body; // Пространство, на котором будет снегопад
const canvas = document.createElement('canvas'); // Сам снег будет в canvas
const ctx = canvas.getContext('2d'); // Контекст рисования 2D
let width = sky.clientWidth; // ширину canvas
let height = sky.clientHeight; // высоту canvas
const snowflakes = []; // Массив для хранения снежинок

// Настраиваем стили для canvas
canvas.style.position = 'absolute';
canvas.style.zIndex = 999;
canvas.style.left = canvas.style.top = '0';
canvas.style.pointerEvents = "none";  // чтобы canvas поверх не мешал взаимодействию с сайта
sky.appendChild(canvas); // canvas закидываем в body

// Класс для создания и управления снежинками
class Snowflake {
    constructor() {
        this.reset(); // Инициализируем снежинку
    }

    reset() {
        // Устанавливаем начальные параметры снежинки
        this.x = Math.random() * width; // Случайная позиция по X
        this.y = Math.random() * -height; // Случайная позиция по Y (выше экрана)
        this.vy = 1 + Math.random() * 3; // Скорость(Y) [1; 4]
        this.vx = 0.5 - Math.random(); // Скорость(X) [-0.5; 0.5]
        this.r = 1 + Math.random() * 2; // Радиус снежинки [1; 3]
        this.o = 0.5 + Math.random() * 0.5; // Прозрачность снежинки [0.5; 1]
    }

    update() {
        // Обновляем позицию снежинки
        this.y += this.vy; // падение вниз
        this.x += this.vx; // в сторону

        // Если снежинка выходит за нижнюю границу экрана, сбрасываем её
        if (this.y > height) {
            this.reset();
        }
    }

    draw() {
        // Рисуем снежинку на canvas
        ctx.globalAlpha = this.o; // Устанавливаем прозрачность
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false); // Рисуем круг
        ctx.closePath();
        ctx.fill();
    }
}

// Функция для создания снежинок
function generateSnowFlakes() {
    for (let i = 0; i < particleCount; i++) {
        snowflakes.push(new Snowflake()); // создаём снежинку и в массив
    }
}

// Функция для обновления и перерисовки снежинок
function update() {
    ctx.clearRect(0, 0, width, height); // Очищаем canvas
    snowflakes.forEach(snowflake => {
        snowflake.update(); // Обновляем позицию снежинки
        snowflake.draw(); // Рисуем снежинку
    });
    requestAnimationFrame(update); // Запрашиваем следующий кадр анимации
}

// Функция для обновления размеров canvas при изменении размеров окна
function onResize() {
    width = sky.clientWidth; // Обновляем ширину canvas
    height = sky.clientHeight; // Обновляем высоту canvas
    canvas.width = width; // Устанавливаем новую ширину canvas
    canvas.height = height; // Устанавливаем новую высоту canvas
    ctx.fillStyle = '#FFF'; // Устанавливаем цвет рисования
}

// Добавляем обработчик события изменения размеров окна
window.addEventListener('resize', onResize, false);
onResize(); // Инициализируем размеры canvas
generateSnowFlakes(); // Создаем снежинки
update(); // Запускаем анимацию
