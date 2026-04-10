# Staff — API Contract

Base: `http://localhost:5000/api/staff`
Auth: `Authorization: Bearer <token>` (all endpoints)

---

## GET /api/staff

### Response — 200 OK
```json
[
  {
    "_id": "64f1a2b3c4d5e6f7a8b9c0d2",
    "name": "Alice Thompson",
    "email": "alice.t@hospital.com",
    "phone": "555-0201",
    "role": "Nurse",
    "departmentId": {
      "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
      "name": "Cardiology"
    },
    "status": "Active"
  }
]
```

---

## GET /api/staff/:id

### Response — 200 OK
```json
{
  "_id": "64f1a2b3c4d5e6f7a8b9c0d2",
  "name": "Alice Thompson",
  "email": "alice.t@hospital.com",
  "phone": "555-0201",
  "role": "Nurse",
  "departmentId": { "_id": "...", "name": "Cardiology" },
  "status": "Active"
}
```

### Response — 404 Not Found
```json
{ "message": "Staff member not found" }
```

---

## POST /api/staff

### Request Body
```json
{
  "name": "Alice Thompson",
  "email": "alice.t@hospital.com",
  "phone": "555-0201",
  "role": "Nurse",
  "departmentId": "64f1a2b3c4d5e6f7a8b9c0d1",
  "status": "Active"
}
```

### Response — 201 Created
```json
{
  "_id": "64f1a2b3c4d5e6f7a8b9c0d2",
  "name": "Alice Thompson",
  "email": "alice.t@hospital.com",
  "departmentId": { "_id": "...", "name": "Cardiology" },
  "status": "Active"
}
```

### Response — 400 Bad Request
```json
{ "message": "Name and email are required" }
```

---

## PUT /api/staff/:id

### Request Body
```json
{
  "name": "Alice Thompson",
  "email": "alice.t@hospital.com",
  "phone": "555-0201",
  "role": "Senior Nurse",
  "departmentId": "64f1a2b3c4d5e6f7a8b9c0d1",
  "status": "Active"
}
```

### Response — 200 OK — Updated staff object

### Response — 404 Not Found
```json
{ "message": "Staff member not found" }
```

---

## DELETE /api/staff/:id

### Response — 200 OK
```json
{ "message": "Staff member deleted successfully" }
```

### Response — 404 Not Found
```json
{ "message": "Staff member not found" }
```
