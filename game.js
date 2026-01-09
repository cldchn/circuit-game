// Game State
const gameState = {
    currentLevel: 0,
    score: 0,
    placedComponents: [],
    connections: [],
    wires: [],
    draggingComponent: null,
    isTestRunning: false,
    testInterval: null,
    wireMode: false,
    wireStartPoint: null
};

// Get themed component name
function getThemedComponent(baseId) {
    const themeData = ACTIVE_THEME.components[baseId];
    return themeData || { name: baseId, icon: '❓', description: 'Unknown' };
}

// Component Definitions with themed overlay
const COMPONENTS = {
    LED_RED: {
        id: 'led-red',
        baseType: 'led',
        color: 'red',
        type: 'led',
        pins: 2,
        get name() { return getThemedComponent('led-red').name; },
        get icon() { return getThemedComponent('led-red').icon; }
    },
    LED_GREEN: {
        id: 'led-green',
        baseType: 'led',
        color: 'green',
        type: 'led',
        pins: 2,
        get name() { return getThemedComponent('led-green').name; },
        get icon() { return getThemedComponent('led-green').icon; }
    },
    LED_BLUE: {
        id: 'led-blue',
        baseType: 'led',
        color: 'blue',
        type: 'led',
        pins: 2,
        get name() { return getThemedComponent('led-blue').name; },
        get icon() { return getThemedComponent('led-blue').icon; }
    },
    RESISTOR_220: {
        id: 'resistor-220',
        baseType: 'resistor',
        type: 'resistor',
        value: 220,
        pins: 2,
        get name() { return getThemedComponent('resistor-220').name; },
        get icon() { return getThemedComponent('resistor-220').icon; }
    },
    RESISTOR_1K: {
        id: 'resistor-1k',
        baseType: 'resistor',
        type: 'resistor',
        value: 1000,
        pins: 2,
        get name() { return getThemedComponent('resistor-1k').name; },
        get icon() { return getThemedComponent('resistor-1k').icon; }
    },
    MOTOR: {
        id: 'motor',
        baseType: 'motor',
        type: 'motor',
        pins: 2,
        get name() { return getThemedComponent('motor').name; },
        get icon() { return getThemedComponent('motor').icon; }
    },
    ULTRASONIC: {
        id: 'ultrasonic',
        baseType: 'sensor',
        type: 'sensor',
        pins: 4,
        pinNames: ['VCC', 'TRIG', 'ECHO', 'GND'],
        get name() { return getThemedComponent('ultrasonic').name; },
        get icon() { return getThemedComponent('ultrasonic').icon; }
    },
    BUTTON: {
        id: 'button',
        baseType: 'button',
        type: 'button',
        pins: 2,
        get name() { return getThemedComponent('button').name; },
        get icon() { return getThemedComponent('button').icon; }
    },
    WIRE: {
        id: 'wire',
        baseType: 'wire',
        type: 'wire',
        name: 'Jumper Wire',
        icon: '🔌',
        pins: 2
    }
};

// Get challenges from active theme
function getChallenges() {
    if (!ACTIVE_THEME || !ACTIVE_THEME.levels) {
        console.error('ACTIVE_THEME not properly initialized:', ACTIVE_THEME);
        return [];
    }
    return ACTIVE_THEME.levels;
}

