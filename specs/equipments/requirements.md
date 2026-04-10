# Equipments — Requirements

## Functional Requirements

| ID | Requirement |
|----|-------------|
| EQ-FR-01 | System shall allow creating equipment with a name |
| EQ-FR-02 | Equipment name is a required field |
| EQ-FR-03 | System shall allow assigning equipment to a department |
| EQ-FR-04 | Equipment status can be Available, In Use, or Maintenance |
| EQ-FR-05 | System shall allow updating all equipment fields |
| EQ-FR-06 | System shall allow deleting equipment by ID |
| EQ-FR-07 | System shall return all equipment with department name populated |
| EQ-FR-08 | Equipment list shall be searchable by name and type |

## Non-Functional Requirements

| ID | Requirement |
|----|-------------|
| EQ-NFR-01 | All endpoints require JWT authentication |
| EQ-NFR-02 | Department name shall be populated in responses |

## Data Schema

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| name | String | Yes | Equipment name |
| type | String | No | e.g. Imaging, Diagnostic |
| departmentId | ObjectId | No | Ref to Department |
| status | String | No | Available (default) / In Use / Maintenance |
| purchaseDate | Date | No | ISO date string |
