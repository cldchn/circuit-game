# Circuit Challenge - Educational Arduino Game

An interactive web-based game that teaches Arduino and electronics through story-driven challenges.

## 🎮 Features

### Story-Driven Learning
Learn electronics through engaging narratives! Choose from 4 exciting themes:
- 🚀 **Mars Colony Engineer** - Fix critical systems on humanity's first Mars colony
- 🏟️ **Championship Game Night** - Manage stadium tech during the big game
- 🎭 **Broadway Opening Night** - Control stage lighting for a premiere performance
- 🏥 **Emergency Room Surgeon** - Operate life-critical medical equipment

### Accurate Circuit Simulation
Based on real Arduino and breadboard connections:
- **LED Polarity**: Anode (long leg) connects to power through resistor, Cathode (short leg) to ground
- **Current Limiting**: Every LED circuit includes proper resistor placement (220Ω)
- **Series Connections**: Resistors placed in series with LEDs (Arduino Pin → Resistor → LED Anode → LED Cathode → GND)
- **Breadboard Layout**: Components span across breadboard holes accurately
- **Pin Assignments**: Digital pins (0-13), PWM pins (~3,5,6,9,10,11), Analog pins (A0-A5)

### Interactive Gameplay
- **Drag & Drop**: Drag components from toolbox onto breadboard
- **Snap to Grid**: Components automatically align to breadboard holes
- **Test Circuit**: See your LEDs blink to verify connections before checking
- **Progressive Levels**: 5 challenges per theme, increasing in complexity
- **Real-time Feedback**: Immediate validation and helpful hints

## 🚀 Getting Started

1. Open `landing.html` in your browser
2. Choose one of the 4 themes
3. Read the story and understand the challenge
4. Drag components onto the breadboard
5. Click "Test Circuit" to see if LEDs light up
6. Click "Check Solution" to validate and progress

## 📚 What You'll Learn

### Level 1-2: Basic LED Circuits
- LED polarity (anode vs cathode)
- Current limiting with resistors
- Simple digital pin connections

### Level 3: Multiple Components
- Managing multiple LEDs
- Individual resistors for each LED
- Pin assignments for different circuits

### Level 4: Input Controls
- Push buttons and pull-down resistors
- Motor control with PWM pins
- Input vs output pin usage

### Level 5: Sensors
- Ultrasonic sensor connections (4 pins)
- Automatic triggering circuits
- Integrated systems

## 🔧 Technical Details

### Components
- **LEDs**: Red, Green, Blue with accurate 2-leg placement
- **Resistors**: 220Ω (current limiting), 1kΩ (pull-down)
- **Motors**: DC motors on PWM pins
- **Sensors**: HC-SR04 ultrasonic (4-pin: VCC, TRIG, ECHO, GND)
- **Buttons**: Push buttons with pull-down resistors

### Circuit Rules
All circuits follow real-world Arduino best practices:
1. LEDs always have resistors in series
2. Motors use PWM pins (3, 5, 6, 9, 10, 11)
3. Buttons have pull-down resistors to ground
4. Sensors get proper power (VCC, GND) and signal pins
5. Current-limiting prevents component damage

## 🎨 Files Structure

- `landing.html` - Theme selection page
- `landing-styles.css` - Landing page styling
- `landing.js` - Theme selection logic
- `index.html` - Main game interface
- `styles.css` - Game styling
- `game.js` - Game logic and circuit validation
- `themes.js` - All 4 themes with 5 levels each

## 🎓 Educational Goals

This game teaches:
- **Hardware fundamentals**: Understanding physical components
- **Circuit theory**: How current, voltage, and resistance work together
- **Arduino basics**: Pin types, digital vs analog, PWM
- **Problem-solving**: Debugging circuits and following diagrams
- **Real-world skills**: Transferable to actual Arduino projects

## 🌟 Why Story-First?

Instead of dry technical instructions like:
> "Connect a red LED to pin 13 with a 220Ω resistor"

Students get:
> "ALERT! The main power grid just failed. The emergency beacon needs to activate immediately or the crew won't know there's a problem!"

The technical skills are identical, but the engagement and retention are dramatically higher!

## 📝 Credits

Created as an educational tool for high school students learning electronics and Arduino programming. All circuits are based on real Arduino Uno hardware and follow industry best practices for breadboard prototyping.