// Old challenges array kept for reference
const CHALLENGES_OLD = [
    {
        id: 1,
        title: "Light Up Your First LED",
        description: "Welcome to your first circuit! Connect a red LED to the Arduino to make it light up. Remember: LEDs have polarity - the longer leg (anode) connects to positive, and the shorter leg (cathode) connects to ground through a resistor.",
        requirements: [
            "Place a Red LED on the breadboard",
            "Add a 220Ω resistor",
            "Connect LED anode to Arduino pin 13",
            "Connect resistor to LED cathode",
            "Connect resistor to GND"
        ],
        hint: "Start by placing the LED on the breadboard. Connect pin 13 to the LED's anode (positive leg), then connect the cathode through a 220Ω resistor to ground (GND).",
        requiredComponents: ['led-red', 'resistor-220'],
        validation: {
            components: {
                'led-red': 1,
                'resistor-220': 1
            },
            connections: [
                { from: 'D13', to: 'led-red', type: 'anode' },
                { from: 'led-red', to: 'resistor-220', type: 'cathode' },
                { from: 'resistor-220', to: 'GND', type: 'ground' }
            ]
        }
    },
    {
        id: 2,
        title: "Traffic Light - Multiple LEDs",
        description: "Create a simple traffic light system using three LEDs (red, green, and blue). Each LED needs its own resistor to limit current and prevent burnout.",
        requirements: [
            "Place Red, Green, and Blue LEDs",
            "Add three 220Ω resistors (one per LED)",
            "Connect Red LED to pin 13",
            "Connect Green LED to pin 12",
            "Connect Blue LED to pin 11",
            "All cathodes connect to GND through resistors"
        ],
        hint: "Each LED needs its own digital pin and resistor. Use pins 13, 12, and 11. All ground connections can share the same ground rail.",
        requiredComponents: ['led-red', 'led-green', 'led-blue', 'resistor-220', 'resistor-220', 'resistor-220'],
        validation: {
            components: {
                'led-red': 1,
                'led-green': 1,
                'led-blue': 1,
                'resistor-220': 3
            },
            connections: [
                { from: 'D13', to: 'led-red' },
                { from: 'D12', to: 'led-green' },
                { from: 'D11', to: 'led-blue' }
            ]
        }
    },
    {
        id: 3,
        title: "Button Control",
        description: "Add a button to control an LED. When the button is pressed, it completes the circuit. You'll need a pull-down resistor to keep the input stable when the button isn't pressed.",
        requirements: [
            "Place a push button",
            "Add an LED with resistor",
            "Add a 1kΩ pull-down resistor",
            "Connect button to digital pin 2",
            "Connect LED to pin 13",
            "Wire button to 5V power"
        ],
        hint: "The button connects between 5V and pin 2. The 1kΩ resistor connects pin 2 to ground (pull-down). The LED circuit is separate, connected to pin 13.",
        requiredComponents: ['button', 'led-red', 'resistor-220', 'resistor-1k'],
        validation: {
            components: {
                'button': 1,
                'led-red': 1,
                'resistor-220': 1,
                'resistor-1k': 1
            },
            connections: [
                { from: '5V', to: 'button' },
                { from: 'button', to: 'D2' },
                { from: 'D13', to: 'led-red' }
            ]
        }
    },
    {
        id: 4,
        title: "Motor Control",
        description: "Control a DC motor using a PWM pin. Motors draw more current than LEDs, but we'll simulate basic control. PWM (Pulse Width Modulation) allows you to control motor speed.",
        requirements: [
            "Place a DC motor",
            "Connect motor positive to PWM pin 9",
            "Connect motor negative to GND",
            "Ensure proper power connections"
        ],
        hint: "Motors need PWM pins for speed control. Pin 9 is a PWM pin (marked with ~). Connect one motor terminal to pin 9 and the other to ground.",
        requiredComponents: ['motor'],
        validation: {
            components: {
                'motor': 1
            },
            connections: [
                { from: 'D9', to: 'motor' },
                { from: 'motor', to: 'GND' }
            ]
        }
    },
    {
        id: 5,
        title: "Ultrasonic Distance Sensor",
        description: "Wire an ultrasonic sensor to measure distance. This sensor has 4 pins: VCC (power), TRIG (trigger), ECHO (echo receive), and GND (ground). It's commonly used in robotics for obstacle detection.",
        requirements: [
            "Place ultrasonic sensor",
            "Connect VCC to 5V",
            "Connect TRIG to pin 7",
            "Connect ECHO to pin 8",
            "Connect GND to ground"
        ],
        hint: "The ultrasonic sensor needs power (VCC to 5V, GND to GND) and two signal pins. TRIG sends the pulse (pin 7), ECHO receives it (pin 8).",
        requiredComponents: ['ultrasonic'],
        validation: {
            components: {
                'ultrasonic': 1
            },
            connections: [
                { from: '5V', to: 'ultrasonic-vcc' },
                { from: 'D7', to: 'ultrasonic-trig' },
                { from: 'D8', to: 'ultrasonic-echo' },
                { from: 'GND', to: 'ultrasonic-gnd' }
            ]
        }
    },
    {
        id: 6,
        title: "Advanced: LED Matrix Pattern",
        description: "Create a pattern using multiple LEDs with different brightness levels using PWM pins. This demonstrates how PWM can control LED brightness, not just on/off.",
        requirements: [
            "Place 3 different colored LEDs",
            "Use PWM pins (9, 10, 11) for brightness control",
            "Add appropriate resistors",
            "Connect all grounds"
        ],
        hint: "PWM pins (~9, ~10, ~11) allow brightness control. Each LED still needs its resistor. The tilde (~) symbol marks PWM-capable pins.",
        requiredComponents: ['led-red', 'led-green', 'led-blue', 'resistor-220', 'resistor-220', 'resistor-220'],
        validation: {
            components: {
                'led-red': 1,
                'led-green': 1,
                'led-blue': 1,
                'resistor-220': 3
            },
            connections: [
                { from: 'D9', to: 'led-red' },
                { from: 'D10', to: 'led-green' },
                { from: 'D11', to: 'led-blue' }
            ]
        }
    }
];

// Initialize Game
function initGame() {
    console.log('initGame called');
    console.log('GAME_THEMES available:', typeof GAME_THEMES !== 'undefined');
    console.log('ACTIVE_THEME:', ACTIVE_THEME);

    // Check for selected theme from localStorage
    const selectedTheme = localStorage.getItem('selectedTheme');
    console.log('Selected theme from localStorage:', selectedTheme);

    if (selectedTheme === 'CUSTOM_THEME') {
        // Load custom theme from localStorage
        const customThemeJSON = localStorage.getItem('CUSTOM_THEME');
        if (customThemeJSON) {
            try {
                ACTIVE_THEME = JSON.parse(customThemeJSON);
                console.log('Loaded CUSTOM_THEME:', ACTIVE_THEME.name);
            } catch (e) {
                console.error('Failed to parse custom theme:', e);
            }
        }
    } else if (selectedTheme && typeof GAME_THEMES !== 'undefined' && GAME_THEMES[selectedTheme]) {
        ACTIVE_THEME = GAME_THEMES[selectedTheme];
        console.log('Set ACTIVE_THEME to:', ACTIVE_THEME.name);
    }

    // Set theme header
    const headerH1 = document.querySelector('header h1');
    const headerP = document.querySelector('header p');
    console.log('Header elements found:', headerH1 !== null, headerP !== null);

    if (headerH1) headerH1.textContent = ACTIVE_THEME.name;
    if (headerP) headerP.textContent = ACTIVE_THEME.description;

    // Set theme-specific test button text
    const testBtn = document.getElementById('test-btn');
    if (testBtn && ACTIVE_THEME.testButtonText) {
        testBtn.textContent = ACTIVE_THEME.testButtonText;
    }

    console.log('About to call setupArduinoPins');
    setupArduinoPins();
    console.log('About to call setupBreadboard');
    setupBreadboard();
    console.log('About to call setupComponentToolbox');
    setupComponentToolbox();
    console.log('About to call loadChallenge');
    loadChallenge(gameState.currentLevel);
    console.log('About to call setupEventListeners');
    setupEventListeners();
    console.log('About to call updateUI');
    updateUI();
    console.log('initGame completed');
}

