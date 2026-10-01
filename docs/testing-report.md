# QA & Testing Assessment Report

**Project**: Accommodation Finder Capstone  
**Assessment Date**: October 1, 2026  
**Role**: QA Lead / Software Quality Engineer  

---

## 1. Testing Strategy

The QA evaluation of this repository follows a multi-tiered software testing strategy:

- **Static Analysis & Code Audit**: Line-by-line inspection of backend routes, controllers, middleware, Mongoose models, and frontend components.
- **Automated Test Suite Execution**: Verifying test scripts defined in `package.json` for both Backend and Frontend applications.
- **API Endpoint Mapping**: Cataloging all exposed HTTP endpoints, request payloads, response structures, and authorization constraints.
- **Validation & Boundary Analysis**: Checking input validation, required fields, Mongoose schema rules, and error handling.
- **Environment & Dependency Verification**: Assessing runtime prerequisites (Node.js, MongoDB connection, environment variables, installed packages).

---

## 2. Test Environment

| Environment Factor | Details / Status |
| :--- | :--- |
| **Operating System** | macOS |
| **Backend Runtime** | Node.js (`express@^5.1.0`, `mongoose@^8.13.2`) |
| **Frontend Runtime** | React 19 (`vite@^6.2.0`, `tailwindcss@^4.1.3`) |
| **Database Status** | **UNAVAILABLE** (No active local MongoDB daemon on standard port) |
| **Dependencies Installed** | **MISSING** (`node_modules` missing in Backend and `Frontend/client`) |
| **Environment Variables** | `MONGO_URI`, `PORT` defined in `.env` templates (live instance offline) |

---

## 3. Automated Tests Found

A repository search was conducted for test frameworks (Jest, Mocha, Vitest, Cypress, Playwright, Supertest):

