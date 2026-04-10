# Patients — Requirements

## Functional Requirements

| ID | Requirement |
|----|-------------|
| PAT-FR-01 | System shall allow creating a patient with a name |
| PAT-FR-02 | Patient name is a required field |
| PAT-FR-03 | System shall allow recording age, gender, contact, admission date, and medicine details |
| PAT-FR-04 | System shall allow updating all patient fields |
| PAT-FR-05 | System shall allow deleting a patient by ID |
| PAT-FR-06 | System shall return all patients sorted by admission date (newest first) |
| PAT-FR-07 | System shall support filtering patients by admission date range |
| PAT-FR-08 | Patient list shall be searchable by name and contact number |

## Non-Functional Requirements

| ID | Requirement |
|----|-------------|
| PAT-NFR-01 | All endpoints require JWT authentication |
| PAT-NFR-02 | Date filter uses query params: `?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD` |

## Data Schema

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| name | String | Yes | Patient full name |
| age | Number | No | 0–150 |
| gender | String | No | Male / Female / Other |
| contact | String | No | Phone number |
| admissionDate | Date | No | ISO date string |
| medicineDetails | String | No | Prescribed medicines |