// Setup Arduino Pins
function setupArduinoPins() {
    const arduinoPins = document.getElementById('arduino-pins');
    if (!arduinoPins) {
        console.error('arduino-pins element not found');
        return;
    }

    // Create sections for different pin types
    const digitalSection = document.createElement('div');
    digitalSection.className = 'pin-section';
    const digitalLabel = document.createElement('div');
    digitalLabel.className = 'pin-label';
    digitalLabel.textContent = 'Digital PWM';
    digitalSection.appendChild(digitalLabel);
    const digitalPinsRow = document.createElement('div');
    digitalPinsRow.className = 'pins-row';

    // Digital pins (0-13, with PWM on 3,5,6,9,10,11)
    const pwmPins = [3, 5, 6, 9, 10, 11];
    for (let i = 0; i <= 13; i++) {
        const pin = createPin(`D${i}`, pwmPins.includes(i) ? `~${i}` : i.toString());
        digitalPinsRow.appendChild(pin);
    }
    digitalSection.appendChild(digitalPinsRow);
    arduinoPins.appendChild(digitalSection);

    // Power pins section
    const powerSection = document.createElement('div');
    powerSection.className = 'pin-section';
    const powerLabel = document.createElement('div');
    powerLabel.className = 'pin-label';
    powerLabel.textContent = 'Power';
    powerSection.appendChild(powerLabel);
    const powerPinsRow = document.createElement('div');
    powerPinsRow.className = 'pins-row';

    ['3.3V', '5V', 'GND', 'GND', 'VIN'].forEach(label => {
        const pin = createPin(label, label, label === 'GND' ? 'ground' : 'power');
        powerPinsRow.appendChild(pin);
    });
    powerSection.appendChild(powerPinsRow);
    arduinoPins.appendChild(powerSection);

    // Analog pins section
    const analogSection = document.createElement('div');
    analogSection.className = 'pin-section';
    const analogLabel = document.createElement('div');
    analogLabel.className = 'pin-label';
    analogLabel.textContent = 'Analog';
    analogSection.appendChild(analogLabel);
    const analogPinsRow = document.createElement('div');
    analogPinsRow.className = 'pins-row';

    for (let i = 0; i <= 5; i++) {
        const pin = createPin(`A${i}`, `A${i}`);
        analogPinsRow.appendChild(pin);
    }
    analogSection.appendChild(analogPinsRow);
    arduinoPins.appendChild(analogSection);
}

function createPin(id, label, type = 'digital') {
    const pin = document.createElement('div');
    pin.className = `pin ${type}`;
    pin.id = `pin-${id}`;
    pin.textContent = label;
    pin.dataset.pinId = id;

    pin.addEventListener('click', () => handlePinClick(id));

    return pin;
}

// Setup Breadboard
function setupBreadboard() {
    const terminalStrips = document.getElementById('terminal-strips');

    // Add column headers
    const headerRow = document.createElement('div');
    headerRow.className = 'terminal-row-container';

    const emptyLabel = document.createElement('div');
    emptyLabel.className = 'row-label';
    headerRow.appendChild(emptyLabel);

    const colHeaders = document.createElement('div');
    colHeaders.className = 'terminal-row column-headers';
    for (let col = 0; col < 10; col++) {
        const colLabel = document.createElement('div');
        colLabel.className = 'column-label';
        colLabel.textContent = col;
        colHeaders.appendChild(colLabel);
    }
    headerRow.appendChild(colHeaders);
    terminalStrips.appendChild(headerRow);

    // Create 30 rows of terminal strips (typical breadboard)
    for (let row = 0; row < 30; row++) {
        const rowContainer = document.createElement('div');
        rowContainer.className = 'terminal-row-container';

        // Add row number label
        const rowLabel = document.createElement('div');
        rowLabel.className = 'row-label';
        rowLabel.textContent = row + 1;
        rowContainer.appendChild(rowLabel);

        // Create the row of holes
        const rowDiv = document.createElement('div');
        rowDiv.className = 'terminal-row';
        rowDiv.dataset.row = row;

        for (let col = 0; col < 10; col++) {
            const hole = document.createElement('div');
            hole.className = 'hole';
            hole.dataset.row = row;
            hole.dataset.col = col;
            hole.dataset.holeId = `${row}-${col}`;

            hole.addEventListener('click', () => handleHoleClick(row, col));

            rowDiv.appendChild(hole);
        }

        rowContainer.appendChild(rowDiv);
        terminalStrips.appendChild(rowContainer);
    }
}

