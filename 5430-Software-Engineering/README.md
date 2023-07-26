# 5430-Software-Engineering
Wizard Monkeys' project for 5430 Software Engineering at University of North Texas. Our project will be a
mobile-friendly web game coded using modern (ES6) JavaScript.

**Try the live alpha build at [drowsyprof.itch.io/hex-army](https://drowsyprof.itch.io/hex-army)**

## File Structure
```
 📦5430-Software-Engineering
 ┣ 📂assets
 ┃ ┣ 📂html
 ┃ ┣ 📂images
 ┃ ┃ ┗ 📂tiles
 ┃ ┣ 📂sounds
 ┣ 📂meetings
 ┣ 📂plans
 ┣ 📂reports
 ┣ 📂src
 ┃ ┣ 📂scenes
 ┃ ┣ 📜index.html
 ┃ ┗ 📜start.js
 ┣ 📂www
 ┣ 📜GROUP-INFO
 ┣ 📜Note-deliverable-1.md
 ┗ 📜README.md
 ```

## Information for Contributors
### Commands
```sh
# Install dependencies (must be done once initially and any time a new dependency is added to project)
npm install

# Run the project in a server (connect with your browser to test)
npm run serve # Use this command
npm run test  # OR this, both commands are the same
# Run the project in a server open to LAN devices (can be useful for mobile testing)
npm run serve:lan
# Just build the project to www/ folder (production mode)
npm run build
```

### Frameworks
- Webpack for building the project
- Phaser3 for our game engine (mobile supported)
- Capacitor to build for mobile/desktop/whatever
