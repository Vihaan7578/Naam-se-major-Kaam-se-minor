document.addEventListener('DOMContentLoaded', () => {
    const yesButton = document.getElementById('yesButton');
    const noButton = document.getElementById('noButton');
    const successScreen = document.getElementById('successScreen');
    const heartContainer = document.querySelector('.heart-container');
    let holdTimer;
    let radianceInterval;
    let holdTime = 0;
    let angryEmojiCount = 0;

    yesButton.addEventListener('mousedown', startRadiance);
    yesButton.addEventListener('mouseup', endRadiance);
    yesButton.addEventListener('mouseleave', endRadiance);
    yesButton.addEventListener('touchstart', startRadiance);
    yesButton.addEventListener('touchend', endRadiance);
    yesButton.addEventListener('touchcancel', endRadiance);

    noButton.addEventListener('click', moveNoButton);

    function startRadiance(e) {
        e.preventDefault();
        holdTime = 0;
        yesButton.classList.add('radiating');

        radianceInterval = setInterval(() => {
            holdTime++;
            if (holdTime >= 4) {
                clearInterval(radianceInterval);
                clearTimeout(holdTimer);
                showSuccess();
            }
        }, 1000);

        holdTimer = setTimeout(() => {
            clearInterval(radianceInterval);
            showSuccess();
        }, 4000);
    }

    function endRadiance() {
        clearInterval(radianceInterval);
        clearTimeout(holdTimer);
        yesButton.classList.remove('radiating');
        holdTime = 0;
    }

    function showSuccess() {
        heartContainer.style.opacity = '0';
        setTimeout(() => {
            heartContainer.style.display = 'none';
            successScreen.classList.add('show');
            adjustTextColorForBackground(successScreen); // Adjust success screen text color
        }, 1000);
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
        adjustTextColorForBackground(noButton); // Adjust No button text color dynamically
    }

    // Function to adjust text color based on background luminance
    function adjustTextColorForBackground(element) {
        const bgColor = getComputedStyle(element).backgroundColor;
        const textColor = getContrastColor(bgColor);
        element.style.color = textColor; // For success screen (paragraph)
        const button = element.querySelector('button'); // For heart options (buttons)
        if (button) {
            button.style.color = textColor;
        }
    }


    // Function to get contrasting text color (black or white) based on background color
    function getContrastColor(bgColor) {
        const rgbMatch = bgColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/);
        if (!rgbMatch) return '#000'; // Default to black if RGB parsing fails

        const r = parseInt(rgbMatch[1]);
        const g = parseInt(rgbMatch[2]);
        const b = parseInt(rgbMatch[3]);

        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        return luminance > 0.5 ? '#000' : '#fff'; // Black for light backgrounds, white for dark
    }

    // Helper function to convert hex color to RGB (Not used directly now, but kept for reference if needed)
    function hexToRgb(hex) {
        const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function(m, r, g, b) {
            return r + r + g + g + b + b;
        });

        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }
});
