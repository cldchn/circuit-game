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

    // Prevent custom card from being clickable (so input works)
    const customCard = document.querySelector('.custom-card');
    if (customCard) {
        customCard.addEventListener('click', (e) => {
            // Allow input and button clicks, prevent card click
            if (!e.target.matches('.custom-input') && !e.target.closest('.mission-btn')) {
                e.stopPropagation();
            }
        });
    }

    // Custom theme generator with AI
    const generateBtn = document.getElementById('generate-custom-btn');
    const customInput = document.getElementById('custom-theme-input');

    if (generateBtn && customInput) {
        generateBtn.addEventListener('click', async () => {
            const themeIdea = customInput.value.trim();

            if (!themeIdea) {
                showNotification('Please enter a theme first!', 'warning');
                customInput.focus();
                return;
            }

            // Show generating animation
            const buttonText = generateBtn.querySelector('span:first-child');
            const originalText = buttonText.textContent;
            buttonText.textContent = '✨ GENERATING...';
            generateBtn.disabled = true;

            try {
                // Generate custom theme using Claude API
                const customTheme = await generateCustomTheme(themeIdea);

                // Save the custom theme to localStorage
                localStorage.setItem('CUSTOM_THEME', JSON.stringify(customTheme));
                localStorage.setItem('selectedTheme', 'CUSTOM_THEME');

                // Show success and navigate
                showNotification(
                    `🎮 Your "${themeIdea}" adventure is ready! Launching in 2 seconds...`,
                    'success'
                );

                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 2000);

            } catch (error) {
                console.error('Theme generation error:', error);
                showNotification(
                    `⚠️ Couldn't generate your theme right now. This feature requires an API connection. \n\nTry one of our pre-made adventures instead!`,
                    'warning'
                );
                buttonText.textContent = originalText;
                generateBtn.disabled = false;
            }
        });

        // Allow Enter key to generate
        customInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                generateBtn.click();
            }
        });
    }

    // Generate custom theme using AI (placeholder - would need actual API integration)
    async function generateCustomTheme(themeIdea) {
        // This is a placeholder that demonstrates the structure
        // In production, this would call Claude API with a prompt like:
        // "Generate 5 progressive Arduino circuit challenges for a story about [themeIdea]"

        // For now, create a template-based theme
        const themeKey = themeIdea.toUpperCase().replace(/\s+/g, '_');
        const emoji = getThemeEmoji(themeIdea);

        return {
            name: `${emoji} ${themeIdea}`,
            description: `You're immersed in a ${themeIdea.toLowerCase()} adventure! Your circuit-building skills will save the day!`,
            testButtonText: `${emoji} Test System`,

            components: {
                'led-red': { name: 'Alert Signal', icon: '🔴', description: 'Critical warning indicator' },
                'led-green': { name: 'Status Light', icon: '💚', description: 'All systems operational' },
                'led-blue': { name: 'Activity Indicator', icon: '💙', description: 'System is active' },
                'resistor-220': { name: 'Power Control', icon: '⚡', description: 'Regulates current flow' },
                'resistor-1k': { name: 'Signal Filter', icon: '📊', description: 'Stabilizes inputs' },
                'motor': { name: 'Motor System', icon: '⚙️', description: 'Mechanical actuator' },
                'ultrasonic': { name: 'Distance Sensor', icon: '📡', description: 'Detects objects' },
                'button': { name: 'Control Button', icon: '🔘', description: 'Manual trigger' }
            },

            levels: [
                {
                    title: `${emoji} First Challenge!`,
                    story: `Welcome to your ${themeIdea} adventure! The alert system needs power. Get that red light working immediately!`,
                    task: "Connect the Alert Signal to bring the system online!",
                    requirements: ['Connect Alert Signal', 'Add Power Control'],
                    hint: "Alert systems use pin 13. Always add power control to protect components!",
                    requiredComponents: [
                        { type: 'led', color: 'red', pin: 13 },
                        { type: 'resistor', value: 220, pin: 13 }
                    ]
                },
                {
                    title: `💚 Systems Online`,
                    story: `Great work! Now we need the Status Light showing everything is operational in your ${themeIdea} mission.`,
                    task: "Get the Status Light working to confirm all systems!",
                    requirements: ['Connect Status Light', 'Add Power Control'],
                    hint: "Status indicators run on pin 12. Don't forget the power control!",
                    requiredComponents: [
                        { type: 'led', color: 'green', pin: 12 },
                        { type: 'resistor', value: 220, pin: 12 }
                    ]
                },
                {
                    title: `${emoji} Full System Check`,
                    story: `The situation is escalating! You need ALL three indicators operational: Alert, Status, and Activity lights.`,
                    task: "Set up the complete indicator system!",
                    requirements: ['Alert Signal (pin 13)', 'Status Light (pin 12)', 'Activity Indicator (pin 11)', 'Power Controls for all'],
                    hint: "Red=13, Green=12, Blue=11. Each light needs its own power control!",
                    requiredComponents: [
                        { type: 'led', color: 'red', pin: 13 },
                        { type: 'led', color: 'green', pin: 12 },
                        { type: 'led', color: 'blue', pin: 11 },
                        { type: 'resistor', value: 220, pin: 13 },
                        { type: 'resistor', value: 220, pin: 12 },
                        { type: 'resistor', value: 220, pin: 11 }
                    ]
                },
                {
                    title: `🎮 Manual Control`,
                    story: `You need manual control! Connect the Control Button to operate the Motor System for your ${themeIdea} challenge.`,
                    task: "Wire the Control Button to activate the Motor System.",
                    requirements: ['Connect Control Button (input 2)', 'Connect Motor System (output 9)', 'Add Signal Filter'],
                    hint: "Buttons use input pin 2. Motors need PWM pin 9. The filter prevents false triggers!",
                    requiredComponents: [
                        { type: 'button', pin: 2 },
                        { type: 'resistor', value: 1000, pin: 2 },
                        { type: 'motor', pin: 9 }
                    ]
                },
                {
                    title: `${emoji} Automatic Detection`,
                    story: `Final challenge! Set up the Distance Sensor to automatically trigger the Alert Signal. This is advanced ${themeIdea} tech!`,
                    task: "Install automatic alert activation using the Distance Sensor.",
                    requirements: ['Connect Distance Sensor (pins 6 & 7)', 'Connect Alert Signal (pin 13)', 'Add Power Control'],
                    hint: "Sensors use pins 6 and 7. When an object is detected, the alert activates automatically!",
                    requiredComponents: [
                        { type: 'ultrasonic', pin: 6, pin2: 7 },
                        { type: 'led', color: 'red', pin: 13 },
                        { type: 'resistor', value: 220, pin: 13 }
                    ]
                }
            ]
        };
    }

    // Helper to get appropriate emoji for theme
    function getThemeEmoji(theme) {
        const themeWords = theme.toLowerCase();
        if (themeWords.includes('zombie') || themeWords.includes('horror')) return '🧟';
        if (themeWords.includes('pirate') || themeWords.includes('treasure')) return '🏴‍☠️';
        if (themeWords.includes('detective') || themeWords.includes('mystery')) return '🔍';
        if (themeWords.includes('dragon') || themeWords.includes('fantasy')) return '🐉';
        if (themeWords.includes('robot') || themeWords.includes('ai')) return '🤖';
        if (themeWords.includes('ocean') || themeWords.includes('underwater')) return '🌊';
        if (themeWords.includes('volcano') || themeWords.includes('fire')) return '🌋';
        if (themeWords.includes('ice') || themeWords.includes('arctic')) return '❄️';
        if (themeWords.includes('jungle') || themeWords.includes('safari')) return '🌴';
        if (themeWords.includes('ninja') || themeWords.includes('samurai')) return '🥷';
        if (themeWords.includes('wizard') || themeWords.includes('magic')) return '🧙';
        if (themeWords.includes('alien') || themeWords.includes('ufo')) return '👽';
        if (themeWords.includes('superhero') || themeWords.includes('comic')) return '🦸';
        return '⚡'; // Default
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

            .custom-notification.success {
                border-color: #10b981;
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
