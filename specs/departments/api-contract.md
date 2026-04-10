# Departments — API Contract

Base: `http://localhost:5000/api/departments`
Auth: `Authorization: Bearer <token>` (all endpoints)

---

## GET /api/departments
Returns all departments sorted by newest first.

### Response — 200 OK
```json
[
  {
    "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
    "name": "Cardiology",
    "description": "Heart related treatments",
    "createdAt": "2024-01-15T08:00:00.000Z",
    "updatedAt": "2024-01-15T08:00:00.000Z"
  }
]
```

---

## GET /api/departments/:id

### Response — 200 OK
```json
{
  "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
  "name": "Cardiology",
  "description": "Heart related treatments",
  "createdAt": "2024-01-15T08:00:00.000Z"
}
```

### Response — 404 Not Found
```json
{ "message": "Department not found" }
```

---

## POST /api/departments

### Request Body
```json
{
  "name": "Cardiology",
  "description": "Heart related treatments"
}
```

### Response — 201 Created
```json
{
  "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
  "name": "Cardiology",
  "description": "Heart related treatments",
  "createdAt": "2024-01-15T08:00:00.000Z"
}
```

### Response — 400 Bad Request (missing name)
```json
{ "message": "Department name is required" }
```

### Response — 400 Bad Request (duplicate name)
```json
{ "message": "Department with this name already exists" }
```

---

## PUT /api/departments/:id

### Request Body
```json
{
  "name": "Cardiology Updated",
  "description": "Updated description"
}
```

### Response — 200 OK
```json
{
  "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
  "name": "Cardiology Updated",
  "description": "Updated description"
}
```

### Response — 404 Not Found
```json
{ "message": "Department not found" }
```

---

## DELETE /api/departments/:id

### Response — 200 OK
```json
{ "message": "Department deleted successfully" }
```

### Response — 404 Not Found
```json
{ "message": "Department not found" }
```
