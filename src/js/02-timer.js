import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const options = {
    enableTime: true, // Вмикає засіб вибору часу
    time_24hr: true, // Відображає засіб вибору часу в 24-годинному режимі без вибору AM/PM, якщо ввімкнено.
    defaultDate: new Date(), // Встановлює початкові вибрані дати.
    minuteIncrement: 1, // Регулює крок для введення хвилин (включно з прокручуванням)
    onClose(selectedDates) { // Функції, які запускаються щоразу, коли календар закривається.
        console.log("selectedDates[0]", selectedDates[0]); // Параметр selectedDates - це масив обраних дат, тому ми беремо перший елемент.
        if (options.defaultDate > selectedDates[0]) {
            startBtn.setAttribute('disabled', true);
            Notify.warning('Потрібно вводити дату, або час з майбутнього');
        }
        else {
            startBtn.removeAttribute('disabled');
        }
    },
};
flatpickr("#datetime-picker", options);

function convertMs(ms) {

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
};

const startBtn = document.querySelector('[data-start]');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');

let timerId = null;

startBtn.addEventListener('click', handlerCountdown);

function handlerCountdown() {
    startBtn.setAttribute('disabled', true);
    const selectedDate = new Date(document.querySelector('#datetime-picker').value);
    if (selectedDate <= new Date()) {
        Notify.failure('Виберіть майбутню дату');
        return;
    }
    timerId = setInterval(() => {
        const currentTime = new Date();
        const timeDifference = selectedDate - currentTime;

        if (timeDifference <= 0) {
            clearInterval(timerId);
            Notify.success('Таймер завершено');
            return;
        };

        const { days, hours, minutes, seconds } = convertMs(timeDifference);
        daysValue.textContent = addLeadingZero(days);
        hoursValue.textContent = addLeadingZero(hours);
        minutesValue.textContent = addLeadingZero(minutes);
        secondsValue.textContent = addLeadingZero(seconds);

    }, 1000);
};

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}