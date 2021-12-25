# angular-starter
Boilerplate for creating Angular project.

[![Build Status](https://github.com/AlexanderMac/angular-starter/workflows/CI/badge.svg)](https://github.com/AlexanderMac/angular-starter/actions?query=workflow%3ACI)

### Features
- Users CRUD
- Using LocalStorage or HttpClient as a source data
- Clean code:)

### Set
- **Framework**: Angular v13
- **Language**: TypeScript v4
- **Build tool**: @angular-builders/custom-webpack
- **CSS preprocessor**: Stylus
- **CSS framework**: Boostrap v5
- **Template engine**: Pug
- **Tools**: ESLint

### How to use
```sh
# Clone this repo:
git clone https://github.com/AlexanderMac/angular-starter

# Init your repo:
cd angular-starter && rm -rf .git && git init

# Install pnpm when needed
npm install -g pnpm

# Install dependencies:
pnpm i

# Run tests (linter):
pnpm test

# Build app:
pnpm build      # for dev
pnpm build:prod # for production

# Start app and watch for changes (dev server started on port 3000):
pnpm start
```

### License
[MIT License](LICENSE)

### Author
Alexander Mac