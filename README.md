# Atmos UI Dashboard

A modern frontend practice project built with React, TypeScript, Vite, Axios, and json-server.

This project simulates an operational dashboard for atmospheric devices and stations. It was designed as a training project to practice modern frontend architecture, reusable components, accessibility, responsive UI design, feature-based folder structure, typed API integration, filtering, sorting, and routing.

## Features

- React + TypeScript + Vite
- Feature-based folder structure
- Axios service layer
- Generic reusable `useFetch<T>` hook
- Feature-specific hooks for devices and stations
- Routing with React Router
- Responsive card-based UI
- Accessible forms, labels, navigation, and feedback states
- Filtering and sorting for devices
- Filtering and sorting for stations
- Mock backend with json-server

## Tech Stack

- React
- TypeScript
- Vite
- Axios
- React Router DOM
- json-server

## Project Structure

```bash
src/
  app/
    routes/
  components/
    common/
    feedback/
    forms/
    layout/
  features/
    devices/
      components/
      hooks/
      pages/
      services/
      types/
      utils/
    stations/
      components/
      hooks/
      pages/
      services/
      types/
      utils/
  hooks/
  lib/
  styles/
  utils/
```

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd atmos-ui-dashboard
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the mock backend

This project uses `json-server` as a mock backend.

```bash
npm run server
```

The mock API will be available at:

```bash
http://localhost:3001
```

Example endpoints:

- `http://localhost:3001/devices`
- `http://localhost:3001/stations`
- `http://localhost:3001/soundings`
- `http://localhost:3001/alerts`

### 4. Start the frontend

In a separate terminal:

```bash
npm run dev
```

The frontend will be available at:

```bash
http://localhost:5173
```

## Available Scripts

### Run frontend

```bash
npm run dev
```

### Run mock backend

```bash
npm run server
```

### Build the project

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Why This Project Exists

This project was created to practice how to build modern frontend applications in a professional way, including:

- scalable folder structure
- reusable hooks and components
- typed service layer
- accessible UI
- responsive layouts
- filtering and sorting
- clean separation of concerns

It is especially useful for interview preparation for frontend roles involving React, TypeScript, data-driven UIs, and product-oriented thinking.

## Notes

- The backend in this project is mocked with `json-server`
- The data is realistic training data inspired by atmospheric monitoring and operational systems
- This is a frontend practice project, not a production system

## Future Improvements

- detail pages for devices and stations
- lazy-loaded routes
- code splitting
- pagination or virtualization for large datasets
- charts for sounding data
- form validation for create/edit flows
- tests with Vitest and React Testing Library

## License

This project is for learning and portfolio practice.