// Setup Component Toolbox
function setupComponentToolbox() {
    const toolbox = document.getElementById('component-toolbox');

    Object.values(COMPONENTS).forEach(component => {
        const item = document.createElement('div');
        item.className = 'component-item';
        item.dataset.componentId = component.id;
        item.draggable = true;

        const icon = document.createElement('span');
        icon.className = 'component-icon';
        icon.textContent = component.icon;

        const name = document.createElement('div');
        name.className = 'component-name';
        name.textContent = component.name;

        item.appendChild(icon);
        item.appendChild(name);

        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('click', () => handleComponentSelect(component));

        toolbox.appendChild(item);
    });
}

// Load Challenge
function loadChallenge(level) {
    const challenges = getChallenges();
    const challenge = challenges[level];

    if (!challenge) {
        showFeedback('🎉 Mission Complete!', `You've successfully completed all missions in ${ACTIVE_THEME.name}! You're ready for real circuits!`, true);
        return;
    }

    // Update story banner at the top
    document.getElementById('story-title').textContent = challenge.title;
    document.getElementById('story-description').textContent = challenge.story;

    // Update task description
    document.getElementById('challenge-task').textContent = challenge.task;

    // Update requirements list
    const requirementsList = document.getElementById('requirements-list');
    requirementsList.innerHTML = '';
    challenge.requirements.forEach(req => {
        const li = document.createElement('li');
        li.textContent = req;
        requirementsList.appendChild(li);
    });

    document.getElementById('hint-text').textContent = challenge.hint;
    document.getElementById('hint-text').style.display = 'none';
}

// Event Listeners
function setupEventListeners() {
    document.getElementById('test-btn').addEventListener('click', toggleTest);
    document.getElementById('check-btn').addEventListener('click', checkCircuit);
    document.getElementById('reset-btn').addEventListener('click', resetCircuit);
    document.getElementById('hint-btn').addEventListener('click', toggleHint);
    document.getElementById('feedback-close').addEventListener('click', closeFeedback);

    const breadboardContainer = document.querySelector('.breadboard-container');
    breadboardContainer.addEventListener('dragover', handleDragOver);
    breadboardContainer.addEventListener('dragleave', handleDragLeave);
    breadboardContainer.addEventListener('drop', handleDrop);
}

function handleDragLeave(e) {
    e.currentTarget.classList.remove('drag-over');

    // Clear preview holes when leaving drag area
    document.querySelectorAll('.hole.preview').forEach(h => h.classList.remove('preview'));
}

// Test Circuit Functionality
function toggleTest() {
    if (gameState.isTestRunning) {
        stopTest();
    } else {
        startTest();
    }
}

function startTest() {
    gameState.isTestRunning = true;
    const testBtn = document.getElementById('test-btn');
    testBtn.textContent = '■ Stop Test';
    testBtn.classList.add('running');

    // Simulate circuit - blink LEDs based on their pin assignments
    let blinkState = false;
    gameState.testInterval = setInterval(() => {
        blinkState = !blinkState;

        gameState.placedComponents.forEach(comp => {
            if (comp.type === 'led-red' || comp.type === 'led-green' || comp.type === 'led-blue') {
                const element = document.getElementById(comp.id);
                if (element) {
                    const bulb = element.querySelector('.led-bulb');
                    if (bulb) {
                        if (blinkState) {
                            bulb.classList.add('on');
                        } else {
                            bulb.classList.remove('on');
                        }
                    }
                }
            }
        });
    }, 600);
}

function stopTest() {
    gameState.isTestRunning = false;
    const testBtn = document.getElementById('test-btn');
    testBtn.textContent = '▶ Test Circuit';
    testBtn.classList.remove('running');

    if (gameState.testInterval) {
        clearInterval(gameState.testInterval);
        gameState.testInterval = null;
    }

    // Turn off all LEDs
    document.querySelectorAll('.led-bulb').forEach(bulb => {
        bulb.classList.remove('on');
    });
}

// Component Selection and Dragging
let selectedComponent = null;

function handleComponentSelect(component) {
    // If wire is selected, enter wire mode
    if (component.type === 'wire') {
        gameState.wireMode = true;
        gameState.wireStartPoint = null;
        selectedComponent = null;
        document.body.style.cursor = 'crosshair';

        // Highlight all pins and holes
        document.querySelectorAll('.pin, .hole').forEach(el => {
            el.classList.add('wire-mode-active');
        });

        showTemporaryMessage('Wire Mode Active: Click a pin or hole to start, then click another to complete the wire');
    } else {
        selectedComponent = component;
        document.body.style.cursor = 'copy';
    }
}

function handleDragStart(e) {
    const componentId = e.target.closest('.component-item').dataset.componentId;
    selectedComponent = Object.values(COMPONENTS).find(c => c.id === componentId);
    e.dataTransfer.effectAllowed = 'copy';
    e.dataTransfer.setData('text/plain', componentId);
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    e.currentTarget.classList.add('drag-over');

    // Show preview of where component will be placed
    if (selectedComponent) {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Clear any existing previews
        document.querySelectorAll('.hole.preview').forEach(h => h.classList.remove('preview'));

        const nearestHole = getNearestHolePosition(x, y);
        if (nearestHole) {
            nearestHole.element.classList.add('preview');

            // Show second hole preview for 2-pin components
            if (selectedComponent.type === 'led') {
                const secondHole = document.querySelector(`[data-row="${nearestHole.row}"][data-col="${nearestHole.col + 3}"]`);
                if (secondHole) secondHole.classList.add('preview');
            } else if (selectedComponent.type === 'resistor') {
                const secondHole = document.querySelector(`[data-row="${nearestHole.row}"][data-col="${nearestHole.col + 4}"]`);
                if (secondHole) secondHole.classList.add('preview');
            }
        }
    }
}

