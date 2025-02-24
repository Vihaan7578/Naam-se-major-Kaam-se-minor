document.addEventListener('DOMContentLoaded', () => {
    const yesButton = document.getElementById('yesButton');
    const successScreen = document.getElementById('successScreen');
    const optionsContainer = document.querySelector('.options-container');
    const questionContainer = document.querySelector('.question-container');
    let holdTimer;
    let glowInterval;
    let holdTime = 0; // Track hold time in seconds

    yesButton.addEventListener('mousedown', startHold);
    yesButton.addEventListener('mouseup', endHold);
    yesButton.addEventListener('mouseleave', endHold); // In case mouse moves off during hold
    yesButton.addEventListener('touchstart', startHold); // Touch events for mobile
    yesButton.addEventListener('touchend', endHold);
    yesButton.addEventListener('touchcancel', endHold); // In case touch is cancelled


    function startHold(e) {
        e.preventDefault(); // Prevent default mouse/touch behavior
        holdTime = 0; // Reset hold time
        yesButton.classList.add('glowing'); // Start initial glow

        glowInterval = setInterval(() => {
            holdTime++;
            if (holdTime >= 4) {
                clearInterval(glowInterval);
                clearTimeout(holdTimer); // Clear any pending timer just in case
                showSuccess();
            } else {
                // You could progressively increase glow intensity here if desired
                // For simplicity, we're keeping it constant once 'glowing' class is added
            }
        }, 1000); // Check every 1 second

        holdTimer = setTimeout(() => {
            clearInterval(glowInterval); // Clear interval if timer finishes first (shouldn't happen in normal flow)
            showSuccess();
        }, 4000); // 4 seconds hold
    }

    function endHold() {
        clearInterval(glowInterval);
        clearTimeout(holdTimer);
        yesButton.classList.remove('glowing'); // Remove glow if hold is released early
        holdTime = 0; // Reset hold time
    }

    function showSuccess() {
        optionsContainer.style.display = 'none'; // Hide options
        questionContainer.style.display = 'none'; // Hide question
        successScreen.style.display = 'block'; // Show success screen
    }
});
