document.addEventListener('DOMContentLoaded', () => {
    const yesButton = document.getElementById('yesButton');
    const noButton = document.getElementById('noButton');
    const successScreen = document.getElementById('successScreen');
    const optionsContainer = document.querySelector('.options-container'); // Get options container
    const questionContainer = document.querySelector('.question-container'); // Get question container
    let holdTimer;
    let engulfInterval;
    let holdTime = 0;
    let angryEmojiCount = 0;

    yesButton.addEventListener('mousedown', startEngulf);
    yesButton.addEventListener('mouseup', endEngulf);
    yesButton.addEventListener('mouseleave', endEngulf);
    yesButton.addEventListener('touchstart', startEngulf);
    yesButton.addEventListener('touchend', endEngulf);
    yesButton.addEventListener('touchcancel', endEngulf);

    noButton.addEventListener('click', moveNoButton);

    function startEngulf(e) {
        e.preventDefault();
        holdTime = 0;
        yesButton.classList.add('engulfing'); // Start engulfing animation

        engulfInterval = setInterval(() => {
            holdTime++;
            if (holdTime >= 3) { // 3 seconds hold now
                clearInterval(engulfInterval);
                clearTimeout(holdTimer);
                showSuccess();
            }
        }, 1000);

        holdTimer = setTimeout(() => {
            clearInterval(engulfInterval);
            showSuccess();
        }, 3000); // 3 seconds hold
    }

    function endEngulf() {
        clearInterval(engulfInterval);
        clearTimeout(holdTimer);
        yesButton.classList.remove('engulfing'); // Stop engulfing if released early
        holdTime = 0;
    }

    function showSuccess() {
        optionsContainer.style.display = 'none'; // Hide options
        questionContainer.style.display = 'none'; // Hide question
        successScreen.classList.add('show'); // Show success screen
    }

    function moveNoButton() {
        angryEmojiCount++;
        noButton.querySelector('button').textContent = "Nooo🥺 " + "😡".repeat(angryEmojiCount);

        const maxX = window.innerWidth - noButton.offsetWidth;
        const maxY = window.innerHeight - noButton.offsetHeight;

        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;

        noButton.style.left = randomX + 'px';
        noButton.style.top = randomY + 'px';

        // Randomize Colors
        const randomHue = Math.random() * 360;
        const randomSaturation = Math.random() * 50 + 50;
        const randomLightness = Math.random() * 30 + 60;

        const randomColor = `hsl(${randomHue}, ${randomSaturation}%, ${randomLightness}%)`;
        noButton.style.backgroundColor = randomColor;
        adjustTextColorForBackground(noButton);
    }

    // Function to adjust text color based on background luminance
    function adjustTextColorForBackground(element) {
        const bgColor = getComputedStyle(element).backgroundColor;
        const textColor = getContrastColor(bgColor);
        element.style.color = textColor; // For success screen and NO button text
    }

    // Function to get contrasting text color
    function getContrastColor(bgColor) {
        const rgbMatch = bgColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/);
        if (!rgbMatch) return '#000';

        const r = parseInt(rgbMatch[1]);
        const g = parseInt(rgbMatch[2]);
        const b = parseInt(rgbMatch[3]);

        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        return luminance > 0.5 ? '#000' : '#fff';
    }
});