function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();

    // Remove drag-over class and preview
    e.currentTarget.classList.remove('drag-over');
    document.querySelectorAll('.hole.preview').forEach(h => h.classList.remove('preview'));

    if (!selectedComponent) {
        const componentId = e.dataTransfer.getData('text/plain');
        selectedComponent = Object.values(COMPONENTS).find(c => c.id === componentId);
    }

    if (!selectedComponent) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    placeComponent(selectedComponent, x, y);

    selectedComponent = null;
    document.body.style.cursor = 'default';
}

// Get nearest breadboard hole position
function getNearestHolePosition(x, y) {
    const breadboard = document.querySelector('.breadboard');
    const breadboardRect = breadboard.getBoundingClientRect();
    const containerRect = document.querySelector('.breadboard-container').getBoundingClientRect();

    // Calculate position relative to breadboard
    const relX = x - (breadboardRect.left - containerRect.left);
    const relY = y - (breadboardRect.top - containerRect.top);

    // Find all holes
    const holes = document.querySelectorAll('.hole');
    let nearestHole = null;
    let minDistance = Infinity;

    holes.forEach(hole => {
        const holeRect = hole.getBoundingClientRect();
        const holeCenterX = holeRect.left + holeRect.width / 2 - containerRect.left;
        const holeCenterY = holeRect.top + holeRect.height / 2 - containerRect.top;

        const distance = Math.sqrt(
            Math.pow(x - holeCenterX, 2) +
            Math.pow(y - holeCenterY, 2)
        );

        if (distance < minDistance) {
            minDistance = distance;
            nearestHole = {
                x: holeCenterX,
                y: holeCenterY,
                row: parseInt(hole.dataset.row),
                col: parseInt(hole.dataset.col),
                element: hole
            };
        }
    });

    return nearestHole;
}

// Place Component
function placeComponent(component, x, y) {
    const placedComponentsContainer = document.getElementById('placed-components');

    // Get nearest hole for snapping
    const nearestHole = getNearestHolePosition(x, y);

    if (!nearestHole) {
        console.log('No hole found nearby');
        return;
    }

    const componentId = `component-${Date.now()}`;
    const componentElement = createComponentElement(component, componentId);

    // Calculate offset and positioning based on component type
    let offsetY = 0;
    let offsetX = 0;
    let secondHole = null;

    if (component.type === 'led') {
        // LED legs should align with breadboard holes
        // LED is 100px wide with legs at 15px (left leg) and 85px (right leg) from left edge
        // This means legs are 70px apart (85 - 15 = 70)

        // For 2-pin components, find the hole 3 columns away for the second leg
        const secondHoleQuery = document.querySelector(`[data-row="${nearestHole.row}"][data-col="${nearestHole.col + 3}"]`);
        if (secondHoleQuery) {
            secondHole = {
                row: nearestHole.row,
                col: nearestHole.col + 3,
                element: secondHoleQuery
            };

            // Calculate exact position between the two holes
            const secondHoleRect = secondHoleQuery.getBoundingClientRect();
            const containerRect = document.querySelector('.breadboard-container').getBoundingClientRect();
            const secondHoleX = secondHoleRect.left + secondHoleRect.width / 2 - containerRect.left;

            // Distance between the two holes
            const holeDistance = secondHoleX - nearestHole.x;

            // Position LED so first leg (15px from left) aligns with first hole
            offsetX = -15;
            offsetY = -80; // Position LED bulb above the legs
        } else {
            // Fallback if second hole not found
            offsetX = -15;
            offsetY = -80;
        }
    } else if (component.type === 'resistor') {
        // Resistor is 80px wide with leads at 10px and 70px from left
        // Resistor legs span 4 holes

        const secondHoleQuery = document.querySelector(`[data-row="${nearestHole.row}"][data-col="${nearestHole.col + 4}"]`);
        if (secondHoleQuery) {
            secondHole = {
                row: nearestHole.row,
                col: nearestHole.col + 4,
                element: secondHoleQuery
            };

            // Position resistor so first lead (10px from left) aligns with first hole
            offsetX = -10;
            offsetY = -25; // Position above the legs
        } else {
            // Fallback if second hole not found
            offsetX = -10;
            offsetY = -25;
        }
    } else if (component.type === 'motor' || component.type === 'sensor' || component.type === 'button') {
        // Center these components
        offsetY = -35; // Half of component height (70px)
        offsetX = -35; // Half of component width (70px)
    }

    // Position component so its legs snap to the hole
    componentElement.style.left = `${nearestHole.x + offsetX}px`;
    componentElement.style.top = `${nearestHole.y + offsetY}px`;

    placedComponentsContainer.appendChild(componentElement);

    gameState.placedComponents.push({
        id: componentId,
        type: component.id,
        x: nearestHole.x,
        y: nearestHole.y,
        row: nearestHole.row,
        col: nearestHole.col,
        secondRow: secondHole ? secondHole.row : null,
        secondCol: secondHole ? secondHole.col : null,
        connections: []
    });

    // Mark holes as occupied
    nearestHole.element.classList.add('occupied');
    if (secondHole) {
        secondHole.element.classList.add('occupied');
    }

    updateUI();
}

