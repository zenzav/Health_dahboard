# Constitution — Health Management System

> Defines project-wide governing principles, coding standards, architectural patterns,
> and "forbidden" practices that guide all subsequent technical decisions.

---

## 1. Core Principles

- **Spec before code** — No feature is built without a corresponding spec entry
- **API first** — Backend contracts are defined before frontend consumes them
- **Fail loudly** — Errors must return meaningful messages with correct HTTP status codes
- **Single responsibility** — Each route file handles one resource only
- **Auth everywhere** — Every non-auth endpoint must require a valid JWT token

---

## 2. Coding Standards

### Backend (Node.js / Express)
- Use `async/await` — never use raw `.then()` chains in route handlers
- Always wrap route logic in `try/catch` and return structured error responses
- Use `const` by default; only use `let` when reassignment is needed
- Route files live in `backend/routes/`, models in `backend/models/`
- Environment variables must be accessed via `process.env`, never hardcoded

### Frontend (React / Vite)
- One component per file; filename matches the exported component name
- Pages live in `frontend/src/pages/`, shared components in `frontend/src/components/`
- Use `useCallback` for functions passed to `useEffect` dependencies
- API calls are centralized in `frontend/src/services/api.js` — no direct `axios` calls in pages
- Form validation uses `fieldErrors` state — native HTML `required` attribute is forbidden

### General
- No `console.log` in production code (only `console.error` in catch blocks)
- All dates stored as ISO strings; displayed using `.toLocaleDateString()`
- MongoDB IDs referenced as `_id` consistently throughout the codebase

---

## 3. Architectural Patterns

| Layer | Pattern |
|-------|---------|
| Auth | Stateless JWT — token stored in `localStorage` |
| API | RESTful — resource-based URLs, correct HTTP verbs |
| Database | MongoDB with Mongoose — populate refs, never manual joins |
| State | Local React state (`useState`) — no global state library |
| Routing | React Router v6 — protected routes via `ProtectedRoute` component |

---

## 4. Forbidden Practices

| # | Forbidden | Reason |
|---|-----------|--------|
| F-01 | Hardcoding secrets in source files | Security risk — use `.env` |
| F-02 | Using `required` attribute on HTML form inputs | Causes native browser tooltips — use custom `fieldErrors` |
| F-03 | Calling APIs directly in React components | All API calls go through `services/api.js` |
| F-04 | Storing sensitive data in responses (passwords, secrets) | Privacy / security |
| F-05 | Using `localhost` in MongoDB URI | Resolves to IPv6 `::1` — use `127.0.0.1` |
| F-06 | Returning 200 for errors | Use correct status: 400, 401, 404, 500 |
| F-07 | Skipping auth middleware on protected routes | All resource routes must use `auth` middleware |
| F-08 | Direct DOM manipulation in React | Use React state and re-renders |
| F-09 | Committing `node_modules/` or `.env` | Listed in `.gitignore` |
| F-10 | Creating new abstraction layers for one-time use | Prefer inline logic over premature abstraction |

---

## 5. HTTP Status Code Convention

| Status | When to use |
|--------|-------------|
| 200 | Successful GET, PUT, DELETE, PATCH |
| 201 | Successful POST (resource created) |
| 400 | Bad request — missing/invalid input |
| 401 | Unauthorized — missing or invalid token |
| 404 | Resource not found |
| 500 | Unexpected server error |

---

## 6. Branch & Commit Convention

- Branch naming: `feature/<module>`, `fix/<issue>`, `docs/<topic>`
- Commit messages: start with a verb — `Add`, `Fix`, `Update`, `Remove`, `Refactor`
- Never commit directly to `main` — use PRs for significant changes
