# Staff — Requirements

## Functional Requirements

| ID | Requirement |
|----|-------------|
| STAFF-FR-01 | System shall allow creating a staff member with name and email |
| STAFF-FR-02 | Name and email are required fields |
| STAFF-FR-03 | System shall allow assigning staff to a department |
| STAFF-FR-04 | System shall allow updating all staff fields |
| STAFF-FR-05 | System shall allow deleting a staff member by ID |
| STAFF-FR-06 | System shall return all staff with department name populated |
| STAFF-FR-07 | Staff list shall be searchable by name, email, and role |
| STAFF-FR-08 | Staff status can be Active or Inactive |

## Non-Functional Requirements

| ID | Requirement |
|----|-------------|
| STAFF-NFR-01 | All endpoints require JWT authentication |
| STAFF-NFR-02 | Department name shall be populated (not just ID) in responses |

## Data Schema

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| name | String | Yes | Full name |
| email | String | Yes | Email address |
| phone | String | No | Phone number |
| role | String | No | e.g. Nurse, Technician |
| departmentId | ObjectId | No | Ref to Department |
| status | String | No | Active (default) / Inactive |
