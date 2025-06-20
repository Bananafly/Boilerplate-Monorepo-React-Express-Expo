<!-- @format -->

# Modern Full-Stack Monorepo Boilerplate 🚀

[![Turborepo](https://img.shields.io/badge/built%20with-Turborepo-EF4444.svg?style=for-the-badge)](https://turbo.build/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Expo](https://img.shields.io/badge/Expo-000000?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)

A modern, production-ready monorepo boilerplate built with Turborepo, featuring a React frontend, Express.js backend, and React Native mobile app. This project demonstrates advanced architectural patterns, modern tooling, and best practices for building scalable full-stack applications.

## 🌟 Features

### Architecture & Structure

- **Monorepo Setup** using Turborepo for optimal workspace management
- **Type-safe** end-to-end development with TypeScript
- **Shared Package** for common utilities and types across applications

### Frontend (Web)

- **Modern React** (v19) with Vite for lightning-fast development
- **Advanced Routing** with React Router v7
- **State Management** using Zustand and TanStack Query
- **Form Handling** with React Hook Form
- **Component Development** with Storybook
- **Authentication** integrated with Clerk
- **Styling** with Tailwind CSS and advanced utilities
- **Testing** setup with Playwright for E2E tests

### Mobile (React Native)

- **React Native** with Expo for cross-platform development
- **NativeWind** for Tailwind CSS styling in React Native
- **Expo Router** for file-based navigation
- **SF Symbols** and Material Icons for native iconography
- **Haptic Feedback** and native animations
- **Type-safe** development with TypeScript

### Backend (API)

- **Express.js** with TypeScript
- **Prisma ORM** for type-safe database operations
- **Authentication & Authorization** with Clerk
- **Webhook Handling** infrastructure
- **Advanced Middleware** patterns
- **Service-based Architecture**

### Development Experience

- **Type Safety** across the entire stack
- **Fast Refresh** enabled for rapid development
- **Automated Testing** infrastructure
- **Code Generation** tools with Plop
- **Linting & Formatting** with Biome
- **Git Hooks** with Husky and lint-staged

## 🏗️ Project Structure

```
boilerplate/
├── apps/
│   ├── api/ # Backend Express.js application
│   │   ├── prisma/ # Database schema and migrations
│   │   └── src/
│   │       ├── controllers/
│   │       ├── middleware/
│   │       ├── routes/
│   │       └── services/
│   ├── mobile/ # React Native mobile application
│   │   ├── app/ # Expo Router file-based routing
│   │   ├── components/ # Reusable UI components
│   │   ├── constants/ # App constants and colors
│   │   └── hooks/ # Custom React hooks
│   └── web/ # Frontend React application
│       ├── src/
│       │   ├── api/ # API integration
│       │   ├── components/ # Reusable UI components
│       │   ├── features/ # Feature-based modules
│       │   └── hooks/ # Custom React hooks
│       └── e2e/ # End-to-end tests
├── packages/
│   └── shared/ # Shared utilities and types
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PNPM (v8.15.1 or higher)
- Docker (for local development)
- Expo CLI (for mobile development)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/boilerplate.git
   cd boilerplate
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set up environment variables:

   ```bash
   cp apps/api/.env.example apps/api/.env
   cp apps/web/.env.example apps/web/.env
   ```

4. Start the development servers:

   ```bash
   # Start all applications
   pnpm dev

   # Start specific applications
   pnpm dev:web # Frontend only
   pnpm dev:api # Backend only
   pnpm dev:mobile # Mobile only
   ```

## 🛠️ Development

### Available Scripts

- `pnpm dev` - Start all applications in development mode
- `pnpm build` - Build all applications
- `pnpm lint` - Lint all applications
- `pnpm lint:fix` - Fix linting issues
- `pnpm test` - Run tests
- `pnpm test-e2e` - Run end-to-end tests

### Mobile Development

The mobile app uses Expo for cross-platform development:

```bash
# Start mobile development server
cd apps/mobile && pnpm start

# Run on iOS simulator
cd apps/mobile && pnpm ios

# Run on Android emulator
cd apps/mobile && pnpm android

# Run on web
cd apps/mobile && pnpm web
```

### Working with Components

The web application follows the Atomic Design methodology:

- `atoms/` - Basic building blocks
- `molecules/` - Combinations of atoms
- `organisms/` - Complex UI components
- `templates/` - Page layouts
- `pages/` - Complete pages

### Database Management

The API uses Prisma as ORM. Common database operations:

```bash
# Generate Prisma client
cd apps/api && pnpm prisma generate

# Run migrations
cd apps/api && pnpm prisma migrate dev

# Reset database
cd apps/api && pnpm prisma reset
```

## 🧪 Testing

The project includes several types of tests:

- Unit tests using Vitest
- Integration tests
- E2E tests using Playwright
- Component tests using Storybook

Run tests:

```bash
# Unit tests
pnpm test

# E2E tests
pnpm test-e2e

# Start Storybook
pnpm storybook
```

## 🔐 Security

- Authentication handled by Clerk
- CORS configured for security
- Environment variables for sensitive data
- Type-safe database operations
- Input validation using Zod

## 🚀 Deployment

The project is configured for easy deployment to various platforms:

- Frontend can be deployed to Vercel, Netlify, or any static hosting
- Backend can be deployed to any Node.js hosting platform
- Mobile app can be deployed to App Store and Google Play via Expo
- Database can be hosted on any PostgreSQL-compatible platform

## 📈 Performance

- Optimized builds with Turborepo
- Code splitting and lazy loading
- Efficient caching strategies
- Optimized asset loading

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guidelines](./CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgments

- [Turborepo](https://turbo.build/)
- [React](https://reactjs.org/)
- [Express.js](https://expressjs.com/)
- [Prisma](https://www.prisma.io/)
- [Clerk](https://clerk.dev/)
- And all other open-source projects that made this possible!
