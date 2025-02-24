document.addEventListener('DOMContentLoaded', () => {
    const yesButton = document.getElementById('yesButton');
    const noButton = document.getElementById('noButton');
    const successScreen = document.getElementById('successScreen');
    const optionsContainer = document.querySelector('.options-container');
    const questionContainer = document.querySelector('.question-container');
    const partyPopper = document.querySelector('.party-popper'); // Get party popper element

    let angryEmojiCount = 0;
    let yesButtonScale = 1;

    yesButton.addEventListener('click', growYesButton);
    noButton.addEventListener('click', moveNoButton);

    function growYesButton() {
        yesButtonScale += 0.2;
        yesButton.style.transform = `scale(${yesButtonScale})`;

        if (yesButtonScale >= 5) {
            yesButton.classList.add('engulfing');
            setTimeout(showSuccess, 500);
        }
    }

    function showSuccess() {
        optionsContainer.style.display = 'none';
        questionContainer.style.display = 'none';
        successScreen.classList.add('show');
        successScreen.querySelector('.success-text').textContent = "Thank you, I love you bro fr🥺💋😍"; // Set success text
        partyPopper.style.display = 'block'; // Show party popper - Updated
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
        element.style.color = textColor;
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
