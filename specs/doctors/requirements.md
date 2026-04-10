# Doctors — Requirements

## Functional Requirements

| ID | Requirement |
|----|-------------|
| DOC-FR-01 | System shall allow creating a doctor with a name |
| DOC-FR-02 | Doctor name is a required field |
| DOC-FR-03 | System shall allow assigning a doctor to a department |
| DOC-FR-04 | System shall allow toggling doctor status between Active and Inactive |
| DOC-FR-05 | System shall allow updating all doctor fields |
| DOC-FR-06 | System shall allow deleting a doctor by ID |
| DOC-FR-07 | System shall return all doctors with department name populated |
| DOC-FR-08 | Doctor list shall be searchable by name and specialization |

## Non-Functional Requirements

| ID | Requirement |
|----|-------------|
| DOC-NFR-01 | All endpoints require JWT authentication |
| DOC-NFR-02 | Toggle status endpoint uses PATCH method |

## Data Schema

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| name | String | Yes | Doctor full name |
| specialization | String | No | e.g. Cardiologist |
| phone | String | No | Contact number |
| departmentId | ObjectId | No | Ref to Department |
| status | String | No | Active (default) / Inactive |
