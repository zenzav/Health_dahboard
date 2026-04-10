# Equipments — API Contract

Base: `http://localhost:5000/api/equipments`
Auth: `Authorization: Bearer <token>` (all endpoints)

---

## GET /api/equipments

### Response — 200 OK
```json
[
  {
    "_id": "64f1a2b3c4d5e6f7a8b9c0d5",
    "name": "MRI Scanner",
    "type": "Imaging",
    "departmentId": { "_id": "...", "name": "Radiology" },
    "status": "Available",
    "purchaseDate": "2023-06-01T00:00:00.000Z"
  }
]
```

---

## GET /api/equipments/:id

### Response — 200 OK — Single equipment object

### Response — 404 Not Found
```json
{ "message": "Equipment not found" }
```

---

## POST /api/equipments

### Request Body
```json
{
  "name": "MRI Scanner",
  "type": "Imaging",
  "departmentId": "64f1a2b3c4d5e6f7a8b9c0d1",
  "status": "Available",
  "purchaseDate": "2023-06-01"
}
```

### Response — 201 Created — New equipment object with populated department

### Response — 400 Bad Request
```json
{ "message": "Equipment name is required" }
```

---

## PUT /api/equipments/:id

### Request Body
```json
{
  "name": "MRI Scanner",
  "type": "Imaging",
  "departmentId": "64f1a2b3c4d5e6f7a8b9c0d1",
  "status": "Maintenance",
  "purchaseDate": "2023-06-01"
}
```

### Response — 200 OK — Updated equipment object

### Response — 404 Not Found
```json
{ "message": "Equipment not found" }
```

---

## DELETE /api/equipments/:id

### Response — 200 OK
```json
{ "message": "Equipment deleted successfully" }
```

### Response — 404 Not Found
```json
{ "message": "Equipment not found" }
```
