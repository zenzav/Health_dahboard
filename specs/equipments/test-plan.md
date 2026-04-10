# Equipments — Test Plan

## TC-EQ-01: Get All Equipments
- **Type:** Positive
- **Steps:** GET /api/equipments with valid token
- **Expected:** 200 OK, array with departmentId populated

## TC-EQ-02: Create Equipment — Valid
- **Type:** Positive
- **Steps:** POST /api/equipments with all fields
- **Expected:** 201 Created, new equipment object with populated department

## TC-EQ-03: Create Equipment — Name Only
- **Type:** Positive
- **Steps:** POST /api/equipments with `{ "name": "Blood Pressure Monitor" }`
- **Expected:** 201 Created, status defaults to "Available"

## TC-EQ-04: Create Equipment — Missing Name
- **Type:** Negative
- **Steps:** POST /api/equipments with `{ "type": "Diagnostic" }`
- **Expected:** 400 Bad Request, `{ "message": "Equipment name is required" }`

## TC-EQ-05: Create Equipment — Status "In Use"
- **Type:** Positive
- **Steps:** POST /api/equipments with `{ "name": "X-Ray", "status": "In Use" }`
- **Expected:** 201 Created, status is "In Use"

## TC-EQ-06: Create Equipment — Status "Maintenance"
- **Type:** Positive
- **Steps:** POST /api/equipments with `{ "name": "CT Scanner", "status": "Maintenance" }`
- **Expected:** 201 Created, status is "Maintenance"

## TC-EQ-07: Update Equipment Status
- **Type:** Positive
- **Steps:** PUT /api/equipments/:id with `{ "status": "Maintenance" }`
- **Expected:** 200 OK, status updated

## TC-EQ-08: Update Equipment — Not Found
- **Type:** Negative
- **Steps:** PUT /api/equipments/000000000000000000000000
- **Expected:** 404 Not Found

## TC-EQ-09: Delete Equipment — Valid
- **Type:** Positive
- **Steps:** DELETE /api/equipments/:id
- **Expected:** 200 OK, `{ "message": "Equipment deleted successfully" }`

## TC-EQ-10: Delete Equipment — Not Found
- **Type:** Negative
- **Steps:** DELETE /api/equipments/000000000000000000000000
- **Expected:** 404 Not Found

## TC-EQ-11: UI — Form Validation (Empty Name)
- **Type:** UI
- **Steps:** Open Add Equipment modal, submit empty form
- **Expected:** "Equipment name is required" shown below Name field

## TC-EQ-12: UI — Status Dropdown Options
- **Type:** UI
- **Steps:** Open Add Equipment modal, check Status dropdown
- **Expected:** Options are Available, In Use, Maintenance

## TC-EQ-13: UI — Search by Type
- **Type:** UI
- **Steps:** Type "Imaging" in search box
- **Expected:** Only equipment with type "Imaging" is shown

## TC-EQ-14: UI — Status Badge Colors
- **Type:** UI
- **Steps:** View equipment list with different statuses
- **Expected:** Available = green, In Use = blue/yellow, Maintenance = orange/red
