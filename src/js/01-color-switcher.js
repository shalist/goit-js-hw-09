function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
const bodyColor = document.body;

stopButton.setAttribute('disabled', '');

let changeColor = null;

startButton.addEventListener("click", handlerStartBtn);

function handlerStartBtn() {
    startButton.setAttribute('disabled', true);
    stopButton.removeAttribute('disabled');
    changeColor = setInterval(() => {
        bodyColor.style.backgroundColor = getRandomHexColor();
        getRandomHexColor()
    }, 1000);
};

stopButton.addEventListener('click', () => {
    clearInterval(changeColor);
    stopButton.setAttribute('disabled', true);
    startButton.removeAttribute('disabled');
});