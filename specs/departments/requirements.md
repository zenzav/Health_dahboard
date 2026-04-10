# Departments — Requirements

## Functional Requirements

| ID | Requirement |
|----|-------------|
| DEPT-FR-01 | System shall allow creating a new department with a name |
| DEPT-FR-02 | Department name shall be unique (case-insensitive) |
| DEPT-FR-03 | System shall allow updating department name and description |
| DEPT-FR-04 | System shall allow deleting a department by ID |
| DEPT-FR-05 | System shall return a list of all departments sorted by creation date (newest first) |
| DEPT-FR-06 | System shall return a single department by ID |
| DEPT-FR-07 | Department name is a required field |
| DEPT-FR-08 | Description is optional |

## Non-Functional Requirements

| ID | Requirement |
|----|-------------|
| DEPT-NFR-01 | All department endpoints shall require JWT authentication |
| DEPT-NFR-02 | API shall return appropriate HTTP status codes |

## Data Schema

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| name | String | Yes | Unique, case-insensitive |
| description | String | No | Optional text |
| createdAt | Date | Auto | Set by MongoDB timestamps |
| updatedAt | Date | Auto | Set by MongoDB timestamps |
