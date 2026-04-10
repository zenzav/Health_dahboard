# Auth — API Contract

## POST /api/auth/login

### Request
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json
```

### Request Body
```json
{
  "username": "admin",
  "password": "admin123"
}
```

### Response — 200 OK
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "username": "admin",
    "role": "admin",
    "name": "System Administrator"
  }
}
```

### Response — 400 Bad Request (missing fields)
```json
{
  "message": "Username and password are required"
}
```

### Response — 401 Unauthorized (wrong credentials)
```json
{
  "message": "Invalid username or password"
}
```

### Response — 401 Unauthorized (no/invalid token on protected route)
```json
{
  "message": "No token provided, access denied"
}
```
