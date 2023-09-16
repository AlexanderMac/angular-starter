# angular-starter
Boilerplate for creating Angular project.

[Demo](https://alexandermac.github.io/angular-starter/)

[![Build Status](https://github.com/AlexanderMac/angular-starter/workflows/CI/badge.svg)](https://github.com/AlexanderMac/angular-starter/actions?query=workflow%3ACI)

### Features
- Tasks CRUD
- Using LocalStorage or HttpClient as a source data
- Clean code:)


### Set
- **Framework**: Angular v16
- **Language**: TypeScript v5
- **Build tool**: Webpack v5
- **CSS preprocessor**: SASS
- **CSS framework**: Bootstrap v5
- **Template engine**: Pug
- **Linters, Formatters**: ESLint, Prettier

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

# Start app and watch for changes (dev server started on port 3000):
pnpm start
```

### Commands
```sh
pnpm generate   # angular generator
pnpm build      # build for dev
pnpm build:prod # build for production
pnpm start      # Start app and watch for changes (dev server started on port 3000)
pnpm lint       # run linter and fix found issues
pnpm prettify   # run prettier
pnpm format     # run linter and prettier
```

### License
[MIT License](LICENSE)

### Author
Alexander Mac