// Create Component Element
function createComponentElement(component, id) {
    const div = document.createElement('div');
    div.className = 'placed-component';
    div.id = id;
    div.dataset.componentType = component.id;

    // Create delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-component';
    deleteBtn.innerHTML = '×';
    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        removeComponent(id);
    });
    div.appendChild(deleteBtn);

    // Create component visualization based on type
    if (component.type === 'led') {
        const led = document.createElement('div');
        led.className = 'led-component';

        const bulb = document.createElement('div');
        bulb.className = 'led-bulb';
        bulb.style.background = `radial-gradient(circle, ${component.color}, ${getDarkerColor(component.color)})`;

        const legs = document.createElement('div');
        legs.className = 'led-legs';

        const leg1 = document.createElement('div');
        leg1.className = 'led-leg';
        const leg2 = document.createElement('div');
        leg2.className = 'led-leg';

        legs.appendChild(leg1);
        legs.appendChild(leg2);

        led.appendChild(bulb);
        led.appendChild(legs);
        div.appendChild(led);
    } else if (component.type === 'resistor') {
        const resistor = document.createElement('div');
        resistor.className = 'resistor-component';

        const body = document.createElement('div');
        body.className = 'resistor-body';
        body.textContent = component.name;

        const leads = document.createElement('div');
        leads.className = 'resistor-leads';

        const lead1 = document.createElement('div');
        lead1.className = 'resistor-lead';
        const lead2 = document.createElement('div');
        lead2.className = 'resistor-lead';

        leads.appendChild(lead1);
        leads.appendChild(lead2);

        resistor.appendChild(body);
        resistor.appendChild(leads);
        div.appendChild(resistor);
    } else if (component.type === 'motor') {
        const motor = document.createElement('div');
        motor.className = 'motor-component';
        motor.innerHTML = '<span class="motor-icon">⚙️</span>';
        div.appendChild(motor);
    } else if (component.type === 'sensor') {
        const sensor = document.createElement('div');
        sensor.className = 'sensor-component';
        sensor.textContent = 'HC-SR04';
        div.appendChild(sensor);
    } else if (component.type === 'button') {
        const button = document.createElement('div');
        button.className = 'sensor-component';
        button.style.background = '#95a5a6';
        button.style.borderColor = '#7f8c8d';
        button.textContent = 'BUTTON';
        div.appendChild(button);
    } else if (component.type === 'wire') {
        // Wires are rendered as SVG lines, handled separately
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.style.width = '100%';
        svg.style.height = '100%';
        svg.style.position = 'absolute';
        svg.style.top = '0';
        svg.style.left = '0';
        svg.style.pointerEvents = 'none';

        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.classList.add('wire-line');
        line.setAttribute('x1', '0');
        line.setAttribute('y1', '0');
        line.setAttribute('x2', '100');
        line.setAttribute('y2', '100');

        const circle1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle1.classList.add('wire-endpoint');
        circle1.setAttribute('cx', '0');
        circle1.setAttribute('cy', '0');
        circle1.setAttribute('r', '4');

        const circle2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle2.classList.add('wire-endpoint');
        circle2.setAttribute('cx', '100');
        circle2.setAttribute('cy', '100');
        circle2.setAttribute('r', '4');

        svg.appendChild(line);
        svg.appendChild(circle1);
        svg.appendChild(circle2);
        div.appendChild(svg);
    } else {
        div.innerHTML += `<span style="font-size: 2em;">${component.icon}</span>`;
    }

    // Make draggable
    div.draggable = true;
    div.addEventListener('dragstart', handleComponentDragStart);

    return div;
}

function getDarkerColor(color) {
    const colors = {
        'red': '#8b0000',
        'green': '#006400',
        'blue': '#00008b'
    };
    return colors[color] || '#333';
}

function handleComponentDragStart(e) {
    const componentElement = e.target.closest('.placed-component');
    if (!componentElement) return;

    const componentId = componentElement.id;
    gameState.draggingComponent = componentId;

    // Find and remove this component from placed components
    const component = gameState.placedComponents.find(c => c.id === componentId);
    if (component) {
        // Store the original component definition for re-placement
        const originalDef = Object.values(COMPONENTS).find(c => c.id === component.type);
        selectedComponent = originalDef;

        // Remove it (will be re-placed on drop)
        removeComponent(componentId);
    }

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', componentId);
    componentElement.classList.add('dragging');
}

// Remove Component
function removeComponent(componentId) {
    const element = document.getElementById(componentId);

    // Find the component in game state to get its hole positions
    const component = gameState.placedComponents.find(c => c.id === componentId);

    if (component) {
        // Clear the occupied status from the first hole
        if (component.row !== undefined && component.col !== undefined) {
            const hole1 = document.querySelector(`[data-row="${component.row}"][data-col="${component.col}"]`);
            if (hole1) {
                hole1.classList.remove('occupied');
            }
        }

        // Clear the occupied status from the second hole (if exists)
        if (component.secondRow !== undefined && component.secondCol !== undefined) {
            const hole2 = document.querySelector(`[data-row="${component.secondRow}"][data-col="${component.secondCol}"]`);
            if (hole2) {
                hole2.classList.remove('occupied');
            }
        }
    }

    if (element) {
        element.remove();
    }

    gameState.placedComponents = gameState.placedComponents.filter(c => c.id !== componentId);
    updateUI();
}

// Pin and Hole Click Handlers
let selectedPin = null;