- **Backend Automated Tests**: **0 Test Files Found**.
  - Test script in [`Backend/package.json`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Backend/package.json#L6): `"test": "echo \"Error: no test specified\" && exit 1"`
- **Frontend Automated Tests**: **0 Test Files Found**.
  - [`Frontend/client/package.json`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Frontend/client/package.json) contains no test scripts (only `dev`, `build`, `lint`, `preview`).

---

## 4. Tests Executed

| Command Executed | Directory | Exit Code | Result | Raw Output / Details |
| :--- | :--- | :---: | :---: | :--- |
| `npm test` | [`Backend`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Backend) | `1` | **FAIL** | `> backend@1.0.0 test`<br>`> echo "Error: no test specified" && exit 1`<br>`Error: no test specified` |
| `npm run lint` | [`Frontend/client`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Frontend/client) | `127` | **FAIL** | `sh: eslint: command not found`<br>Failed due to missing local `node_modules`. |

---

## 5. Test Results Summary Matrix

> [!IMPORTANT]
> In accordance with QA standards, tests are marked **BLOCKED** due to the absence of a live MongoDB instance and uninstalled dependencies, or **FAIL** where static analysis or command execution confirms failure. No tests are fabricated as PASS.

| Test ID | Test Category | Target / Component | Status | Failure / Blocked Rationale |
| :--- | :--- | :--- | :---: | :--- |
| **TEST-01** | Test Suite | Backend `npm test` | **FAIL** | Exit code 1; no test runner or test files configured. |
| **TEST-02** | Static Analysis | Frontend `npm run lint` | **FAIL** | Exit code 127; `eslint` binary missing (`node_modules` not installed). |
| **TEST-03** | Integration | `POST /api/auth/register` | **BLOCKED** | Database connection unavailable (`process.env.MONGO_URI` offline). |
| **TEST-04** | Integration | `POST /api/auth/login` | **BLOCKED** | Database connection unavailable (`process.env.MONGO_URI` offline). |
| **TEST-05** | API Validation | `POST /api/users` (`roomRoutes.js`) | **FAIL** | **Static Defect**: Payload lacks `password` field; triggers Mongoose `ValidationError`. |
| **TEST-06** | API Routing | `POST /api/users` (`userRoutes.js`) | **FAIL** | **Shadowed Route**: Unreachable due to route mounting order in [`server.js`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Backend/server.js#L29-L31). |
| **TEST-07** | Integration | `GET /api/users` | **BLOCKED** | Database connection unavailable. |
| **TEST-08** | Integration | `POST /api/rooms` | **BLOCKED** | Database connection unavailable. |
| **TEST-09** | Integration | `GET /api/rooms` | **BLOCKED** | Database connection unavailable. |
| **TEST-10** | Integration | `PUT /api/rooms/:id` | **BLOCKED** | Database connection unavailable. |
| **TEST-11** | Integration | `DELETE /api/rooms/:id` | **BLOCKED** | Database connection unavailable. |
| **TEST-12** | Security | Protected Room Routes | **FAIL** | `verifyToken` middleware is missing from room CRUD endpoints. |
| **TEST-13** | UI Integration | Frontend API Data Fetching | **NOT TESTED** | Frontend components use hardcoded static mock objects and do not call backend endpoints. |

---

## 6. API Endpoints Catalog & Assessment

| Method | Endpoint | File Source | Auth Required | Parameters / Body | QA Status | Notes / Findings |
| :--- | :--- | :--- | :---: | :--- | :---: | :--- |
| `POST` | `/api/auth/register` | [`authController.js`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Backend/controllers/authController.js#L5) | No | `{ name, email, password }` | **BLOCKED** | Hashes password with bcrypt (10 rounds). Checks duplicate email. |
| `POST` | `/api/auth/login` | [`authController.js`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Backend/controllers/authController.js#L23) | No | `{ email, password }` | **BLOCKED** | Generates JWT token. Hardcodes secret `"your_jwt_secret"`. |
| `POST` | `/api/rooms` | [`roomRoutes.js`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Backend/routes/roomRoutes.js#L29) | No | `{ roomType, price, location, userId }` | **BLOCKED** | Validates user existence, creates room, pushes ID to `User.roomsOwned`. |
| `GET` | `/api/rooms` | [`roomRoutes.js`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Backend/routes/roomRoutes.js#L49) | No | None | **BLOCKED** | Populates `owner` field (`name`, `email`). |
| `PUT` | `/api/rooms/:id` | [`roomRoutes.js`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Backend/routes/roomRoutes.js#L59) | No | Params: `id`<br>Body: Room fields | **BLOCKED** | Updates room document using `findByIdAndUpdate`. |
| `DELETE` | `/api/rooms/:id` | [`roomRoutes.js`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Backend/routes/roomRoutes.js#L76) | No | Params: `id` | **BLOCKED** | Deletes room and removes reference from `User.roomsOwned` via `$pull`. |
| `POST` | `/api/users` | [`roomRoutes.js`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Backend/routes/roomRoutes.js#L7) | No | `{ name, email }` | **FAIL** | Missing `password` field causes Mongoose validation error on execution. |
| `GET` | `/api/users` | [`roomRoutes.js`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Backend/routes/roomRoutes.js#L19) | No | None | **BLOCKED** | Fetches users and populates `roomsOwned`. |
| `GET` | `/` | [`server.js`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Backend/server.js#L42) | No | None | **BLOCKED** | Health check route returning server status message. |

---

## 7. Important User Flows

### Flow 1: User Registration & Authentication
1. Client submits registration payload (`name`, `email`, `password`) to `POST /api/auth/register`.
2. Backend validates email uniqueness, hashes password, saves `User`.
3. Client submits credentials to `POST /api/auth/login`.
4. Backend verifies bcrypt hash match, signs JWT, returns token and user payload.

### Flow 2: Room Creation & Ownership Binding
1. Client submits room details (`roomType`, `price`, `location`, `userId`) to `POST /api/rooms`.
2. Backend queries `User` by `userId`.
3. Backend creates and saves `Room` document setting `owner: userId`.
4. Backend pushes `savedRoom._id` into `user.roomsOwned` array and saves `User`.

### Flow 3: Room Catalog Browsing
1. Client sends request to `GET /api/rooms`.
2. Backend queries `rooms` collection and executes `.populate("owner", "name email")`.
3. Backend returns list of rooms with expanded owner details.

### Flow 4: Room Deletion & Reference Cleanup
1. Client sends request to `DELETE /api/rooms/:id`.
2. Backend finds and removes `Room` document by ID.
3. Backend issues `User.findByIdAndUpdate` with `$pull: { roomsOwned: room._id }` to clean up orphaned references.

---

## 8. Authentication Testing

> [!WARNING]
> Security Vulnerabilities Identified in Authentication Architecture:

1. **Unenforced Route Protection**:
   - `authMiddleware.js` ([`Backend/middleware/authMiddleware.js`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Backend/middleware/authMiddleware.js)) defines a `verifyToken` function.
   - However, **`verifyToken` is not imported or used anywhere** in `roomRoutes.js`, `userRoutes.js`, or `server.js`.
   - Result: Anyone can create (`POST`), edit (`PUT`), or delete (`DELETE`) rooms without an Authorization header or JWT token.
2. **Hardcoded JWT Secret**:
   - Both `authController.js` (line 33) and `authMiddleware.js` (line 9) use hardcoded string `"your_jwt_secret"`.
   - Result: Standard security vulnerability; tokens can be forged if code is publicly accessible.

---

## 9. Validation & Error Testing

| Target Component | Expected Validation | Current Behavior | Defect Classification |
| :--- | :--- | :--- | :--- |
| `POST /api/users` ([`roomRoutes.js`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Backend/routes/roomRoutes.js#L7)) | Accept complete user data including password. | Body destructuring only extracts `{ name, email }`. | **CRITICAL BUG**: Mongoose throws `ValidationError: Path 'password' is required.` |
| `Room.price` ([`Room.js`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Backend/models/Room.js#L8)) | Enforce `min: 0`. | No minimum value check. | **DATA INTEGRITY DEFECT**: Negative room prices can be persisted. |
| `Room.roomType` ([`Room.js`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Backend/models/Room.js#L4)) | Restrict to predefined enum options. | Accepts any string value. | **VALIDATION GAP**: Inconsistent data entry permitted. |
| `Invalid ObjectId` in URL params | Return `400 Bad Request` on malformed ID format. | Mongoose `CastError` caught by generic catch block returning `500 Server Error`. | **HANDLING DEFECT**: Improper HTTP status code returned for invalid client input. |

---

## 10. Known Failures

1. **`npm test` Execution Failure**: Running `npm test` fails immediately because no test framework or test script is configured in `package.json`.
2. **`npm run lint` Execution Failure**: Missing `node_modules` installation causes script failure (`eslint: command not found`).
3. **Route Shadowing Defect**: Handlers inside `userRoutes.js` are dead code because `server.js` mounts `roomRoutes` first on the `/api` prefix, taking precedence over identical route paths (`/users`).
4. **Orphaned Controller Defect**: [`Backend/controllers/roomController.js`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Backend/controllers/roomController.js) contains controller code (`createRoom`, `getAllRooms`) that is never invoked.
5. **Frontend API Disconnect**: Frontend components ([`App.jsx`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Frontend/client/src/App.jsx)) display static dummy data and have zero integration with backend endpoints. Empty files exist for `AccommodationList.jsx` and `Header.jsx`.

---

## 11. Known Untested Areas

- **Live Database Operations**: End-to-end CRUD persistence on MongoDB Atlas or local MongoDB service.
- **JWT Expiration & Verification**: Validating token expiration (`expiresIn: "1d"`) and invalid signature rejections under live traffic.
- **Concurrent Requests**: Behavior under parallel room creations or simultaneous user registrations.
- **Frontend UI Behavior**: Visual rendering, responsive design, user interactions, and browser compatibility.

---

## 12. Recommended Additional Tests

### Backend Unit & Integration Tests (Jest + Supertest)
1. **`auth.test.js`**:
   - Test user registration with valid credentials $\rightarrow$ expect `201 Created`.
   - Test registration with duplicate email $\rightarrow$ expect `400 Bad Request`.
   - Test login with incorrect password $\rightarrow$ expect `400 Bad Request`.
   - Test login with valid credentials $\rightarrow$ expect `200 OK` + JWT token string.
2. **`rooms.test.js`**:
   - Test room creation without JWT token $\rightarrow$ expect `401 Unauthorized` (after attaching `verifyToken` middleware).
   - Test room creation with valid `userId` $\rightarrow$ expect `201 Created` and check `User.roomsOwned` contains room ID.
   - Test room deletion $\rightarrow$ expect `200 OK` and verify `$pull` cleanup on `User.roomsOwned`.

### Frontend Component Tests (Vitest + React Testing Library)
1. **`RoomCard.test.jsx`**: Verify room title, rent, and description render correctly.
2. **`Navbar.test.jsx`**: Verify navigation header links and brand title render without crashing.

---

## 13. Manual Testing Checklist & Evidence Capture Guide

Use the following checklist to capture visual evidence (screenshots from Bruno / Postman / Browser) for QA compliance reporting:

### Bruno / Postman API Testing Checklist

- [ ] **Evidence #1: Health Check Endpoint**
  - **Request**: `GET http://localhost:5001/`
  - **Expected Status**: `200 OK`
  - **Expected Body**: `"🚀 Server is running and connected to MongoDB"`
  - **Screenshot**: Save as `evidence-01-healthcheck.png`

- [ ] **Evidence #2: User Registration Success**
  - **Request**: `POST http://localhost:5001/api/auth/register`
  - **Payload**: `{"name": "John Doe", "email": "john@example.com", "password": "securepassword123"}`
  - **Expected Status**: `201 Created`
  - **Expected Body**: `{"message": "User registered successfully"}`
  - **Screenshot**: Save as `evidence-02-register.png`

- [ ] **Evidence #3: User Login Success**
  - **Request**: `POST http://localhost:5001/api/auth/login`
  - **Payload**: `{"email": "john@example.com", "password": "securepassword123"}`
  - **Expected Status**: `200 OK`
  - **Expected Body**: `{ "token": "<JWT_STRING>", "user": { "id": "...", "name": "John Doe", "email": "john@example.com" } }`
  - **Screenshot**: Save as `evidence-03-login.png`

- [ ] **Evidence #4: Room Creation & User Binding**
  - **Request**: `POST http://localhost:5001/api/rooms`
  - **Payload**: `{"roomType": "1BHK Deluxe", "price": 12000, "location": "Jagatpura, Jaipur", "userId": "<VALID_USER_ID>"}`
  - **Expected Status**: `201 Created`
  - **Expected Body**: Saved room object with `owner` equal to `userId`.
  - **Screenshot**: Save as `evidence-04-create-room.png`

- [ ] **Evidence #5: Get All Rooms with Populated Owner**
  - **Request**: `GET http://localhost:5001/api/rooms`
  - **Expected Status**: `200 OK`
  - **Expected Body**: Array of rooms with `owner` expanded into `{ "_id": "...", "name": "John Doe", "email": "john@example.com" }`.
  - **Screenshot**: Save as `evidence-05-get-rooms-populated.png`

- [ ] **Evidence #6: Room Deletion & Cascading Clean-up**
  - **Request**: `DELETE http://localhost:5001/api/rooms/<ROOM_ID>`
  - **Expected Status**: `200 OK`
  - **Expected Body**: `{"message": "Room deleted successfully"}`
  - **Screenshot**: Save as `evidence-06-delete-room.png`

- [ ] **Evidence #7: Bug Demonstration - Mongoose Validation Error on POST /users**
  - **Request**: `POST http://localhost:5001/api/users`
  - **Payload**: `{"name": "Test User", "email": "test@example.com"}`
  - **Expected Status**: `500 Internal Server Error` (Mongoose validation fails due to missing password).
  - **Screenshot**: Save as `evidence-07-bug-post-users-validation.png`

### Browser UI Testing Checklist

- [ ] **Evidence #8: Frontend Home Page**
  - **URL**: `http://localhost:5173/` (Vite dev server)
  - **Action**: Load application landing page.
  - **Verify**: Navbar, RoomCard with dummy data, and Footer render without console errors.
  - **Screenshot**: Save as `evidence-08-frontend-home.png`
