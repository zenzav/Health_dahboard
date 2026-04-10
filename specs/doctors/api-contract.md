# Doctors — API Contract

Base: `http://localhost:5000/api/doctors`
Auth: `Authorization: Bearer <token>` (all endpoints)

---

## GET /api/doctors

### Response — 200 OK
```json
[
  {
    "_id": "64f1a2b3c4d5e6f7a8b9c0d3",
    "name": "Dr. John Smith",
    "specialization": "Cardiologist",
    "phone": "555-1001",
    "departmentId": { "_id": "...", "name": "Cardiology" },
    "status": "Active"
  }
]
```

---

## GET /api/doctors/:id

### Response — 200 OK — Single doctor object

### Response — 404 Not Found
```json
{ "message": "Doctor not found" }
```

---

## POST /api/doctors

### Request Body
```json
{
  "name": "Dr. John Smith",
  "specialization": "Cardiologist",
  "phone": "555-1001",
  "departmentId": "64f1a2b3c4d5e6f7a8b9c0d1",
  "status": "Active"
}
```

### Response — 201 Created — New doctor object with populated department

### Response — 400 Bad Request
```json
{ "message": "Doctor name is required" }
```

---

## PUT /api/doctors/:id

### Request Body
```json
{
  "name": "Dr. John Smith",
  "specialization": "Senior Cardiologist",
  "phone": "555-1001",
  "departmentId": "64f1a2b3c4d5e6f7a8b9c0d1",
  "status": "Active"
}
```

### Response — 200 OK — Updated doctor object

### Response — 404 Not Found
```json
{ "message": "Doctor not found" }
```

---

## PATCH /api/doctors/:id/toggle-status

No request body required.

### Response — 200 OK (toggled to Inactive)
```json
{
  "_id": "64f1a2b3c4d5e6f7a8b9c0d3",
  "name": "Dr. John Smith",
  "status": "Inactive",
  "departmentId": { "_id": "...", "name": "Cardiology" }
}
```

### Response — 404 Not Found
```json
{ "message": "Doctor not found" }
```

---

## DELETE /api/doctors/:id

### Response — 200 OK
```json
{ "message": "Doctor deleted successfully" }
```

### Response — 404 Not Found
```json
{ "message": "Doctor not found" }
```
