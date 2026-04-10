# Health Management System — Spec Directory

This folder contains all specification documents for the Health Management System project.
Each module has its own folder with three files:

| File | Purpose |
|------|---------|
| `requirements.md` | Functional & non-functional requirements |
| `api-contract.md` | API endpoints with request/response structure |
| `test-plan.md` | Test cases covering all scenarios |

## Modules

| Module | Folder |
|--------|--------|
| Authentication | `auth/` |
| Departments | `departments/` |
| Staff | `staff/` |
| Doctors | `doctors/` |
| Patients | `patients/` |
| Equipments | `equipments/` |

## Base URL
```
http://localhost:5000/api
```

## Auth Header (required on all endpoints except login)
```
Authorization: Bearer <token>
```
