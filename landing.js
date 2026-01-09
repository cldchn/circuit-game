// Handle theme selection
document.addEventListener('DOMContentLoaded', () => {
    const themeButtons = document.querySelectorAll('.theme-btn');

    themeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const themeCard = e.target.closest('.theme-card');
            const themeName = themeCard.dataset.theme;

            // Visual feedback
            button.textContent = '🚀 Loading...';
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
    const themeCards = document.querySelectorAll('.theme-card');
    themeCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Only trigger if not clicking the button directly
            if (!e.target.classList.contains('theme-btn')) {
                const button = card.querySelector('.theme-btn');
                button.click();
            }
        });
    });
});
