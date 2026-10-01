<div align="center">

# 🏠 Accommodation Finder

### *Student-Oriented Accommodation & Housing Management Platform*

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.1-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-Express_v5-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose_v8-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![JWT](https://img.shields.io/badge/Auth-JWT_%2B_Bcrypt-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)

---

[![Frontend Deployment](https://img.shields.io/badge/Netlify-Frontend_Live-00C7B7?style=flat-square&logo=netlify&logoColor=white)](https://capstone-accommodationfinder.netlify.app/)
[![Backend Deployment](https://img.shields.io/badge/Render-Backend_Live-46E3B7?style=flat-square&logo=render&logoColor=white)](https://s63-ankit-capstone-accommodationfinder.onrender.com)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg?style=flat-square)](https://opensource.org/licenses/ISC)

> A modern full-stack web application designed to connect students with available room listings, manage flatmate preferences, and simplify housing discovery around university campuses.

</div>

---

## 📋 Table of Contents

- [1. Problem Statement](#1-problem-statement)
- [2. Project Purpose](#2-project-purpose)
- [3. Technology Stack](#3-technology-stack)
- [4. Project Architecture Overview](#4-project-architecture-overview)
- [5. Implemented Features](#5-implemented-features)
- [6. Frontend Setup](#6-frontend-setup)
- [7. Backend Setup](#7-backend-setup)
- [8. Database Setup](#8-database-setup)
- [9. Environment Variables](#9-environment-variables)
- [10. Installation Instructions](#10-installation-instructions)
- [11. How to Run Locally](#11-how-to-run-locally)
- [12. Available Scripts](#12-available-scripts)
- [13. API Overview](#13-api-overview)
- [14. Authentication Overview](#14-authentication-overview)
- [15. Deployment Information](#15-deployment-information)
- [16. Testing Instructions](#16-testing-instructions)
- [17. Known Limitations & Technical Debt](#17-known-limitations--technical-debt)

---

## 🎯 1. Problem Statement

Students and young professionals relocating for higher education face significant hurdles when searching for accommodations:
* **Hostel Deficit:** Institutional hostels frequently lack sufficient capacity for incoming student batches.
* **Fragmented Information:** Information regarding vacant rooms, pricing, and amenities is scattered across offline notice boards or unverified social groups.
* **Financial Burden:** Shared flats with unoccupied rooms lead to elevated rental expenses for existing tenants.

---

## 💡 2. Project Purpose

The **Accommodation Finder** platform serves as a dedicated solution for student housing by offering:
1. Structured user registration and authentication for verified student profiles.
2. Room listing management (CRUD operations) enabling room owners to publish listing details (location, price, room type).
3. Relational data associations between users and their listed properties.

---

## 🛠️ 3. Technology Stack

<div align="center">

| Layer | Technology / Package | Purpose |
| :--- | :--- | :--- |
| **Frontend** | React 19, Vite 6 | SPA Framework & Rapid Development Build Tool |
| **Styling** | Tailwind CSS v4, PostCSS, Radix UI | Modern utility-first responsive styling |
| **Backend** | Node.js, Express v5 | REST API Web Server |
| **Database** | MongoDB, Mongoose v8 | Document Database & Object Data Modeling (ODM) |
| **Security** | `jsonwebtoken`, `bcrypt` / `bcryptjs` | Password hashing & JWT token issuing |
| **Dev Tools** | `nodemon`, `dotenv`, ESLint, CORS | Environment handling, hot-reloading & linting |

</div>

---

## 🏗️ 4. Project Architecture Overview

The repository follows a clean monorepo architecture split into client and server folders:

```gss
S63_Ankit_Capstone_AccommodationFinder/
├── Backend/
│   ├── controllers/
│   │   ├── authController.js       # Authentication logic (Register / Login)
│   │   └── roomController.js       # Independent room controllers
│   ├── middleware/
│   │   └── authMiddleware.js       # JWT validation middleware
│   ├── models/
│   │   ├── Room.js                 # Mongoose schema for Room entity
│   │   └── User.js                 # Mongoose schema for User entity
│   ├── routes/
│   │   ├── authRoutes.js           # Auth endpoints (/api/auth)
│   │   ├── roomRoutes.js           # Room & User endpoints (/api)
│   │   └── userRoutes.js           # Auxiliary User endpoints (/api)
│   ├── package.json
│   └── server.js                   # Express entrypoint & Mongo connection
├── Frontend/
│   └── client/
│       ├── public/
│       ├── src/
│       │   ├── components/
│       │   │   ├── Footer.jsx      # Global footer component
│       │   │   ├── Navbar.jsx      # Top navigation header
│       │   │   └── RoomCard.jsx    # Room listing display card
│       │   ├── App.jsx             # Root React component
│       │   ├── main.jsx            # DOM render entrypoint
│       │   └── index.css           # Global stylesheet
│       ├── package.json
│       └── vite.config.js
└── README.md
```

---

## ✨ 5. Implemented Features

### ⚡ Backend REST API
- **User Authentication:** 
  - `POST /api/auth/register` with `bcrypt` password hashing.
  - `POST /api/auth/login` returning signed JWT bearer tokens.
- **Room Management (CRUD):**
  - `POST /api/rooms`: Create room listings and link to owner ObjectId.
  - `GET /api/rooms`: Retrieve all listings populated with owner details (`name`, `email`).
  - `PUT /api/rooms/:id`: Update existing room listing details.
  - `DELETE /api/rooms/:id`: Delete listing and remove references from owner profile.
- **Diagnostics & Utilities:** Middleware logger for HTTP requests and global 500 error handling.

### 🎨 Frontend UI Componentry
- **Navbar Header (`Navbar.jsx`):** Navigation header featuring application logo and menu links.
- **Room Display Card (`RoomCard.jsx`):** Styled card component displaying room title, description, and monthly rent.
- **Footer (`Footer.jsx`):** Standard copyright footer.

---

## ⚙️ 6. Frontend Setup

### Prerequisites
- Node.js (v18 or higher recommended)
- `npm` or `yarn` package manager

---

## ⚙️ 7. Backend Setup

### Prerequisites
- Node.js (v18 or higher)
- Active MongoDB Database (Local instance or MongoDB Atlas cluster)

---

## 🗄️ 8. Database Setup

The backend utilizes **MongoDB** managed through **Mongoose ORM schemas**.

### Entity Schema Specs

#### 👤 User Schema (`Backend/models/User.js`)
```typescript
{
  name:        { type: String, required: true },
  email:       { type: String, required: true, unique: true },
  password:    { type: String, required: true, minlength: 6 },
  roomsOwned:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Room' }],
  timestamps:  true
}
```

#### 🏠 Room Schema (`Backend/models/Room.js`)
```typescript
{
  roomType:   { type: String, required: true },
  price:      { type: Number, required: true },
  location:   { type: String, required: true },
  owner:      { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  timestamps: true
}
```

---

## 🔑 9. Environment Variables

Configure your environment settings by placing a `.env` file in the `Backend/` directory:

```env
# Server Listener Port
PORT=5001

# MongoDB Connection URL
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>?retryWrites=true&w=majority

# Secret key for signing JSON Web Tokens
JWT_SECRET=your_jwt_secret_key_here
```

> [!WARNING]
> Never commit actual `.env` files, passwords, or secret tokens into public source control repositories.

---

## 📦 10. Installation Instructions

1. **Clone Repository:**
   ```bash
   git clone https://github.com/kalviumcommunity/S63_Ankit_Capstone_AccommodationFinder.git
   cd S63_Ankit_Capstone_AccommodationFinder
   ```

2. **Install Backend Dependencies:**
   ```bash
   cd Backend
   npm install
   cd ..
   ```

3. **Install Frontend Dependencies:**
   ```bash
   cd Frontend/client
   npm install
   cd ../..
   ```

---

## 🚀 11. How to Run Locally

### Start Backend Service
```bash
cd Backend
npm run dev
```
*Server starts on `http://localhost:5001` and connects to MongoDB.*

### Start Frontend Client
```bash
cd Frontend/client
npm run dev
```
*Vite launches application on `http://localhost:5173`.*

---

## 📜 12. Available Scripts

| Location | Script | Command | Purpose |
| :--- | :--- | :--- | :--- |
| **Backend** | `npm run dev` | `nodemon server.js` | Launches backend with hot-reload |
| **Backend** | `npm start` | `node server.js` | Runs production server process |
| **Frontend** | `npm run dev` | `vite` | Launches Vite local dev server |
| **Frontend** | `npm run build` | `vite build` | Generates static production bundle in `dist/` |
| **Frontend** | `npm run lint` | `eslint .` | Runs static code analysis checks |

---

## 📡 13. API Overview

Base Endpoint: `http://localhost:5001`

### 🔑 Authentication Endpoints (`/api/auth`)

```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

### 🏠 Accommodation & User Endpoints (`/api`)

| Method | Route | Description | Payload Example |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/rooms` | Fetch all rooms with owner info | N/A |
| `POST` | `/api/rooms` | Create listing & associate user | `{"roomType": "1BHK", "price": 8000, "location": "Jagatpura", "userId": "<USER_ID>"}` |
| `PUT` | `/api/rooms/:id` | Update room listing by ID | `{"price": 8500}` |
| `DELETE` | `/api/rooms/:id` | Remove room listing by ID | N/A |
| `GET` | `/api/users` | Fetch all users with `roomsOwned` | N/A |
| `POST` | `/api/users` | Create user entry for testing | `{"name": "Jane", "email": "jane@example.com"}` |

---

## 🔐 14. Authentication Overview

- Passwords are securely hashed with **Bcrypt** (10 rounds) upon registration.
- Successful login issues a **JWT** payload `{ id: user._id }` valid for 1 day.
- Auth middleware (`authMiddleware.js`) provides a `verifyToken` function for checking `Authorization: Bearer <token>` headers.

> [!NOTE]
> `verifyToken` is defined in `middleware/authMiddleware.js`. It is available for application to protected routes.

---

## 🌐 15. Deployment Information

| Service | Host Provider | URL |
| :--- | :--- | :--- |
| **Backend API** | Render | [https://s63-ankit-capstone-accommodationfinder.onrender.com](https://s63-ankit-capstone-accommodationfinder.onrender.com) |
| **Frontend UI** | Netlify | [https://capstone-accommodationfinder.netlify.app/](https://capstone-accommodationfinder.netlify.app/) |

---

## 🧪 16. Testing Instructions

Manual testing can be performed using **cURL**, **Postman**, or **Bruno**.

### Example cURL Request (Register User):
```bash
curl -X POST http://localhost:5001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name": "Test User", "email": "test@example.com", "password": "password123"}'
```

---

## ⚠️ 17. Known Limitations & Technical Debt

1. **Client API Connectivity:** The React frontend currently renders local mock data (`dummyRoom` in `App.jsx`) and has not yet integrated live `fetch`/`axios` calls to backend endpoints.
2. **Empty Placeholders:** `Header.jsx` and `AccommodationList.jsx` are empty placeholder components.
3. **Route Protections:** `verifyToken` middleware is available but not attached to room mutation routes.
4. **Environment Secret Fallback:** JWT signing utilizes a default fallback string (`"your_jwt_secret"`) if `process.env.JWT_SECRET` is omitted.
5. **Redundant Handlers:** Both `userRoutes.js` and `roomRoutes.js` contain `POST /users` and `GET /users` route definitions.