function handlePinClick(pinId) {
    const pin = document.getElementById(`pin-${pinId}`);

    // If in wire mode, handle wire creation
    if (gameState.wireMode) {
        const pinRect = pin.getBoundingClientRect();
        const containerRect = document.querySelector('.breadboard-container').getBoundingClientRect();

        const point = {
            type: 'pin',
            id: pinId,
            x: pinRect.left + pinRect.width / 2 - containerRect.left,
            y: pinRect.top + pinRect.height / 2 - containerRect.top,
            element: pin
        };

        handleWirePoint(point);
        return;
    }

    if (selectedPin === pinId) {
        // Deselect
        selectedPin = null;
        pin.classList.remove('connected');
    } else {
        // Select
        if (selectedPin) {
            document.getElementById(`pin-${selectedPin}`).classList.remove('connected');
        }
        selectedPin = pinId;
        pin.classList.add('connected');
    }
}

function handleHoleClick(row, col) {
    // If in wire mode, handle wire creation
    if (gameState.wireMode) {
        const hole = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        if (!hole) return;

        const holeRect = hole.getBoundingClientRect();
        const containerRect = document.querySelector('.breadboard-container').getBoundingClientRect();

        const point = {
            type: 'hole',
            id: `${row}-${col}`,
            row: row,
            col: col,
            x: holeRect.left + holeRect.width / 2 - containerRect.left,
            y: holeRect.top + holeRect.height / 2 - containerRect.top,
            element: hole
        };

        handleWirePoint(point);
        return;
    }

    console.log(`Hole clicked: ${row}, ${col}`);
}

function handleWirePoint(point) {
    if (!gameState.wireStartPoint) {
        // This is the first point
        gameState.wireStartPoint = point;
        point.element.classList.add('wire-point-selected');
        showTemporaryMessage('Click another pin or hole to complete the wire');
    } else {
        // This is the second point - create the wire
        const startPoint = gameState.wireStartPoint;

        // Don't allow connecting to the same point
        if (startPoint.id === point.id) {
            return;
        }

        createWire(startPoint, point);

        // Clear wire mode
        startPoint.element.classList.remove('wire-point-selected');
        exitWireMode();
    }
}

function createWire(startPoint, endPoint) {
    const wireId = `wire-${Date.now()}`;
    const container = document.getElementById('placed-components');

    // Create SVG for the wire
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.id = wireId;
    svg.classList.add('wire-component');
    svg.style.position = 'absolute';
    svg.style.left = '0';
    svg.style.top = '0';
    svg.style.width = '100%';
    svg.style.height = '100%';
    svg.style.pointerEvents = 'none';
    svg.style.zIndex = '1';

    // Create gradient definition for wire
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    gradient.setAttribute('id', `wire-gradient-${wireId}`);
    gradient.setAttribute('x1', '0%');
    gradient.setAttribute('y1', '0%');
    gradient.setAttribute('x2', '100%');
    gradient.setAttribute('y2', '0%');

    const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop1.setAttribute('offset', '0%');
    stop1.setAttribute('style', 'stop-color:#3b82f6;stop-opacity:1');

    const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop2.setAttribute('offset', '50%');
    stop2.setAttribute('style', 'stop-color:#2563eb;stop-opacity:1');

    const stop3 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop3.setAttribute('offset', '100%');
    stop3.setAttribute('style', 'stop-color:#1d4ed8;stop-opacity:1');

    gradient.appendChild(stop1);
    gradient.appendChild(stop2);
    gradient.appendChild(stop3);
    defs.appendChild(gradient);
    svg.appendChild(defs);

    // Create the wire path (using a curved line for realistic look)
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.classList.add('wire-line');
    path.setAttribute('stroke', `url(#wire-gradient-${wireId})`);

    // Calculate control points for curved wire
    const midX = (startPoint.x + endPoint.x) / 2;
    const midY = (startPoint.y + endPoint.y) / 2;
    const dx = endPoint.x - startPoint.x;
    const dy = endPoint.y - startPoint.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Add some natural curve based on distance
    const curve = Math.min(distance * 0.3, 50);
    const controlX = midX;
    const controlY = midY + curve;

    const pathData = `M ${startPoint.x} ${startPoint.y} Q ${controlX} ${controlY} ${endPoint.x} ${endPoint.y}`;
    path.setAttribute('d', pathData);

    // Create endpoint circles
    const circle1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle1.classList.add('wire-endpoint');
    circle1.setAttribute('cx', startPoint.x);
    circle1.setAttribute('cy', startPoint.y);
    circle1.setAttribute('r', '5');

    const circle2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle2.classList.add('wire-endpoint');
    circle2.setAttribute('cx', endPoint.x);
    circle2.setAttribute('cy', endPoint.y);
    circle2.setAttribute('r', '5');

    svg.appendChild(path);
    svg.appendChild(circle1);
    svg.appendChild(circle2);

    // Add delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-wire';
    deleteBtn.innerHTML = '×';
    deleteBtn.style.position = 'absolute';
    deleteBtn.style.left = `${midX - 15}px`;
    deleteBtn.style.top = `${midY + curve - 15}px`;
    deleteBtn.style.pointerEvents = 'all';
    deleteBtn.style.zIndex = '10';
    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        removeWire(wireId);
    });

    container.appendChild(svg);
    container.appendChild(deleteBtn);

    // Track the wire in game state
    gameState.wires.push({
        id: wireId,
        start: startPoint,
        end: endPoint
    });

    console.log('Wire created:', startPoint.id, '->', endPoint.id);
}

