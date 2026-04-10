# Departments — Test Plan

## TC-DEPT-01: Get All Departments
- **Type:** Positive
- **Steps:** GET /api/departments with valid token
- **Expected:** 200 OK, array of department objects

## TC-DEPT-02: Get All — No Token
- **Type:** Negative
- **Steps:** GET /api/departments without Authorization header
- **Expected:** 401 Unauthorized

## TC-DEPT-03: Get Single Department
- **Type:** Positive
- **Steps:** GET /api/departments/:id with valid ID
- **Expected:** 200 OK, single department object

## TC-DEPT-04: Get Single — Invalid ID
- **Type:** Negative
- **Steps:** GET /api/departments/invalidid123
- **Expected:** 404 or 500 with error message

## TC-DEPT-05: Create Department — Valid
- **Type:** Positive
- **Steps:** POST /api/departments with `{ "name": "Neurology", "description": "Brain care" }`
- **Expected:** 201 Created, new department object with `_id`

## TC-DEPT-06: Create Department — Missing Name
- **Type:** Negative
- **Steps:** POST /api/departments with `{ "description": "Some description" }`
- **Expected:** 400 Bad Request, `{ "message": "Department name is required" }`

## TC-DEPT-07: Create Department — Duplicate Name
- **Type:** Negative
- **Steps:** POST /api/departments with a name that already exists
- **Expected:** 400 Bad Request, `{ "message": "Department with this name already exists" }`

## TC-DEPT-08: Create Department — Duplicate Name Case Insensitive
- **Type:** Negative
- **Steps:** POST /api/departments with `{ "name": "cardiology" }` when "Cardiology" exists
- **Expected:** 400 Bad Request

## TC-DEPT-09: Update Department — Valid
- **Type:** Positive
- **Steps:** PUT /api/departments/:id with `{ "name": "Updated Name" }`
- **Expected:** 200 OK, updated department object

## TC-DEPT-10: Update Department — Not Found
- **Type:** Negative
- **Steps:** PUT /api/departments/000000000000000000000000
- **Expected:** 404 Not Found

## TC-DEPT-11: Delete Department — Valid
- **Type:** Positive
- **Steps:** DELETE /api/departments/:id with valid ID
- **Expected:** 200 OK, `{ "message": "Department deleted successfully" }`

## TC-DEPT-12: Delete Department — Not Found
- **Type:** Negative
- **Steps:** DELETE /api/departments/000000000000000000000000
- **Expected:** 404 Not Found

## TC-DEPT-13: UI — Add Department Form Validation
- **Type:** UI
- **Steps:** Open Add Department modal, submit empty form
- **Expected:** "Department name is required" shown below Name field, no API call made

## TC-DEPT-14: UI — Department List Displays Correctly
- **Type:** UI
- **Steps:** Navigate to Departments page
- **Expected:** Table shows all departments with name, description, created date, and action buttons
