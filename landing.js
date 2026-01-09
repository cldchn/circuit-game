// Handle mission selection
document.addEventListener('DOMContentLoaded', () => {
    const missionButtons = document.querySelectorAll('.mission-btn:not(#generate-custom-btn)');

    missionButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const missionCard = e.target.closest('.mission-card');
            const themeName = missionCard.dataset.theme;

            if (!themeName) return; // Skip if no theme (custom card)

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

    // Add click handler to entire cards as well (except custom card)
    const missionCards = document.querySelectorAll('.mission-card:not(.custom-card)');
    missionCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Only trigger if not clicking the button directly
            if (!e.target.closest('.mission-btn')) {
                const button = card.querySelector('.mission-btn');
                button.click();
            }
        });
    });

    // Custom theme generator
    const generateBtn = document.getElementById('generate-custom-btn');
    const customInput = document.getElementById('custom-theme-input');

    if (generateBtn && customInput) {
        generateBtn.addEventListener('click', () => {
            const theme = customInput.value.trim();

            if (!theme) {
                showNotification('Please enter a theme first!', 'warning');
                customInput.focus();
                return;
            }

            // Show generating animation
            const buttonText = generateBtn.querySelector('span:first-child');
            const originalText = buttonText.textContent;
            buttonText.textContent = '✨ GENERATING...';
            generateBtn.disabled = true;

            // Simulate theme generation (in a real app, this would call an AI API)
            setTimeout(() => {
                showNotification(
                    `🎮 Custom "${theme}" theme coming soon! For now, try one of our pre-made adventures. \n\n💡 This feature requires AI integration to generate unique storylines. Check back later!`,
                    'info'
                );
                buttonText.textContent = originalText;
                generateBtn.disabled = false;
                customInput.value = '';
            }, 1500);
        });

        // Allow Enter key to generate
        customInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                generateBtn.click();
            }
        });
    }
});

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existing = document.querySelector('.custom-notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = `custom-notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <p>${message.replace(/\n/g, '<br>')}</p>
            <button class="notification-close">×</button>
        </div>
    `;

    document.body.appendChild(notification);

    // Add styles
    if (!document.getElementById('notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .custom-notification {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(135deg, #1a1f3a 0%, #0f1528 100%);
                border: 2px solid #8b5cf6;
                border-radius: 15px;
                padding: 30px;
                max-width: 500px;
                width: 90%;
                z-index: 10000;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
                animation: slideIn 0.3s ease-out;
            }

            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: translate(-50%, -60%);
                }
                to {
                    opacity: 1;
                    transform: translate(-50%, -50%);
                }
            }

            @keyframes slideOut {
                from {
                    opacity: 1;
                    transform: translate(-50%, -50%);
                }
                to {
                    opacity: 0;
                    transform: translate(-50%, -40%);
                }
            }

            .custom-notification.warning {
                border-color: #f59e0b;
            }

            .notification-content {
                color: white;
                position: relative;
            }

            .notification-content p {
                margin: 0;
                line-height: 1.7;
                font-size: 1.1em;
            }

            .notification-close {
                position: absolute;
                top: -10px;
                right: -10px;
                background: #8b5cf6;
                border: none;
                color: white;
                width: 30px;
                height: 30px;
                border-radius: 50%;
                font-size: 1.5em;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s;
            }

            .notification-close:hover {
                background: #6d28d9;
                transform: rotate(90deg);
            }
        `;
        document.head.appendChild(styles);
    }

    // Close button handler
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    });

    // Auto-close after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}
