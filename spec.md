# Spec — Health Management System

> Documents **what** to build from a user's perspective.
> Includes functional/non-functional requirements, user stories with acceptance criteria,
> and constraint definitions with edge cases.

---

## 1. Functional Requirements

### Authentication
| ID | Requirement |
|----|-------------|
| FR-AUTH-01 | User can log in with username and password |
| FR-AUTH-02 | System returns a JWT token valid for 24 hours on successful login |
| FR-AUTH-03 | All dashboard pages are inaccessible without a valid token |
| FR-AUTH-04 | User is redirected to login page on token expiry |

### Departments
| ID | Requirement |
|----|-------------|
| FR-DEPT-01 | Admin can create a department with a name and optional description |
| FR-DEPT-02 | Department names must be unique (case-insensitive) |
| FR-DEPT-03 | Admin can edit an existing department |
| FR-DEPT-04 | Admin can delete a department |
| FR-DEPT-05 | Departments list is searchable by name and description |
| FR-DEPT-06 | List is paginated — 8 records per page |

### Staff
| ID | Requirement |
|----|-------------|
| FR-STAFF-01 | Admin can create a staff member with name and email (required) |
| FR-STAFF-02 | Staff can be assigned to a department |
| FR-STAFF-03 | Admin can update all staff fields |
| FR-STAFF-04 | Admin can delete a staff member |
| FR-STAFF-05 | Staff list is searchable by name, email, and role |
| FR-STAFF-06 | Staff status can be Active or Inactive |

### Doctors
| ID | Requirement |
|----|-------------|
| FR-DOC-01 | Admin can create a doctor with a name (required) |
| FR-DOC-02 | Doctor can be assigned a specialization and department |
| FR-DOC-03 | Admin can toggle doctor status between Active and Inactive |
| FR-DOC-04 | Admin can update and delete a doctor |
| FR-DOC-05 | Doctors list is searchable by name and specialization |

### Patients
| ID | Requirement |
|----|-------------|
| FR-PAT-01 | Admin can create a patient record with a name (required) |
| FR-PAT-02 | Patient record includes age, gender, contact, admission date, medicine details |
| FR-PAT-03 | Admin can filter patients by admission date range |
| FR-PAT-04 | Admin can update and delete a patient record |
| FR-PAT-05 | Patient list is searchable by name and contact number |

### Equipments
| ID | Requirement |
|----|-------------|
| FR-EQ-01 | Admin can create equipment with a name (required) |
| FR-EQ-02 | Equipment has a type, status, department, and purchase date |
| FR-EQ-03 | Equipment status can be Available, In Use, or Maintenance |
| FR-EQ-04 | Admin can update and delete equipment |
| FR-EQ-05 | Equipment list is searchable by name and type |

### Overview Dashboard
| ID | Requirement |
|----|-------------|
| FR-OV-01 | Dashboard shows total counts: Patients, Staff, Doctors, Equipments |
| FR-OV-02 | Each stat card is clickable and navigates to the respective module page |
| FR-OV-03 | Dashboard shows a patient list with admission date filter |
| FR-OV-04 | Dashboard shows available (Active) doctors |
| FR-OV-05 | Dashboard shows staff grouped by department |

---

## 2. Non-Functional Requirements

| ID | Category | Requirement |
|----|----------|-------------|
| NFR-01 | Security | All API routes (except login) require Bearer token authentication |
| NFR-02 | Security | JWT secret stored in environment variable, not in source code |
| NFR-03 | Performance | API responses should complete within 1 second under normal load |
| NFR-04 | Usability | Form validation errors appear inline below the field, not as browser tooltips |
| NFR-05 | Usability | All tables are paginated with 8 records per page |
| NFR-06 | Usability | Search filters apply client-side without requiring a page reload |
| NFR-07 | Reliability | Backend returns meaningful error messages with correct HTTP status codes |
| NFR-08 | Maintainability | Each module is self-contained: one route file, one model file, one page component |

---

## 3. User Stories

### Authentication
- **As an** admin, **I want to** log in with my credentials, **so that** I can access the dashboard securely.
  - **Acceptance Criteria:**
    - [ ] Login form accepts username and password
    - [ ] Successful login stores token and redirects to dashboard
    - [ ] Invalid credentials show error message on the form
    - [ ] Empty fields show inline validation errors

### Departments
- **As an** admin, **I want to** manage departments, **so that** I can organize staff and doctors.
  - **Acceptance Criteria:**
    - [ ] Can create a department with unique name
    - [ ] Duplicate department name shows error from server
    - [ ] Can edit name and description of existing department
    - [ ] Can delete a department with confirmation modal
    - [ ] Search filters the list in real time

### Staff
- **As an** admin, **I want to** manage staff members, **so that** I can track hospital personnel.
  - **Acceptance Criteria:**
    - [ ] Can create staff with name and email (required)
    - [ ] Can assign staff to a department
    - [ ] Can set status to Active or Inactive
    - [ ] Search works across name, email, and role fields

### Doctors
- **As an** admin, **I want to** manage doctors and their availability, **so that** I can track active staff.
  - **Acceptance Criteria:**
    - [ ] Can create doctor with specialization and department
    - [ ] Toggle button switches status without reloading the page
    - [ ] Overview page shows only Active doctors

### Patients
- **As an** admin, **I want to** manage patient records and filter by admission date, **so that** I can track admissions over time.
  - **Acceptance Criteria:**
    - [ ] Can create patient with full details
    - [ ] Date range filter applies when clicking Apply
    - [ ] Clear button resets filter and shows all patients
    - [ ] Medicine details truncated in table, full text shown in edit form

### Equipments
- **As an** admin, **I want to** track equipment status, **so that** I know what is available, in use, or under maintenance.
  - **Acceptance Criteria:**
    - [ ] Can create equipment with type and purchase date
    - [ ] Status badge reflects Available / In Use / Maintenance with distinct colors
    - [ ] Can assign equipment to a department

---

## 4. Constraints & Edge Cases

### Security Constraints
- Login endpoint is the only public endpoint — all others are behind JWT auth
- Token must be sent as `Authorization: Bearer <token>` header

### Data Constraints
- `departmentId` is optional on Staff, Doctors, and Equipments — sending empty string sets it to `null`
- Patient age must be between 0 and 150
- Equipment status must be one of: `Available`, `In Use`, `Maintenance`
- Doctor/Staff status must be one of: `Active`, `Inactive`

### Edge Cases
| # | Scenario | Expected Behavior |
|---|----------|-------------------|
| EC-01 | Create department with existing name (different case) | 400 — duplicate name error |
| EC-02 | Delete a department that has staff/doctors assigned | Deletes department; staff/doctors retain the (now broken) reference |
| EC-03 | Filter patients with only startDate | Returns patients from that date onwards |
| EC-04 | Filter patients with only endDate | Returns patients admitted up to and including that date |
| EC-05 | Access dashboard with expired JWT | Redirected to login page |
| EC-06 | Submit form with whitespace-only name | Validation catches it — `name.trim()` is checked |
| EC-07 | Search with no results | Empty state icon and message shown in table |
| EC-08 | Page beyond total pages in pagination | Last valid page is shown |
