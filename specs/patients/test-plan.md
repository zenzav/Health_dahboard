# Patients — Test Plan

## TC-PAT-01: Get All Patients
- **Type:** Positive
- **Steps:** GET /api/patients with valid token
- **Expected:** 200 OK, array of patient objects sorted by admissionDate descending

## TC-PAT-02: Get Patients with Date Filter
- **Type:** Positive
- **Steps:** GET /api/patients?startDate=2024-01-01&endDate=2024-06-30
- **Expected:** 200 OK, only patients admitted within that range

## TC-PAT-03: Get Patients — Only Start Date
- **Type:** Positive
- **Steps:** GET /api/patients?startDate=2024-03-01
- **Expected:** 200 OK, patients admitted from March 1 onwards

## TC-PAT-04: Get Patients — Only End Date
- **Type:** Positive
- **Steps:** GET /api/patients?endDate=2024-03-31
- **Expected:** 200 OK, patients admitted up to March 31

## TC-PAT-05: Create Patient — Valid
- **Type:** Positive
- **Steps:** POST /api/patients with all fields
- **Expected:** 201 Created, new patient object

## TC-PAT-06: Create Patient — Name Only
- **Type:** Positive
- **Steps:** POST /api/patients with `{ "name": "Test Patient" }` only
- **Expected:** 201 Created, other fields are null/undefined

## TC-PAT-07: Create Patient — Missing Name
- **Type:** Negative
- **Steps:** POST /api/patients with `{ "age": 30, "gender": "Male" }`
- **Expected:** 400 Bad Request, `{ "message": "Patient name is required" }`

## TC-PAT-08: Update Patient — Valid
- **Type:** Positive
- **Steps:** PUT /api/patients/:id with updated medicine details
- **Expected:** 200 OK, updated patient object

## TC-PAT-09: Update Patient — Not Found
- **Type:** Negative
- **Steps:** PUT /api/patients/000000000000000000000000
- **Expected:** 404 Not Found

## TC-PAT-10: Delete Patient — Valid
- **Type:** Positive
- **Steps:** DELETE /api/patients/:id
- **Expected:** 200 OK, `{ "message": "Patient deleted successfully" }`

## TC-PAT-11: Delete Patient — Not Found
- **Type:** Negative
- **Steps:** DELETE /api/patients/000000000000000000000000
- **Expected:** 404 Not Found

## TC-PAT-12: UI — Form Validation (Empty Name)
- **Type:** UI
- **Steps:** Open Add Patient modal, submit empty form
- **Expected:** "Patient name is required" shown below Name field

## TC-PAT-13: UI — Date Range Filter
- **Type:** UI
- **Steps:** Set start and end date on Patients page, click Apply
- **Expected:** Table updates to show only patients admitted in that range

## TC-PAT-14: UI — Clear Date Filter
- **Type:** UI
- **Steps:** Apply date filter, then click Clear (X button)
- **Expected:** All patients shown again, date inputs reset

## TC-PAT-15: UI — Search by Contact Number
- **Type:** UI
- **Steps:** Type a phone number in search box
- **Expected:** Table filters to matching patient
