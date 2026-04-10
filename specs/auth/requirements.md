# Auth — Requirements

## Functional Requirements

| ID | Requirement |
|----|-------------|
| AUTH-FR-01 | System shall allow login with username and password |
| AUTH-FR-02 | System shall return a JWT token on successful login |
| AUTH-FR-03 | Token shall expire after 24 hours |
| AUTH-FR-04 | System shall reject login with invalid credentials |
| AUTH-FR-05 | All protected routes shall require a valid Bearer token |
| AUTH-FR-06 | System shall return 401 if token is missing or expired |

## Non-Functional Requirements

| ID | Requirement |
|----|-------------|
| AUTH-NFR-01 | Login response time should be under 500ms |
| AUTH-NFR-02 | JWT secret shall be stored in environment variables, not hardcoded |
| AUTH-NFR-03 | Passwords shall not be returned in any API response |

## Credentials
| Field | Value |
|-------|-------|
| Username | `admin` |
| Password | `admin123` |
| Role | `admin` |
