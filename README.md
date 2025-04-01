# JavaScript Testing Course

A comprehensive project demonstrating JavaScript testing practices using modern tools and frameworks. This project is part of the "Mastering JavaScript Unit Testing" course by [Mosh Hamedani](https://codewithmosh.com/p/mastering-javascript-unit-testing).

## 📚 About the Course

This project is a code-along companion to the "Mastering JavaScript Unit Testing" course, which is designed to equip you with the skills to write maintainable, robust, and valuable unit tests for your JavaScript applications.

### Course Details
- **Duration**: 4 Hours
- **Level**: Beginner to Pro
- **Lessons**: 70
- **Instructor**: Mosh Hamedani (20+ years of software engineering experience)

### What You'll Learn
- Fundamentals of unit testing and its significance in JavaScript development
- Core techniques including positive, negative, and boundary testing
- Mocking and dependency isolation
- Code quality improvement with static analysis tools
- TypeScript integration for type safety
- Automated quality checks with Husky
- VSCode shortcuts for efficient testing
- Working with matchers and crafting precise assertions
- Breaking dependencies with mocks
- Improving code quality with static analysis

### Prerequisites
- Familiarity with modern JavaScript features (arrow functions, modules, promises, etc.)
- No prior knowledge of unit testing required

For the complete course content and more learning resources, visit [Code with Mosh](https://codewithmosh.com/p/mastering-javascript-unit-testing).

## 🚀 Features

- Unit testing with Vitest
- TypeScript support
- Code formatting with Prettier
- Linting with ESLint
- Git hooks with Husky
- Code coverage reporting
- Mocking examples

## 🛠️ Tech Stack

- [Vitest](https://vitest.dev/) - Modern test runner
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Vite](https://vitejs.dev/) - Build tool
- [ESLint](https://eslint.org/) - Code linting
- [Prettier](https://prettier.io/) - Code formatting
- [Husky](https://typicode.github.io/husky/) - Git hooks
- [lint-staged](https://github.com/okonet/lint-staged) - Run linters on git staged files

## 📦 Installation

1. Clone the repository:
```bash
git clone [your-repo-url]
cd javascript-testing-course
```

2. Install dependencies:
```bash
npm install
```

## 🧪 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm test` - Run tests
- `npm run test:ui` - Run tests with UI
- `npm run coverage` - Generate test coverage report
- `npm run format` - Format code with Prettier
- `npm run lint` - Lint code with ESLint
- `npm run check-types` - Check TypeScript types

## 📚 Project Structure

```
├── src/
│   ├── libs/         # Library code
│   ├── core.js       # Core functionality
│   ├── intro.js      # Introduction examples
│   └── mocking.js    # Mocking examples
├── tests/            # Test files
├── .husky/           # Git hooks
└── config files      # Various configuration files
```

## 🔧 Configuration

The project uses several configuration files:

- `vitest.config.js` - Vitest configuration
- `tsconfig.json` - TypeScript configuration
- `.eslintrc.json` - ESLint configuration
- `.prettierrc.json` - Prettier configuration
- `.lintstagedrc.json` - lint-staged configuration