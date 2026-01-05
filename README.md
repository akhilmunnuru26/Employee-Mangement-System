#  Employee Management System

A modern **Employee Management Dashboard** built using **React (Vite)** and **Tailwind CSS**, featuring authentication, employee CRUD operations, search, pagination, and a clean, scalable architecture.

---

##  Features

- **Authentication (Mock Login)**
  - Login with predefined admin credentials
  - Protected routes using `ProtectedRoute`

- **Dashboard**
  - Employee summary (Total / Active / Inactive)
  - Employee table with actions

- **Employee Management**
    - View employees
    - Create new employee
    - Edit existing employee
    - Delete employee (client-side)
    - Toggle Active / Inactive status
  - Print employee details

- **Search & Pagination**
  - Search employees by name
  - Client-side pagination

- **Modern UI**
  - Tailwind CSS
  - Responsive layout
  - Tooltips & icons

---

##  Architecture Overview
```text
src/
│
├── api/
│   └── employeeApi.js        # API abstraction layer
│
├── components/
│   ├── common/
│   │   └── Modal.jsx         # Reusable modal component
│   │
│   └── employees/
│       ├── EmployeeTable.jsx
│       ├── EmployeeRow.jsx
│       ├── EmployeeSummary.jsx
│       └── EmployeeModal.jsx # Create/Edit modal
│
├── context/
│   ├── AuthContext.js
│   ├── AuthProvider.jsx
│   └── useAuth.js
│
│   ├── EmployeeContext.js
│   ├── EmployeeProvider.jsx
│   └── useEmployees.js
│
├── pages/
│   ├── Login.jsx
│   └── Dashboard.jsx
│
├── routes/
│   └── ProtectedRoute.jsx
│
├── utils/
│   └── validators.js
│
├── App.jsx
├── main.jsx
└── index.css


---






##  Data Flow

### Authentication Flow

1. User logs in using mock credentials
2. `AuthProvider` stores user data in React state + `localStorage`
3. `ProtectedRoute` validates authentication
4. Unauthorized users are redirected to `/`

---

### Employee Data Flow

1. `EmployeeProvider` fetches data from API
2. API response is **normalized** before storing in Context
3. Components consume data via `useEmployees`
4. Create / Edit / Delete update **client-side state**
5. UI updates instantly without backend dependency

> Since the API is non-persistent, CRUD operations are handled optimistically on the client.

---

##  API Used

### JSONPlaceholder (Mock API)
GET https://jsonplaceholder.typicode.com/users
- Used for fetching employee list
- Create / Update / Delete simulated on client
- Stable and rate-limit free

---

##  Tech Stack

| Category | Technology |
|--------|------------|
| Frontend | React (Vite) |
| Styling | Tailwind CSS |
| Routing | React Router DOM |
| State Management | React Context API |
| HTTP Client | Axios |
| Icons | React Icons |
| Build Tool | Vite |

---

##  Installation & Setup

### 1.Clone the repository

```bash
git clone <your-repository-url>
cd employee-management-system

## **2.Install dependencies**
 - npm install

##  **3.Run the application**
 -  npm run dev

##  **4.Open in browser**
-   http://localhost:5173

##  **5.Login Credentials**
   - **Email**:     admin@test.com
     **Password** : admin@123

## Key Design Decisions

  Used Context API instead of Redux for simplicity
  Centralized business logic inside Providers
  Avoided unnecessary useEffect to prevent cascading renders
  Implemented reusable modal for Create/Edit flows
  Implemented optimistic UI updates for CRUD

## Future Enhancements

  Persist employees in localStorage (Code is Written and it is commented uncomment it if needed)
  Backend integration (Node.js / Firebase)
  Role-based access control
  Toast notifications
  Server-side pagination

##  Author

Akhil Munnuru
Frontend / Full Stack Developer
React • JavaScript • Modern UI



