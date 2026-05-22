# SamakeurTech - Project Overview

SamakeurTech is a modern web application built with Angular for listing and managing housings (logements) in Dakar, Senegal. The platform allows users to browse available properties, view detailed information, and add new listings.

## 🛠 Tech Stack

- **Framework:** Angular (v21+)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (v4)
- **State Management:** Angular Services
- **Build Tool:** Angular CLI / Vite
- **Testing:** Vitest

## 📁 Project Structure

- `src/app/components/`: UI components (Navbar, Footer, Home, CardLogement, DetailLogement, AjouterLogement).
- `src/app/models/`: TypeScript interfaces and data models (e.g., `Logement`).
- `src/app/services/`: Business logic and data management (e.g., `LogementService`).
- `src/app/app.routes.ts`: Application routing configuration.
- `public/assets/images/`: Static assets for housing previews.

## 🚀 Getting Started

### Prerequisites

- Node.js (Latest LTS recommended)
- Angular CLI (`npm install -g @angular/cli`)

### Installation

```bash
npm install
```

### Development Server

```bash
npm start
# or
ng serve
```
Navigate to `http://localhost:4200/`.

### Building

```bash
npm run build
# or
ng build
```

### Testing

```bash
npm test
# or
ng test
```

## 📐 Development Conventions

- **Standalone Components:** The project uses Angular standalone components.
- **Service-based Data:** Data fetching and state should be handled within services (see `LogementService`).
- **Tailwind CSS:** Use Tailwind utility classes for styling. Global styles are in `src/styles.css`.
- **Prettier:** Code formatting is enforced via Prettier (settings in `package.json`).
- **Vitest:** Unit tests are written using Vitest. Ensure each component has a corresponding `.spec.ts` file.

## 🗺 Roadmap / TODOs

- [ ] Implement actual data persistence (currently using mock data in `LogementService`).
- [ ] Add form validation for the 'Add Housing' feature.
- [ ] Implement search and filtering by type/quartier.
- [ ] Add more comprehensive unit and E2E tests.
