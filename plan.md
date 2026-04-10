# Plan — Health Management System

> Describes **how** the system is built.
> Covers technical architecture, tech stack, API definitions, database schemas,
> data models, and integration points.

---

## 1. Technical Architecture

```
┌─────────────────────────────────────────────────────┐
│                   Browser (Port 3000)                │
│              React + Vite + Tailwind CSS             │
│   Pages: Overview, Departments, Staff, Doctors,      │
│          Patients, Equipments, Settings, Login       │
└──────────────────────┬──────────────────────────────┘
                       │ HTTP (Axios)
                       │ Authorization: Bearer <JWT>
                       ▼
┌─────────────────────────────────────────────────────┐
│               Express API (Port 5000)                │
│   Routes: /api/auth, /departments, /staff,           │
│           /doctors, /patients, /equipments           │
│   Middleware: CORS, JSON, authMiddleware (JWT)       │
└──────────────────────┬──────────────────────────────┘
                       │ Mongoose ODM
                       ▼
┌─────────────────────────────────────────────────────┐
│            MongoDB (Port 27017)                      │
│   DB: health_management                              │
│   Collections: departments, staffs, doctors,         │
│                patients, equipments                  │
└─────────────────────────────────────────────────────┘
```

---

## 2. Tech Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| Frontend Framework | React | 18 | UI component system |
| Frontend Build | Vite | 5 | Dev server + bundler |
| CSS | Tailwind CSS | 3 | Utility-first styling |
| HTTP Client | Axios | 1.x | API calls from frontend |
| Routing (FE) | React Router | v6 | SPA navigation + protected routes |
| Backend Framework | Express.js | 4.x | REST API server |
| Database | MongoDB | 8.x | NoSQL document store |
| ODM | Mongoose | 7.x | Schema + query layer |
| Auth | JSON Web Token | 9.x | Stateless authentication |
| Config | dotenv | 16.x | Environment variable loading |
| Dev Server | nodemon | 3.x | Auto-restart on file change |

---

## 3. Project Structure

```
health-management-system/
├── constitution.md       # Governing principles
├── spec.md               # What to build
├── plan.md               # How to build it
├── tasks.md              # Actionable work items
├── specs/                # Per-module spec docs
│   ├── auth/
│   ├── departments/
│   ├── staff/
│   ├── doctors/
│   ├── patients/
│   └── equipments/
├── backend/
│   ├── .env              # PORT, MONGODB_URI, JWT_SECRET
│   ├── server.js         # Entry point
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── Department.js
│   │   ├── Staff.js
│   │   ├── Doctor.js
│   │   ├── Patient.js
│   │   └── Equipment.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── departments.js
│   │   ├── staff.js
│   │   ├── doctors.js
│   │   ├── patients.js
│   │   └── equipments.js
│   └── seed.js
└── frontend/
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── index.css
        ├── context/
        │   └── AuthContext.jsx
        ├── services/
        │   └── api.js
        ├── components/
        │   ├── Layout/
        │   │   ├── DashboardLayout.jsx
        │   │   ├── Header.jsx
        │   │   └── Sidebar.jsx
        │   └── common/
        │       ├── Modal.jsx
        │       ├── Pagination.jsx
        │       └── StatusBadge.jsx
        └── pages/
            ├── Login.jsx
            ├── Overview.jsx
            ├── Departments.jsx
            ├── Staff.jsx
            ├── Doctors.jsx
            ├── Patients.jsx
            ├── Equipments.jsx
            └── Settings.jsx
```

---

## 4. Database Schemas

### Department
```js
{
  name:        { type: String, required: true, unique: true },
  description: { type: String },
  timestamps:  true   // createdAt, updatedAt
}
```

### Staff
```js
{
  name:         { type: String, required: true },
  email:        { type: String, required: true },
  phone:        { type: String },
  role:         { type: String },
  departmentId: { type: ObjectId, ref: 'Department' },
  status:       { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  timestamps:   true
}
```

### Doctor
```js
{
  name:           { type: String, required: true },
  specialization: { type: String },
  phone:          { type: String },
  departmentId:   { type: ObjectId, ref: 'Department' },
  status:         { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  timestamps:     true
}
```

### Patient
```js
{
  name:            { type: String, required: true },
  age:             { type: Number, min: 0, max: 150 },
  gender:          { type: String, enum: ['Male', 'Female', 'Other'] },
  contact:         { type: String },
  admissionDate:   { type: Date },
  medicineDetails: { type: String },
  timestamps:      true
}
```

### Equipment
```js
{
  name:         { type: String, required: true },
  type:         { type: String },
  departmentId: { type: ObjectId, ref: 'Department' },
  status:       { type: String, enum: ['Available', 'In Use', 'Maintenance'], default: 'Available' },
  purchaseDate: { type: Date },
  timestamps:   true
}
```

---

## 5. API Definitions Summary

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/auth/login | No | Login, returns JWT |
| GET | /api/departments | Yes | List all departments |
| POST | /api/departments | Yes | Create department |
| PUT | /api/departments/:id | Yes | Update department |
| DELETE | /api/departments/:id | Yes | Delete department |
| GET | /api/staff | Yes | List all staff |
| POST | /api/staff | Yes | Create staff member |
| PUT | /api/staff/:id | Yes | Update staff member |
| DELETE | /api/staff/:id | Yes | Delete staff member |
| GET | /api/doctors | Yes | List all doctors |
| POST | /api/doctors | Yes | Create doctor |
| PUT | /api/doctors/:id | Yes | Update doctor |
| PATCH | /api/doctors/:id/toggle-status | Yes | Toggle Active/Inactive |
| DELETE | /api/doctors/:id | Yes | Delete doctor |
| GET | /api/patients | Yes | List patients (supports ?startDate&endDate) |
| POST | /api/patients | Yes | Create patient |
| PUT | /api/patients/:id | Yes | Update patient |
| DELETE | /api/patients/:id | Yes | Delete patient |
| GET | /api/equipments | Yes | List all equipment |
| POST | /api/equipments | Yes | Create equipment |
| PUT | /api/equipments/:id | Yes | Update equipment |
| DELETE | /api/equipments/:id | Yes | Delete equipment |

---

## 6. Auth Flow

```
1. User submits login form
   └─► POST /api/auth/login { username, password }

2. Server validates credentials against hardcoded ADMIN_CREDENTIALS
   ├─► Match:    jwt.sign({ username, role }, JWT_SECRET, { expiresIn: '24h' })
   │             Returns { token, user }
   └─► No match: 401 { message: "Invalid username or password" }

3. Frontend stores token in localStorage (key: hms_token)
   └─► AuthContext sets isAuthenticated = true, navigates to /dashboard

4. Every subsequent API call includes:
   └─► Authorization: Bearer <token>

5. authMiddleware.js verifies token on every protected route
   ├─► Valid:   req.user = decoded payload, calls next()
   └─► Invalid: 401 { message: "Invalid or expired token" }
```

---

## 7. Integration Points

| Point | From | To | Method |
|-------|------|----|--------|
| Login | AuthContext.jsx | POST /api/auth/login | axios.post (direct URL) |
| API calls | services/api.js | All /api/* routes | axios instance with interceptor |
| Token injection | AuthContext.jsx | localStorage `hms_token` | localStorage.setItem |
| Token reading | api.js interceptor | Request headers | req.headers.authorization |
| Department populate | Staff/Doctor/Equipment routes | Department collection | Mongoose .populate('departmentId', 'name') |
