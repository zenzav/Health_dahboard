# Auth — Test Plan

## TC-AUTH-01: Successful Login
- **Type:** Positive
- **Steps:** POST /api/auth/login with `{ "username": "admin", "password": "admin123" }`
- **Expected:** 200 OK, response contains `token` and `user` object

## TC-AUTH-02: Wrong Password
- **Type:** Negative
- **Steps:** POST /api/auth/login with `{ "username": "admin", "password": "wrongpass" }`
- **Expected:** 401 Unauthorized, `{ "message": "Invalid username or password" }`

## TC-AUTH-03: Wrong Username
- **Type:** Negative
- **Steps:** POST /api/auth/login with `{ "username": "unknown", "password": "admin123" }`
- **Expected:** 401 Unauthorized

## TC-AUTH-04: Missing Username
- **Type:** Negative
- **Steps:** POST /api/auth/login with `{ "password": "admin123" }`
- **Expected:** 400 Bad Request, `{ "message": "Username and password are required" }`

## TC-AUTH-05: Missing Password
- **Type:** Negative
- **Steps:** POST /api/auth/login with `{ "username": "admin" }`
- **Expected:** 400 Bad Request

## TC-AUTH-06: Empty Body
- **Type:** Negative
- **Steps:** POST /api/auth/login with `{}`
- **Expected:** 400 Bad Request

## TC-AUTH-07: Access Protected Route Without Token
- **Type:** Negative
- **Steps:** GET /api/departments (no Authorization header)
- **Expected:** 401 Unauthorized, `{ "message": "No token provided, access denied" }`

## TC-AUTH-08: Access Protected Route With Expired/Invalid Token
- **Type:** Negative
- **Steps:** GET /api/departments with `Authorization: Bearer invalidtoken`
- **Expected:** 401 Unauthorized, `{ "message": "Invalid or expired token" }`

## TC-AUTH-09: Token Contains Correct User Info
- **Type:** Positive
- **Steps:** Decode the JWT token returned from login
- **Expected:** Payload contains `username: "admin"`, `role: "admin"`, valid `exp`
