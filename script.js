document.addEventListener('DOMContentLoaded', () => {
    const yesButton = document.getElementById('yesButton');
    const noButton = document.getElementById('noButton');
    const successScreen = document.getElementById('successScreen');
    const optionsContainer = document.querySelector('.options-container');
    const questionContainer = document.querySelector('.question-container');

    let angryEmojiCount = 0;
    let yesButtonScale = 1; // Initial scale of YES button

    yesButton.addEventListener('click', growYesButton); // Click event for YES button
    noButton.addEventListener('click', moveNoButton);

    function growYesButton() {
        yesButtonScale += 0.2; // Increase scale by 0.2 on each tap
        yesButton.style.transform = `scale(${yesButtonScale})`;

        // Check if YES button has engulfed the screen (reached a large enough scale)
        if (yesButtonScale >= 5) { // Adjust threshold scale as needed
            yesButton.classList.add('engulfing'); // Trigger engulf animation
            setTimeout(showSuccess, 500); // Show success screen after engulf animation (adjust timeout as needed)
        }
    }

    function showSuccess() {
        optionsContainer.style.display = 'none';
        questionContainer.style.display = 'none';
        successScreen.classList.add('show');
        successScreen.querySelector('p').textContent = "Thank you, I love you bro fr🥺💋😍"; // Updated success message
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
