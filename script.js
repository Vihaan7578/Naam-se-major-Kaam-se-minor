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
        yesButton.classList.add('radiating'); // Start pink radiance animation

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
        yesButton.classList.remove('radiating'); // Stop radiance if released early
        holdTime = 0;
    }

    function showSuccess() {
        heartContainer.style.opacity = '0'; // Fade out heart
        setTimeout(() => {
            heartContainer.style.display = 'none'; // Hide heart after fade out
            successScreen.classList.add('show'); // Show success screen with fade in
        }, 1000); // Match transition time in CSS for smooth fade out
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
        const randomSaturation = Math.random() * 50 + 50; // Ensure saturation is not too low
        const randomLightness = Math.random() * 30 + 60; // Ensure lightness is not too low

        const randomColor = `hsl(${randomHue}, ${randomSaturation}%, ${randomLightness}%)`;
        noButton.style.backgroundColor = randomColor;
        noButton.querySelector('button').style.color = getContrastColor(randomColor); // Ensure text is readable
    }

    // Function to get contrasting text color (black or white) based on background color
    function getContrastColor(hexColor) {
        const rgb = hexToRgb(hexColor);
        if (!rgb) return '#000'; // Default to black if conversion fails
        const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
        return luminance > 0.5 ? '#000' : '#fff'; // Black for light backgrounds, white for dark
    }

    // Helper function to convert hex color to RGB
    function hexToRgb(hex) {
        // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
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
