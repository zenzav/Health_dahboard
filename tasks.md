# Tasks — Health Management System

> Actionable, checkable list of discrete, testable units of work derived from the plan.
> Each task maps to a spec requirement and can be independently verified.

---

## Phase 1 — Backend Setup

- [x] TASK-01: Initialize Node.js project with Express, Mongoose, JWT, dotenv, cors
- [x] TASK-02: Create `.env` file with `PORT`, `MONGODB_URI` (127.0.0.1), `JWT_SECRET`
- [x] TASK-03: Create `server.js` with Express app, CORS, JSON middleware, MongoDB connection
- [x] TASK-04: Create `authMiddleware.js` — verifies Bearer JWT token on protected routes
- [x] TASK-05: Create `POST /api/auth/login` route with hardcoded admin credentials

---

## Phase 2 — Database Models

- [x] TASK-06: Create `Department` model — `name` (required, unique), `description`, timestamps
- [x] TASK-07: Create `Staff` model — `name`, `email` (required), `phone`, `role`, `departmentId` (ref), `status`
- [x] TASK-08: Create `Doctor` model — `name` (required), `specialization`, `phone`, `departmentId` (ref), `status`
- [x] TASK-09: Create `Patient` model — `name` (required), `age`, `gender`, `contact`, `admissionDate`, `medicineDetails`
- [x] TASK-10: Create `Equipment` model — `name` (required), `type`, `departmentId` (ref), `status`, `purchaseDate`

---

## Phase 3 — API Routes

- [x] TASK-11: Create CRUD routes for `/api/departments` — GET all, GET by id, POST, PUT, DELETE
- [x] TASK-12: Add duplicate name check (case-insensitive) on POST /api/departments
- [x] TASK-13: Create CRUD routes for `/api/staff` with department populate
- [x] TASK-14: Create CRUD routes for `/api/doctors` with department populate
- [x] TASK-15: Add `PATCH /api/doctors/:id/toggle-status` to flip Active ↔ Inactive
- [x] TASK-16: Create CRUD routes for `/api/patients` with `?startDate&endDate` filter support
- [x] TASK-17: Create CRUD routes for `/api/equipments` with department populate
- [x] TASK-18: Apply `authMiddleware` to all resource routes

---

## Phase 4 — Seed Data

- [x] TASK-19: Create `seed.js` — seed 6 departments, 8 doctors, 10 staff, 12 patients, 10 equipment
- [x] TASK-20: Verify seed runs without errors and prints summary

---

## Phase 5 — Frontend Setup

- [x] TASK-21: Initialize Vite + React project with Tailwind CSS
- [x] TASK-22: Configure `tailwind.config.js` and `index.css` with custom utility classes
- [x] TASK-23: Create `AuthContext.jsx` — login, logout, token storage, `isAuthenticated` state
- [x] TASK-24: Create `api.js` service with Axios instance pointing to `http://localhost:5000/api`
- [x] TASK-25: Add request interceptor in `api.js` to attach Bearer token automatically

---

## Phase 6 — Layout & Navigation

- [x] TASK-26: Create `DashboardLayout.jsx` — sidebar + header + main content area
- [x] TASK-27: Create `Sidebar.jsx` — navigation links for all 6 modules + logout
- [x] TASK-28: Create `Header.jsx` — page title and user info display
- [x] TASK-29: Create `ProtectedRoute` — redirects to `/login` if no token
- [x] TASK-30: Configure `App.jsx` routes — public `/login`, protected `/dashboard/*`

---

## Phase 7 — Shared Components

- [x] TASK-31: Create `Modal.jsx` — reusable overlay modal with size prop (sm / default / lg)
- [x] TASK-32: Create `Pagination.jsx` — page buttons, showing X–Y of Z results
- [x] TASK-33: Create `StatusBadge.jsx` — colored badge for Active, Inactive, Available, In Use, Maintenance, Male, Female

---

## Phase 8 — Page Modules

- [x] TASK-34: Build `Login.jsx` — form with inline validation, calls AuthContext login
- [x] TASK-35: Build `Overview.jsx` — 4 stat cards (clickable), patient list with date filter, active doctors, staff by department
- [x] TASK-36: Build `Departments.jsx` — table, search, pagination, add/edit/delete with modal
- [x] TASK-37: Build `Staff.jsx` — table, search, pagination, add/edit/delete with modal
- [x] TASK-38: Build `Doctors.jsx` — table, search, pagination, toggle status, add/edit/delete with modal
- [x] TASK-39: Build `Patients.jsx` — table, search, date filter, pagination, add/edit/delete with modal
- [x] TASK-40: Build `Equipments.jsx` — table, search, pagination, add/edit/delete with modal

---

## Phase 9 — Validation & UX

- [x] TASK-41: Remove all `required` attributes from form inputs across all pages
- [x] TASK-42: Add `fieldErrors` state and inline validation to `Departments.jsx`
- [x] TASK-43: Add `fieldErrors` state and inline validation to `Staff.jsx` (name + email)
- [x] TASK-44: Add `fieldErrors` state and inline validation to `Doctors.jsx`
- [x] TASK-45: Add `fieldErrors` state and inline validation to `Patients.jsx`
- [x] TASK-46: Add `fieldErrors` state and inline validation to `Equipments.jsx`

---

## Phase 10 — Fixes & Polish

- [x] TASK-47: Fix MongoDB ECONNREFUSED — change URI to `127.0.0.1` instead of `localhost`
- [x] TASK-48: Fix Vite proxy crash — change API base URL to direct `http://localhost:5000/api`
- [x] TASK-49: Remove date display from Header component
- [x] TASK-50: Remove Bell notification icon from Header
- [x] TASK-51: Make Overview stat cards clickable — navigate to respective module pages

---

## Phase 11 — Spec & Documentation

- [x] TASK-52: Create `specs/` folder with per-module `requirements.md`, `api-contract.md`, `test-plan.md`
- [x] TASK-53: Create `constitution.md` — coding standards, forbidden practices, conventions
- [x] TASK-54: Create `spec.md` — functional requirements, user stories, acceptance criteria, edge cases
- [x] TASK-55: Create `plan.md` — architecture, tech stack, schemas, API summary, integration points
- [x] TASK-56: Create `tasks.md` — this file

---

## Phase 12 — Version Control

- [x] TASK-57: Initialize git repo in `health-management-system/`
- [x] TASK-58: Create `.gitignore` — exclude `node_modules/`, `dist/`, `.env`
- [x] TASK-59: Push initial codebase to GitHub (`zenzav/Health_dahboard`)
- [x] TASK-60: Push spec documents to GitHub

---

## Pending / Future Tasks

- [ ] TASK-61: Add Swagger UI (`/api-docs`) to backend for interactive API documentation
- [ ] TASK-62: Write automated API tests using Jest + Supertest
- [ ] TASK-63: Write E2E tests using Playwright
- [ ] TASK-64: Add export to CSV feature for Patients and Staff modules
- [ ] TASK-65: Add role-based access control (RBAC) beyond single admin user
- [ ] TASK-66: Add real-time notifications using WebSockets
- [ ] TASK-67: Deploy backend to Railway / Render and frontend to Vercel
