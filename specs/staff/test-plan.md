# Staff — Test Plan

## TC-STAFF-01: Get All Staff
- **Type:** Positive
- **Steps:** GET /api/staff with valid token
- **Expected:** 200 OK, array with departmentId populated as object with name

## TC-STAFF-02: Create Staff — Valid
- **Type:** Positive
- **Steps:** POST /api/staff with name, email, phone, role, departmentId, status
- **Expected:** 201 Created, new staff object returned with populated department

## TC-STAFF-03: Create Staff — Missing Name
- **Type:** Negative
- **Steps:** POST /api/staff with `{ "email": "test@test.com" }`
- **Expected:** 400 Bad Request, `{ "message": "Name and email are required" }`

## TC-STAFF-04: Create Staff — Missing Email
- **Type:** Negative
- **Steps:** POST /api/staff with `{ "name": "Test User" }`
- **Expected:** 400 Bad Request

## TC-STAFF-05: Create Staff — Without Department
- **Type:** Positive
- **Steps:** POST /api/staff without departmentId field
- **Expected:** 201 Created, departmentId is null

## TC-STAFF-06: Update Staff — Valid
- **Type:** Positive
- **Steps:** PUT /api/staff/:id with updated fields
- **Expected:** 200 OK, updated staff object

## TC-STAFF-07: Update Staff — Not Found
- **Type:** Negative
- **Steps:** PUT /api/staff/000000000000000000000000
- **Expected:** 404 Not Found

## TC-STAFF-08: Delete Staff — Valid
- **Type:** Positive
- **Steps:** DELETE /api/staff/:id
- **Expected:** 200 OK, `{ "message": "Staff member deleted successfully" }`

## TC-STAFF-09: Delete Staff — Not Found
- **Type:** Negative
- **Steps:** DELETE /api/staff/000000000000000000000000
- **Expected:** 404 Not Found

## TC-STAFF-10: UI — Form Validation (Empty Name)
- **Type:** UI
- **Steps:** Open Add Staff modal, leave Name empty, click Create
- **Expected:** "Full name is required" shown below Name field

## TC-STAFF-11: UI — Form Validation (Empty Email)
- **Type:** UI
- **Steps:** Open Add Staff modal, fill Name but leave Email empty, click Create
- **Expected:** "Email is required" shown below Email field

## TC-STAFF-12: UI — Search by Name
- **Type:** UI
- **Steps:** Type a staff name in search box
- **Expected:** Table filters to matching rows only

## TC-STAFF-13: UI — Search by Role
- **Type:** UI
- **Steps:** Type a role (e.g. "Nurse") in search box
- **Expected:** Table shows staff with that role

## TC-STAFF-14: UI — Status Badge
- **Type:** UI
- **Steps:** View staff list
- **Expected:** Active shows green badge, Inactive shows grey badge
