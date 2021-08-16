# angular-starter
Boilerplate for creating Angular project.

[![Build Status](https://github.com/AlexanderMac/angular-starter/workflows/CI/badge.svg)](https://github.com/AlexanderMac/angular-starter/actions?query=workflow%3ACI)

### Features
- Users CRUD
- Using LocalStorage or HttpClient as a source data
- Clean code:)

### Set
- **Framework**: Angular v12
- **Language**: TypeScript v4
- **Build tool**: @angular-builders/custom-webpack
- **CSS preprocessor**: stylus
- **CSS framework**: boostrap v5
- **Template engine**: pug
- **Linters**: eslint

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
npm run build      # for dev
npm run build:prod # for production

# Start app and watch for changes (dev server started on port 3000):
npm start
```

### License
[MIT License](LICENSE)

### Author
Alexander Mac