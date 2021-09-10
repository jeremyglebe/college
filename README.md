# 5430-Software-Engineering
Wizard Monkeys' project for 5430 Software Engineering at University of North Texas. Our project will be a
mobile-friendly web game coded using modern (ES6) JavaScript.

## File Structure
📦5430-Software-Engineering
 ┣ 📂assets
 ┃ ┗ 📜README.md
 ┣ 📂meetings
 ┃ ┗ 📜README.MD
 ┣ 📂plans
 ┃ ┗ 📜README.MD
 ┣ 📂reports
 ┃ ┗ 📜README.MD
 ┣ 📂src
 ┃ ┣ 📜README.md
 ┃ ┣ 📜index.html
 ┃ ┗ 📜start.js
 ┣ 📜.gitignore
 ┣ 📜GROUP-INFO
 ┣ 📜README.md
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┗ 📜webpack.config.js

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

### Framworks
- Webpack for building the project
- Phaser3 for our game engine (mobile supported)
- Capacitor to build for mobile/desktop/whatever
