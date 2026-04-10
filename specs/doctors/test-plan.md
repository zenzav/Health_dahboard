# Doctors — Test Plan

## TC-DOC-01: Get All Doctors
- **Type:** Positive
- **Steps:** GET /api/doctors with valid token
- **Expected:** 200 OK, array with departmentId populated

## TC-DOC-02: Create Doctor — Valid
- **Type:** Positive
- **Steps:** POST /api/doctors with all fields
- **Expected:** 201 Created, doctor object returned

## TC-DOC-03: Create Doctor — Missing Name
- **Type:** Negative
- **Steps:** POST /api/doctors with `{ "specialization": "Cardiologist" }`
- **Expected:** 400 Bad Request, `{ "message": "Doctor name is required" }`

## TC-DOC-04: Create Doctor — Without Department
- **Type:** Positive
- **Steps:** POST /api/doctors without departmentId
- **Expected:** 201 Created, departmentId is null

## TC-DOC-05: Update Doctor — Valid
- **Type:** Positive
- **Steps:** PUT /api/doctors/:id with updated specialization
- **Expected:** 200 OK, updated doctor object

## TC-DOC-06: Toggle Status — Active to Inactive
- **Type:** Positive
- **Steps:** PATCH /api/doctors/:id/toggle-status on an Active doctor
- **Expected:** 200 OK, status is now "Inactive"

## TC-DOC-07: Toggle Status — Inactive to Active
- **Type:** Positive
- **Steps:** PATCH /api/doctors/:id/toggle-status on an Inactive doctor
- **Expected:** 200 OK, status is now "Active"

## TC-DOC-08: Toggle Status — Not Found
- **Type:** Negative
- **Steps:** PATCH /api/doctors/000000000000000000000000/toggle-status
- **Expected:** 404 Not Found

## TC-DOC-09: Delete Doctor — Valid
- **Type:** Positive
- **Steps:** DELETE /api/doctors/:id
- **Expected:** 200 OK, `{ "message": "Doctor deleted successfully" }`

## TC-DOC-10: Delete Doctor — Not Found
- **Type:** Negative
- **Steps:** DELETE /api/doctors/000000000000000000000000
- **Expected:** 404 Not Found

## TC-DOC-11: UI — Toggle Button Changes Status
- **Type:** UI
- **Steps:** Click toggle button on an Active doctor
- **Expected:** Status badge changes from green Active to grey Inactive without page reload

## TC-DOC-12: UI — Form Validation (Empty Name)
- **Type:** UI
- **Steps:** Open Add Doctor modal, submit empty form
- **Expected:** "Doctor name is required" shown below Name field

## TC-DOC-13: UI — Search by Specialization
- **Type:** UI
- **Steps:** Type "Cardiologist" in search box
- **Expected:** Only doctors with that specialization are shown
