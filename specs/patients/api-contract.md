# Patients — API Contract

Base: `http://localhost:5000/api/patients`
Auth: `Authorization: Bearer <token>` (all endpoints)

---

## GET /api/patients

### Response — 200 OK
```json
[
  {
    "_id": "64f1a2b3c4d5e6f7a8b9c0d4",
    "name": "John Doe",
    "age": 35,
    "gender": "Male",
    "contact": "555-2001",
    "admissionDate": "2024-03-15T00:00:00.000Z",
    "medicineDetails": "Aspirin 75mg, Atorvastatin 20mg"
  }
]
```

---

## GET /api/patients?startDate=2024-01-01&endDate=2024-12-31

Filters patients by admission date range (inclusive).

### Query Params
| Param | Type | Description |
|-------|------|-------------|
| startDate | YYYY-MM-DD | Start of date range |
| endDate | YYYY-MM-DD | End of date range (includes full day) |

### Response — 200 OK — Filtered array of patients

---

## GET /api/patients/:id

### Response — 200 OK — Single patient object

### Response — 404 Not Found
```json
{ "message": "Patient not found" }
```

---

## POST /api/patients

### Request Body
```json
{
  "name": "John Doe",
  "age": 35,
  "gender": "Male",
  "contact": "555-2001",
  "admissionDate": "2024-03-15",
  "medicineDetails": "Aspirin 75mg, Atorvastatin 20mg"
}
```

### Response — 201 Created — New patient object

### Response — 400 Bad Request
```json
{ "message": "Patient name is required" }
```

---

## PUT /api/patients/:id

### Request Body — Any patient fields to update

### Response — 200 OK — Updated patient object

### Response — 404 Not Found
```json
{ "message": "Patient not found" }
```

---

## DELETE /api/patients/:id

### Response — 200 OK
```json
{ "message": "Patient deleted successfully" }
```

### Response — 404 Not Found
```json
{ "message": "Patient not found" }
```
