# Contacts Book

Single-page CRUD contacts application built for the PaperPlane assignment.

## Tech Stack

- React + TypeScript (strict mode)
- React Router v6
- Zustand for state management
- MUI for UI components and theming
- Vitest + React Testing Library for unit tests

## Why Zustand?

Zustand is used to keep the local client-side state simple and readable without reducer boilerplate.
For this assignment scope (single app-level contacts store, no backend), it offers cleaner component code
while still keeping updates predictable and testable.

## Features

- Contact list table with search, tag filters, and sorting
- Responsive mobile card layout
- Add and edit using one reusable contact form component
- Field validation including duplicate email prevention
- Unsaved changes warning for dirty form navigation
- Contact detail page with avatar initials and delete confirmation
- Seeded with sample contacts on first load

## Scripts

- `npm run dev` - start dev server
- `npm run build` - type check + production build
- `npm run test` - run unit tests