function removeWire(wireId) {
    const wireElement = document.getElementById(wireId);
    if (wireElement) {
        wireElement.remove();
    }

    // Remove delete button
    const deleteBtn = document.querySelector(`.delete-wire[data-wire-id="${wireId}"]`);
    if (deleteBtn) {
        deleteBtn.remove();
    }

    gameState.wires = gameState.wires.filter(w => w.id !== wireId);
}

function exitWireMode() {
    gameState.wireMode = false;
    gameState.wireStartPoint = null;
    document.body.style.cursor = 'default';

    // Remove wire mode highlights
    document.querySelectorAll('.wire-mode-active').forEach(el => {
        el.classList.remove('wire-mode-active');
    });
    document.querySelectorAll('.wire-point-selected').forEach(el => {
        el.classList.remove('wire-point-selected');
    });
}

function showTemporaryMessage(message) {
    // Remove any existing message
    const existingMsg = document.querySelector('.temporary-message');
    if (existingMsg) {
        existingMsg.remove();
    }

    // Create new message
    const msgDiv = document.createElement('div');
    msgDiv.className = 'temporary-message';
    msgDiv.textContent = message;
    msgDiv.style.position = 'fixed';
    msgDiv.style.top = '20px';
    msgDiv.style.left = '50%';
    msgDiv.style.transform = 'translateX(-50%)';
    msgDiv.style.background = 'linear-gradient(to right, #667eea, #764ba2)';
    msgDiv.style.color = 'white';
    msgDiv.style.padding = '15px 30px';
    msgDiv.style.borderRadius = '8px';
    msgDiv.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
    msgDiv.style.zIndex = '10000';
    msgDiv.style.fontSize = '1.1em';
    msgDiv.style.fontWeight = '600';

    document.body.appendChild(msgDiv);

    // Auto-remove after 3 seconds
    setTimeout(() => {
        msgDiv.style.opacity = '0';
        msgDiv.style.transition = 'opacity 0.5s';
        setTimeout(() => msgDiv.remove(), 500);
    }, 3000);
}

// Check Circuit
function checkCircuit() {
    const challenges = getChallenges();
    const challenge = challenges[gameState.currentLevel];

    if (!challenge) return;

    // Stop test if running
    if (gameState.isTestRunning) {
        stopTest();
    }

    // Count placed components
    const placedComponentCounts = {};
    gameState.placedComponents.forEach(comp => {
        placedComponentCounts[comp.type] = (placedComponentCounts[comp.type] || 0) + 1;
    });

    // Check if required components are placed
    const requiredCounts = challenge.validation.components;
    let allComponentsPlaced = true;
    let missingComponents = [];

    for (const [compType, count] of Object.entries(requiredCounts)) {
        if ((placedComponentCounts[compType] || 0) < count) {
            allComponentsPlaced = false;
            const component = Object.values(COMPONENTS).find(c => c.id === compType);
            missingComponents.push(component.name);
        }
    }

    // Simple validation
    const required = challenge.requiredComponents;
    const placed = gameState.placedComponents;

    if (placed.length !== required.length) {
        showFeedback('⚠️ Check Your Circuit', `You need exactly ${required.length} components. You have ${placed.length}.`, false);
        return;
    }

    showFeedback('✅ Mission Success!', `Excellent work! You've completed "${challenge.title}". You've earned 100 points!`, true);

    gameState.score += 100;
    gameState.currentLevel++;

    setTimeout(() => {
        resetCircuit();
        const challenges = getChallenges();
        if (gameState.currentLevel < challenges.length) {
            loadChallenge(gameState.currentLevel);
        }
        updateUI();
    }, 2000);
}

// Reset Circuit
function resetCircuit() {
    // Stop test if running
    if (gameState.isTestRunning) {
        stopTest();
    }

    // Exit wire mode if active
    if (gameState.wireMode) {
        exitWireMode();
    }

    // Clear all placed components
    const container = document.getElementById('placed-components');
    container.innerHTML = '';

    gameState.placedComponents = [];
    gameState.connections = [];
    gameState.wires = [];

    // Clear all occupied holes
    document.querySelectorAll('.hole.occupied').forEach(hole => {
        hole.classList.remove('occupied');
    });

    // Clear pin selections
    document.querySelectorAll('.pin.connected').forEach(pin => {
        pin.classList.remove('connected');
    });
    selectedPin = null;

    updateUI();
}

// Toggle Hint
function toggleHint() {
    const hintText = document.getElementById('hint-text');
    if (hintText.style.display === 'none') {
        hintText.style.display = 'block';
    } else {
        hintText.style.display = 'none';
    }
}

// Show Feedback Modal
function showFeedback(title, message, isSuccess) {
    const modal = document.getElementById('feedback-modal');
    const titleElement = document.getElementById('feedback-title');
    const messageElement = document.getElementById('feedback-message');

    titleElement.textContent = title;
    titleElement.style.color = isSuccess ? '#28a745' : '#dc3545';
    messageElement.textContent = message;

    modal.style.display = 'flex';
}

function closeFeedback() {
    document.getElementById('feedback-modal').style.display = 'none';
}

// Update UI
function updateUI() {
    document.getElementById('current-level').textContent = gameState.currentLevel + 1;
    document.getElementById('score').textContent = gameState.score;
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', initGame);
