# ⚡ Circuit Quest - Educational Arduino Game

**Play Now:** [https://cldchn.github.io/circuit-game/landing.html](https://cldchn.github.io/circuit-game/landing.html)

An interactive web-based game that teaches Arduino and electronics through story-driven challenges.

![Circuit Quest](https://img.shields.io/badge/Educational-Game-brightgreen) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

---

## 🎮 Features

### Story-Driven Learning
Learn electronics through engaging narratives! Choose from 5 exciting themes:
- 🚀 **Mars Colony Engineer** - Fix critical systems on humanity's first Mars colony
- 🤠 **Wild West Telegraph** - Keep frontier communication lines open
- 🏟️ **Championship Game Night** - Manage stadium tech during the big game
- 🎭 **Broadway Opening Night** - Control stage lighting for a premiere performance
- 🏥 **Emergency Room Surgeon** - Operate life-critical medical equipment

### Accurate Circuit Simulation
Based on real Arduino and breadboard connections:
- **LED Polarity**: Anode (long leg) connects to power through resistor, Cathode (short leg) to ground
- **Current Limiting**: Every LED circuit includes proper resistor placement (220Ω)
- **Series Connections**: Resistors placed in series with LEDs
- **Breadboard Layout**: Components span across breadboard holes accurately
- **Pin Assignments**: Digital pins (0-13), PWM pins (~3,5,6,9,10,11), Analog pins (A0-A5)

### Interactive Gameplay
- **Drag & Drop**: Drag components from toolbox onto breadboard
- **Snap to Grid**: Components automatically align to breadboard holes
- **Wire Connections**: Create realistic jumper wire connections between components
- **Test Circuit**: See your LEDs blink to verify connections before checking
- **Progressive Levels**: 5 challenges per theme, increasing in complexity
- **Real-time Feedback**: Immediate validation and helpful hints

---

## 🚀 Quick Start

### Play Online
Visit the live demo: **[Circuit Quest Landing Page](https://cldchn.github.io/circuit-game/landing.html)**

### Run Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/cldchn/circuit-game.git
   cd circuit-game
   ```

2. Open in browser:
   ```bash
   # On Windows
   start landing.html

   # On Mac/Linux
   open landing.html
   ```

No build process or dependencies required - just open `landing.html` in any modern browser!

---

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

---

## 🎨 How to Play

1. **Choose Your Adventure** - Select one of 5 themed storylines
2. **Read the Story** - Each level presents an urgent scenario
3. **Build the Circuit** - Drag components and create wire connections
4. **Test Your Work** - Click "Test Circuit" to see LEDs light up
5. **Validate Solution** - Check if your circuit is correct and advance

---

## 🔧 Technical Details

### Components
- **LEDs**: Red, Green, Blue with accurate 2-leg placement
- **Resistors**: 220Ω (current limiting), 1kΩ (pull-down)
- **Motors**: DC motors on PWM pins
- **Sensors**: HC-SR04 ultrasonic (4-pin: VCC, TRIG, ECHO, GND)
- **Buttons**: Push buttons with pull-down resistors
- **Wires**: Jumper wires for realistic connections

### Circuit Rules
All circuits follow real-world Arduino best practices:
1. LEDs always have resistors in series
2. Motors use PWM pins (3, 5, 6, 9, 10, 11)
3. Buttons have pull-down resistors to ground
4. Sensors get proper power (VCC, GND) and signal pins
5. Current-limiting prevents component damage

### Files Structure
```
circuit-game/
├── landing.html          # Theme selection page
├── landing-styles.css    # Landing page styling
├── landing.js            # Theme selection logic
├── index.html            # Main game interface
├── styles.css            # Game styling
├── game.js               # Game logic and circuit validation
├── themes.js             # All 5 themes with 5 levels each
└── README.md             # This file
```

---

## 🎓 Educational Goals

This game teaches:
- **Hardware fundamentals**: Understanding physical components
- **Circuit theory**: How current, voltage, and resistance work together
- **Arduino basics**: Pin types, digital vs analog, PWM
- **Problem-solving**: Debugging circuits and following diagrams
- **Real-world skills**: Transferable to actual Arduino projects

---

## 🌟 Why Story-First?

Instead of dry technical instructions like:
> "Connect a red LED to pin 13 with a 220Ω resistor"

Students get:
> "ALERT! The main power grid just failed. The emergency beacon needs to activate immediately or the crew won't know there's a problem!"

The technical skills are identical, but the engagement and retention are dramatically higher!

---

## 🛠️ Technology Stack

- **Pure HTML5/CSS3/JavaScript** - No frameworks required
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Local Storage** - Saves theme preferences
- **SVG Graphics** - Smooth wire rendering
- **CSS Animations** - Polished UI transitions

---

## 📱 Browser Compatibility

Works on all modern browsers:
- ✅ Chrome/Edge (Recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Opera

---

## 🤝 Contributing

Contributions are welcome! Ideas for improvement:
- Additional themes and storylines
- More component types (servos, LCD displays, etc.)
- Advanced validation (actual circuit path tracing)
- Multiplayer/competitive mode
- Achievement system
- Code export to Arduino IDE

---

## 📝 License

This project is open source and available for educational use.

---

## 🙏 Acknowledgments

Created as an educational tool for high school students learning electronics and Arduino programming. All circuits are based on real Arduino Uno hardware and follow industry best practices for breadboard prototyping.

---

## 🎮 Start Learning!

**[Play Circuit Quest Now →](https://cldchn.github.io/circuit-game/landing.html)**

---

**Made with ❤️ for educators and students**
