# angular-starter
Boilerplate for creating Angular project.

[![Build Status](https://github.com/AlexanderMac/angular-starter/workflows/CI/badge.svg)](https://github.com/AlexanderMac/angular-starter/actions?query=workflow%3ACI)

### Features
- Users/Roles CRUD
- Using LocalStorage or HttpClient as a source data
- Clean code:)

### Set
- **Framework**: Angular v11
- **Language**: TypeScript v4
- **Build tool**: Webpack v5
- **CSS preprocessor**: stylus
- **CSS framework**: boostrap v4
- **Template engine**: pug
- **Linters**: eslint, pug-lint

### How to use
```sh
# Clone this repo:
git clone https://github.com/AlexanderMac/angular-starter

# Init your repo:
cd angular-starter && rm -rf .git && git init

# Install dependencies:
npm i

# Run tests (linter):
npm test

# Build app:
npm run build            # for dev
npm run build:production # for production

# Start app and watch for changes:
npm start
# Open localhost:3001 in the browser
```

### Author
Alexander Mac

### License
[MIT License](license)
