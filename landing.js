// Handle mission selection
document.addEventListener('DOMContentLoaded', () => {
    const missionButtons = document.querySelectorAll('.mission-btn');

    missionButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const missionCard = e.target.closest('.mission-card');
            const themeName = missionCard.dataset.theme;

            // Visual feedback - change button text
            const buttonText = button.querySelector('span:first-child');
            buttonText.textContent = '🚀 LOADING...';
            button.disabled = true;
            button.style.opacity = '0.7';

            // Save selected theme to localStorage
            localStorage.setItem('selectedTheme', themeName);

            // Small delay for visual feedback, then navigate
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 300);
        });
    });

    // Add click handler to entire cards as well
    const missionCards = document.querySelectorAll('.mission-card');
    missionCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Only trigger if not clicking the button directly
            if (!e.target.closest('.mission-btn')) {
                const button = card.querySelector('.mission-btn');
                button.click();
            }
        });
    });
});
