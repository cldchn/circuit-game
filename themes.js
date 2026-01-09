// Thematic Game Content
const GAME_THEMES = {
    SPACE_EXPLORER: {
        name: "🚀 Mars Colony Engineer",
        description: "You're the chief engineer on humanity's first Mars colony. Systems are failing and you need to repair them!",
        testButtonText: "🚀 Activate Systems",

        components: {
            'led-red': { name: 'Emergency Beacon', icon: '🚨', description: 'Red warning light for emergencies' },
            'led-green': { name: 'Life Support Indicator', icon: '💚', description: 'Shows when oxygen is flowing' },
            'led-blue': { name: 'Water System Light', icon: '💧', description: 'Indicates water pressure status' },
            'resistor-220': { name: 'Power Regulator', icon: '⚡', description: 'Controls energy flow' },
            'resistor-1k': { name: 'Signal Dampener', icon: '📉', description: 'Reduces interference' },
            'motor': { name: 'Airlock Motor', icon: '🚪', description: 'Opens/closes airlocks' },
            'ultrasonic': { name: 'Proximity Scanner', icon: '📡', description: 'Detects approaching objects' },
            'button': { name: 'Emergency Override', icon: '🔴', description: 'Manual control switch' }
        },

        levels: [
            {
                title: "🚨 Emergency Power Restoration",
                story: "ALERT! The main power grid just failed. The emergency beacon needs to activate immediately or the crew won't know there's a problem. You have 60 seconds before backup power runs out!",
                task: "Wire up the Emergency Beacon circuit: Arduino Pin 13 → Resistor → LED → Ground Rail",
                requirements: [
                    'Wire from Arduino Pin 13 to resistor',
                    'Resistor connected to LED anode (long leg)',
                    'LED cathode (short leg) to Ground rail',
                    'Ground rail connected to Arduino GND'
                ],
                hint: "Complete circuit: Pin 13 → Resistor (220Ω) → LED Anode → LED Cathode → GND Rail → Arduino GND. Use jumper wires!",
                requiredComponents: [
                    { type: 'wire', from: 'pin-13', to: 'breadboard' },
                    { type: 'resistor', value: 220, connections: ['breadboard', 'breadboard'] },
                    { type: 'led', color: 'red', connections: ['breadboard', 'breadboard'] },
                    { type: 'wire', from: 'breadboard', to: 'ground-rail' },
                    { type: 'wire', from: 'ground-rail', to: 'gnd' }
                ]
            },
            {
                title: "💚 Life Support Critical!",
                story: "The oxygen generator is working, but nobody knows! The Life Support Indicator is offline. If the crew thinks there's no air, they'll evacuate the entire hab module. Fix it fast!",
                task: "Get the Life Support Indicator (green) showing that oxygen is flowing properly.",
                requirements: ['Connect Life Support Indicator to system monitor (pin 12)', 'Add Power Regulator'],
                hint: "Life support systems use pin 12. Always regulate power to critical systems!",
                requiredComponents: [{ type: 'led', color: 'green', pin: 12 }, { type: 'resistor', value: 220, pin: 12 }]
            },
            {
                title: "🌊 Water Crisis",
                story: "Three systems down! Emergency beacon is flashing, life support is stable, but now the water recycler is acting up. We need all three status lights working to diagnose the problem.",
                task: "Connect all three systems: Emergency Beacon, Life Support, and Water System indicators.",
                requirements: ['Emergency Beacon (pin 13)', 'Life Support (pin 12)', 'Water System (pin 11)', 'Power Regulators for all three'],
                hint: "Red=13, Green=12, Blue=11. Each light needs its own power regulator!",
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
                title: "🚪 Airlock Malfunction",
                story: "A supply ship is docking in 5 minutes, but the airlock motor won't respond to commands! You need to rig up the Emergency Override so the captain can manually open it.",
                task: "Wire the Emergency Override button to control the Airlock Motor.",
                requirements: ['Connect Override Button (pin 2)', 'Connect Airlock Motor (pin 9)', 'Add Signal Dampener to button'],
                hint: "Buttons go on input pins like pin 2. Motors need PWM pins like 9. The signal dampener prevents false triggers.",
                requiredComponents: [
                    { type: 'button', pin: 2 },
                    { type: 'resistor', value: 1000, pin: 2 },
                    { type: 'motor', pin: 9 }
                ]
            },
            {
                title: "📡 Incoming Debris!",
                story: "Mission Control is warning about space debris heading our way! The Proximity Scanner needs to detect it and trigger the Emergency Beacon automatically. No time to lose!",
                task: "Set up the Proximity Scanner to automatically activate the Emergency Beacon when it detects debris.",
                requirements: ['Connect Proximity Scanner (pins 6 & 7)', 'Connect Emergency Beacon (pin 13)', 'Add Power Regulator'],
                hint: "Sensors use two pins - 6 for trigger, 7 for echo. The beacon lights up when something gets close!",
                requiredComponents: [
                    { type: 'ultrasonic', pin: 6, pin2: 7 },
                    { type: 'led', color: 'red', pin: 13 },
                    { type: 'resistor', value: 220, pin: 13 }
                ]
            }
        ]
    },

    WILD_WEST: {
        name: "🤠 Wild West Telegraph",
        description: "You're the telegraph operator in a frontier town. Messages need to get through or the town is doomed!",
        testButtonText: "📡 Send Telegraph",

        components: {
            'led-red': { name: 'Danger Signal', icon: '🚨', description: 'Warns of bandits approaching' },
            'led-green': { name: 'All Clear Light', icon: '✅', description: 'Town is safe signal' },
            'led-blue': { name: 'Message Ready', icon: '📨', description: 'Telegraph message received' },
            'resistor-220': { name: 'Wire Insulator', icon: '🔧', description: 'Protects telegraph lines' },
            'resistor-1k': { name: 'Signal Stabilizer', icon: '⚙️', description: 'Keeps signals steady' },
            'motor': { name: 'Bell Ringer', icon: '🔔', description: 'Alerts the town' },
            'ultrasonic': { name: 'Motion Detector', icon: '👀', description: 'Spots riders approaching' },
            'button': { name: 'Telegraph Key', icon: '📟', description: 'Sends morse code' }
        },

        levels: [
            {
                title: "🚨 Bandits on the Horizon!",
                story: "A rider just galloped in shouting 'BANDITS!' The Danger Signal needs to light up NOW to warn everyone to get inside and bar the doors!",
                task: "Quick! Light up the Danger Signal before the bandits arrive!",
                requirements: ['Connect Danger Signal to main line', 'Add Wire Insulator'],
                hint: "Danger signals connect to line 13. Always insulate your wires in this heat!",
                requiredComponents: [{ type: 'led', color: 'red', pin: 13 }, { type: 'resistor', value: 220, pin: 13 }]
            },
            {
                title: "✅ Cavalry's Coming!",
                story: "Great news! The cavalry is riding in from Fort Courage. Light up the All Clear signal so folks know they can come out of hiding. The town needs to see that green light!",
                task: "Show everyone the cavalry's here - light the All Clear Light!",
                requirements: ['Connect All Clear Light to signal post', 'Add Wire Insulator'],
                hint: "All clear signals use line 12. Safety first - insulate those wires!",
                requiredComponents: [{ type: 'led', color: 'green', pin: 12 }, { type: 'resistor', value: 220, pin: 12 }]
            },
            {
                title: "📨 Telegraph Station Active",
                story: "You're now the official telegraph operator! You need all three signals working: Danger (for threats), All Clear (for safety), and Message Ready (for incoming telegraphs).",
                task: "Set up the complete signal system with all three lights.",
                requirements: ['Danger Signal', 'All Clear Light', 'Message Ready indicator', 'Wire Insulators for each'],
                hint: "Red=13, Green=12, Blue=11. Each signal needs its own insulator!",
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
                title: "🔔 Church Bell Alert",
                story: "The reverend wants the church bell to ring when you press the Telegraph Key. This way everyone in town hears important messages instantly!",
                task: "Wire up the Telegraph Key to ring the Bell when pressed.",
                requirements: ['Connect Telegraph Key', 'Connect Bell Ringer', 'Add Signal Stabilizer to key'],
                hint: "Keys connect to input line 2. Bell ringers need line 9. Stabilize that signal!",
                requiredComponents: [
                    { type: 'button', pin: 2 },
                    { type: 'resistor', value: 1000, pin: 2 },
                    { type: 'motor', pin: 9 }
                ]
            },
            {
                title: "👀 Automatic Lookout",
                story: "The sheriff's tired of posting guards. He wants the Motion Detector to automatically light the Danger Signal when riders approach at night!",
                task: "Set up an automatic warning system using the Motion Detector.",
                requirements: ['Connect Motion Detector', 'Connect Danger Signal', 'Add Wire Insulator'],
                hint: "Detectors use lines 6 and 7. When motion is detected, the danger signal lights up!",
                requiredComponents: [
                    { type: 'ultrasonic', pin: 6, pin2: 7 },
                    { type: 'led', color: 'red', pin: 13 },
                    { type: 'resistor', value: 220, pin: 13 }
                ]
            }
        ]
    },

    SPORTS_ARENA: {
        name: "🏟️ Championship Game Night",
        description: "You're the tech manager at the big championship game. Keep the scoreboard, lights, and systems running!",
        testButtonText: "🏆 Test Scoreboard",

        components: {
            'led-red': { name: 'Home Team Light', icon: '🔴', description: 'Lights up for home team scores' },
            'led-green': { name: 'Away Team Light', icon: '🟢', description: 'Lights up for away team scores' },
            'led-blue': { name: 'Game Clock Indicator', icon: '⏱️', description: 'Shows game clock status' },
            'resistor-220': { name: 'Power Limiter', icon: '⚡', description: 'Prevents electrical overload' },
            'resistor-1k': { name: 'Signal Protector', icon: '🛡️', description: 'Stabilizes control signals' },
            'motor': { name: 'Scoreboard Motor', icon: '📊', description: 'Updates the scoreboard' },
            'ultrasonic': { name: 'Goal Sensor', icon: '🎯', description: 'Detects when ball crosses goal line' },
            'button': { name: 'Referee Button', icon: '🎮', description: 'Manual score control' }
        },

        levels: [
            {
                title: "🔴 Home Team Scored!",
                story: "GOAL! The home team just scored but the scoreboard light is dead! 50,000 fans are going crazy and they can't see if it counted. Light it up NOW!",
                task: "Get the Home Team Light working so everyone knows the score counts!",
                requirements: ['Connect Home Team Light to scoreboard system', 'Add Power Limiter for safety'],
                hint: "Scoreboard lights use circuit 13. Don't blow the power - add that limiter!",
                requiredComponents: [{ type: 'led', color: 'red', pin: 13 }, { type: 'resistor', value: 220, pin: 13 }]
            },
            {
                title: "🟢 Away Team Strikes Back!",
                story: "The away team just tied it up! But their indicator light won't turn on. The crowd is confused - did it count? The refs need confirmation!",
                task: "Fix the Away Team Light so the score is official!",
                requirements: ['Connect Away Team Light to control panel', 'Add Power Limiter'],
                hint: "Away team uses circuit 12. Every light needs its own power limiter!",
                requiredComponents: [{ type: 'led', color: 'green', pin: 12 }, { type: 'resistor', value: 220, pin: 12 }]
            },
            {
                title: "⏱️ Full Scoreboard Check",
                story: "Halftime's almost over! The commissioner wants ALL scoreboard indicators tested before the second half starts. Home, Away, and Game Clock - everything needs to work!",
                task: "Get all three scoreboard lights operational before play resumes!",
                requirements: ['Home Team Light (circuit 13)', 'Away Team Light (circuit 12)', 'Game Clock Indicator (circuit 11)', 'Power Limiters for all'],
                hint: "Red=13, Green=12, Blue=11. Each light must have its own power limiter or the whole board fails!",
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
                title: "🎮 Referee Override System",
                story: "The automatic scoring system glitched! The head referee demands a manual override so he can update the scoreboard by button press. Wire it up quick!",
                task: "Connect the Referee Button to control the Scoreboard Motor manually.",
                requirements: ['Connect Referee Button (input 2)', 'Connect Scoreboard Motor (output 9)', 'Add Signal Protector to button'],
                hint: "Control buttons use input 2. Motors need PWM output 9. The signal protector prevents accidental triggers!",
                requiredComponents: [
                    { type: 'button', pin: 2 },
                    { type: 'resistor', value: 1000, pin: 2 },
                    { type: 'motor', pin: 9 }
                ]
            },
            {
                title: "🎯 Automatic Goal Detection",
                story: "Instant replay is taking too long! Install the Goal Sensor to automatically light up the Home Team indicator the moment the ball crosses the line!",
                task: "Wire the Goal Sensor to trigger the Home Team Light automatically.",
                requirements: ['Connect Goal Sensor (sensors 6 & 7)', 'Connect Home Team Light (circuit 13)', 'Add Power Limiter'],
                hint: "Sensors need two connections - 6 for send, 7 for receive. When the ball is detected, light goes on!",
                requiredComponents: [
                    { type: 'ultrasonic', pin: 6, pin2: 7 },
                    { type: 'led', color: 'red', pin: 13 },
                    { type: 'resistor', value: 220, pin: 13 }
                ]
            }
        ]
    },

    MUSICAL_THEATER: {
        name: "🎭 Broadway Opening Night",
        description: "You're the lighting technician for tonight's big Broadway premiere. The show must go on!",
        testButtonText: "🎬 Cue Lights",

        components: {
            'led-red': { name: 'Stage Spotlight', icon: '🔴', description: 'Red spotlight for dramatic scenes' },
            'led-green': { name: 'Harmony Light', icon: '💚', description: 'Green light for musical numbers' },
            'led-blue': { name: 'Mood Light', icon: '💙', description: 'Blue light for emotional scenes' },
            'resistor-220': { name: 'Dimmer Control', icon: '🎚️', description: 'Controls light intensity' },
            'resistor-1k': { name: 'Cue Stabilizer', icon: '📋', description: 'Prevents missed lighting cues' },
            'motor': { name: 'Curtain Motor', icon: '🎪', description: 'Opens and closes the curtain' },
            'ultrasonic': { name: 'Actor Detector', icon: '🎭', description: 'Detects when actors hit their marks' },
            'button': { name: 'Stage Manager Cue', icon: '🎬', description: 'Manual lighting control' }
        },

        levels: [
            {
                title: "🔴 Opening Number Spotlight!",
                story: "The orchestra is starting! The lead actor is about to step into the spotlight for the opening number, but the Stage Spotlight won't turn on! The audience is waiting!",
                task: "Get that Stage Spotlight working before the curtain rises!",
                requirements: ['Connect Stage Spotlight to lighting board', 'Add Dimmer Control'],
                hint: "Spotlights run on circuit 13. Always add dimmer control to prevent bulb burnout!",
                requiredComponents: [{ type: 'led', color: 'red', pin: 13 }, { type: 'resistor', value: 220, pin: 13 }]
            },
            {
                title: "💚 The Big Musical Number",
                story: "The chorus is ready for the big dance number! They need the Harmony Light to bathe the stage in green. Without it, the choreography won't have the right impact!",
                task: "Light up the stage with the Harmony Light for the musical number!",
                requirements: ['Connect Harmony Light to control system', 'Add Dimmer Control'],
                hint: "Chorus lights use circuit 12. Don't forget the dimmer - these lights are BRIGHT!",
                requiredComponents: [{ type: 'led', color: 'green', pin: 12 }, { type: 'resistor', value: 220, pin: 12 }]
            },
            {
                title: "🎭 Full Stage Lighting",
                story: "The director is furious! Act Two needs ALL the lights working: Spotlight for solos, Harmony for groups, and Mood Light for the sad scenes. Get them all operational!",
                task: "Set up the complete lighting system for Act Two!",
                requirements: ['Stage Spotlight (circuit 13)', 'Harmony Light (circuit 12)', 'Mood Light (circuit 11)', 'Dimmer Controls for each'],
                hint: "Red=13, Green=12, Blue=11. Each light absolutely needs its own dimmer or they'll all blow!",
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
                title: "🎬 Stage Manager's Manual Override",
                story: "The lighting computer crashed! The stage manager needs to control the Curtain Motor manually with the cue button. Wire it fast - intermission ends in 5 minutes!",
                task: "Connect the Stage Manager Cue button to operate the Curtain Motor.",
                requirements: ['Connect Stage Manager Cue (input 2)', 'Connect Curtain Motor (output 9)', 'Add Cue Stabilizer'],
                hint: "Cue buttons use input 2. Curtain motors need output 9. The stabilizer prevents the curtain from jerking!",
                requiredComponents: [
                    { type: 'button', pin: 2 },
                    { type: 'resistor', value: 1000, pin: 2 },
                    { type: 'motor', pin: 9 }
                ]
            },
            {
                title: "🎯 Automatic Spotlight Follow",
                story: "The finale! The lead needs the spotlight to follow them automatically across the stage. Connect the Actor Detector to trigger the Spotlight when they hit their mark!",
                task: "Set up automatic spotlight activation using the Actor Detector.",
                requirements: ['Connect Actor Detector (sensors 6 & 7)', 'Connect Stage Spotlight (circuit 13)', 'Add Dimmer Control'],
                hint: "Position sensors use 6 and 7. When the actor hits the mark, the spotlight turns on automatically!",
                requiredComponents: [
                    { type: 'ultrasonic', pin: 6, pin2: 7 },
                    { type: 'led', color: 'red', pin: 13 },
                    { type: 'resistor', value: 220, pin: 13 }
                ]
            }
        ]
    },

    SOCIAL_MEDIA: {
        name: "📱 Viral Content Creator",
        description: "You're a rising social media star! Your livestream studio needs working tech to keep your followers engaged!",
        testButtonText: "📸 Test Studio",

        components: {
            'led-red': { name: 'Recording Light', icon: '🔴', description: 'Shows when you are live' },
            'led-green': { name: 'Chat Active Light', icon: '💬', description: 'Indicates chat is responding' },
            'led-blue': { name: 'Follower Milestone', icon: '⭐', description: 'Lights up for new followers' },
            'resistor-220': { name: 'Brightness Control', icon: '💡', description: 'Controls LED brightness' },
            'resistor-1k': { name: 'Signal Stabilizer', icon: '📶', description: 'Prevents connection drops' },
            'motor': { name: 'Camera Gimbal', icon: '🎥', description: 'Smooth camera movement' },
            'ultrasonic': { name: 'Proximity Sensor', icon: '👋', description: 'Detects when you enter frame' },
            'button': { name: 'Like Button', icon: '❤️', description: 'Manual engagement trigger' }
        },

        levels: [
            {
                title: "🔴 Going Live in 3... 2... 1...",
                story: "You're about to start your biggest livestream ever! But the Recording Light isn't working - your viewers won't know you're live! Quick, fix it before they leave!",
                task: "Get the Recording Light working to show you're live!",
                requirements: ['Connect Recording Light to streaming system', 'Add Brightness Control'],
                hint: "Recording indicators use circuit 13. Control that brightness so it's not too harsh on camera!",
                requiredComponents: [{ type: 'led', color: 'red', pin: 13 }, { type: 'resistor', value: 220, pin: 13 }]
            },
            {
                title: "💬 Chat's Going Crazy!",
                story: "Your viewers are sending TONS of messages but the Chat Active Light is broken! They think you're ignoring them. Show them you're reading with that green light!",
                task: "Fix the Chat Active Light so viewers know you see their messages!",
                requirements: ['Connect Chat Active Light to stream overlay', 'Add Brightness Control'],
                hint: "Chat indicators run on circuit 12. Brightness control keeps it visible without blinding you!",
                requiredComponents: [{ type: 'led', color: 'green', pin: 12 }, { type: 'resistor', value: 220, pin: 12 }]
            },
            {
                title: "⭐ 100K Followers Celebration!",
                story: "YOU HIT 100K FOLLOWERS! Your celebration stream needs ALL lights working: Recording to show you're live, Chat for engagement, and Milestone light for the epic moment!",
                task: "Set up your complete studio lighting system for the celebration!",
                requirements: ['Recording Light (circuit 13)', 'Chat Active Light (circuit 12)', 'Follower Milestone (circuit 11)', 'Brightness Controls for all'],
                hint: "Red=13 (live), Green=12 (chat), Blue=11 (milestone). Each light needs brightness control!",
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
                title: "❤️ Interactive Like System",
                story: "You want viewers to see their likes INSTANTLY! Wire up the Like Button to control the Camera Gimbal for those perfect reaction shots when someone likes!",
                task: "Connect the Like Button to trigger the Camera Gimbal.",
                requirements: ['Connect Like Button (input 2)', 'Connect Camera Gimbal (output 9)', 'Add Signal Stabilizer'],
                hint: "Interactive buttons use input 2. Camera motors need output 9. Stabilize that signal for smooth movement!",
                requiredComponents: [
                    { type: 'button', pin: 2 },
                    { type: 'resistor', value: 1000, pin: 2 },
                    { type: 'motor', pin: 9 }
                ]
            },
            {
                title: "👋 Auto-Start When You Enter",
                story: "You're tired of manually starting streams! Set up the Proximity Sensor to automatically turn on the Recording Light when you step in front of the camera. Pro content creator mode!",
                task: "Install automatic recording activation using the Proximity Sensor.",
                requirements: ['Connect Proximity Sensor (sensors 6 & 7)', 'Connect Recording Light (circuit 13)', 'Add Brightness Control'],
                hint: "Proximity sensors use circuits 6 and 7. When you enter frame, recording starts automatically!",
                requiredComponents: [
                    { type: 'ultrasonic', pin: 6, pin2: 7 },
                    { type: 'led', color: 'red', pin: 13 },
                    { type: 'resistor', value: 220, pin: 13 }
                ]
            }
        ]
    },

    MEDICAL_SURGERY: {
        name: "🏥 Emergency Room Surgeon",
        description: "You're the lead surgeon in the ER. Medical equipment must work perfectly or lives are at risk!",
        testButtonText: "💉 Check Vitals",

        components: {
            'led-red': { name: 'Critical Alert', icon: '🚨', description: 'Emergency warning indicator' },
            'led-green': { name: 'Vitals Stable Light', icon: '💚', description: 'Patient vitals are normal' },
            'led-blue': { name: 'Surgery Ready Light', icon: '🔵', description: 'OR is prepped and ready' },
            'resistor-220': { name: 'Current Regulator', icon: '⚡', description: 'Ensures safe power levels' },
            'resistor-1k': { name: 'Signal Filter', icon: '📊', description: 'Prevents false alarms' },
            'motor': { name: 'IV Pump Motor', icon: '💉', description: 'Controls medication delivery' },
            'ultrasonic': { name: 'Proximity Sensor', icon: '📡', description: 'Detects equipment positioning' },
            'button': { name: 'Emergency Stop', icon: '🛑', description: 'Manual override control' }
        },

        levels: [
            {
                title: "🚨 Code Red - Patient Crashing!",
                story: "Patient in trauma bay 1 is coding! The Critical Alert needs to activate IMMEDIATELY to get all hands on deck. Every second counts!",
                task: "Activate the Critical Alert system right now!",
                requirements: ['Connect Critical Alert to monitoring system', 'Add Current Regulator'],
                hint: "Emergency alerts always use circuit 13 - it's the highest priority. Regulate that current!",
                requiredComponents: [{ type: 'led', color: 'red', pin: 13 }, { type: 'resistor', value: 220, pin: 13 }]
            },
            {
                title: "💚 Vitals Stabilized",
                story: "Good work! The patient's stable now. Turn on the Vitals Stable Light so the team knows they can ease up and the family can breathe again.",
                task: "Signal that the patient is stable with the green indicator.",
                requirements: ['Connect Vitals Stable Light to heart monitor', 'Add Current Regulator'],
                hint: "Stable vitals show on circuit 12. Every medical device needs current regulation for safety!",
                requiredComponents: [{ type: 'led', color: 'green', pin: 12 }, { type: 'resistor', value: 220, pin: 12 }]
            },
            {
                title: "🏥 OR Status Board",
                story: "You've got three surgeries scheduled! The OR Status Board needs all indicators working: Critical for emergencies, Stable for monitoring, and Ready for when the room is prepped.",
                task: "Get all three OR status indicators operational!",
                requirements: ['Critical Alert (circuit 13)', 'Vitals Stable (circuit 12)', 'Surgery Ready (circuit 11)', 'Current Regulators for all'],
                hint: "Red=13 (critical), Green=12 (stable), Blue=11 (ready). Each light MUST have its own regulator!",
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
                title: "🛑 Emergency Stop System",
                story: "The IV Pump is malfunctioning! You need to install the Emergency Stop button so nurses can cut medication flow instantly if there's a problem!",
                task: "Wire the Emergency Stop to control the IV Pump Motor.",
                requirements: ['Connect Emergency Stop (input 2)', 'Connect IV Pump Motor (output 9)', 'Add Signal Filter'],
                hint: "Stop buttons connect to input 2. IV pumps use output 9. The filter prevents accidental stops!",
                requiredComponents: [
                    { type: 'button', pin: 2 },
                    { type: 'resistor', value: 1000, pin: 2 },
                    { type: 'motor', pin: 9 }
                ]
            },
            {
                title: "📡 Automatic Alert System",
                story: "During surgery, you need hands-free alerts! Set up the Proximity Sensor to automatically trigger the Critical Alert if anyone gets too close to the sterile field!",
                task: "Install automatic contamination detection using the Proximity Sensor.",
                requirements: ['Connect Proximity Sensor (sensors 6 & 7)', 'Connect Critical Alert (circuit 13)', 'Add Current Regulator'],
                hint: "Proximity sensors use 6 for transmit and 7 for receive. When breach detected, alert activates!",
                requiredComponents: [
                    { type: 'ultrasonic', pin: 6, pin2: 7 },
                    { type: 'led', color: 'red', pin: 13 },
                    { type: 'resistor', value: 220, pin: 13 }
                ]
            }
        ]
    }
};

// Select active theme (can be changed by user)
let ACTIVE_THEME = GAME_THEMES.SPACE_EXPLORER;
