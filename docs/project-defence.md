# Project Defence & Viva Preparation Guide

**Project Title:** Accommodation Finder (Student PG & Flat Rental Platform)  
**Author:** Ankit Manghnani  
**Target Audience:** Final Evaluation Panel, Viva Examiners, Technical Interviewers  

---

## 🎙️ Part 1: The 5–7 Minute Walkthrough Script

*This script is written in a natural, confident first-person spoken tone. Practice reading this aloud at a steady pace (approx. 130 words per minute).*

---

### [0:00 – 0:45] 1. Introduction & Problem Statement
> "Good morning, respected panel members. My capstone project is **Accommodation Finder**, a full-stack web platform designed to solve the fragmented and stressful housing search process for university students and young working professionals. 
>
> Moving to a new college town often forces students to navigate informal broker cartels, unverified WhatsApp listings, and hidden commission fees. Accommodation Finder provides a centralized portal where students can discover verified student accommodations, browse transparent pricing, filter by location, and contact property hosts directly without predatory broker markups."

---

### [0:45 – 1:30] 2. Technology Stack Selection
> "To build this platform, I selected the **MERN-adjacent stack**:
> - On the frontend, I chose **React 19 with Vite 6 and Tailwind CSS v4**. Vite offers near-instant Hot Module Replacement during development and produces lean static bundles for fast First Contentful Paint.
> - On the backend, I built a RESTful service using **Node.js with Express v5**. Node's non-blocking, event-driven I/O model is ideal for I/O-bound web APIs where numerous concurrent users query room listings.
> - For persistence, I used **MongoDB Atlas with Mongoose 8**. Rental listings are semi-structured documents with varied amenities, flexible photo arrays, and address attributes. A document database gave us schema flexibility without requiring costly table migrations during early product iteration."

---

### [1:30 – 2:30] 3. High-Level & Component Architecture
> "The application follows a **decoupled client-server architecture**:
> - The **Frontend Client** is structured as an atomic Single Page Application. It separates UI concerns into a modular component hierarchy—featuring a responsive navigation header, listing grid cards, and footer layouts.
> - The **Backend API** follows the **Controller-Route-Model pattern**:
>   - Incoming requests hit [`Backend/server.js`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Backend/server.js), passing through CORS and JSON body-parsing middleware.
>   - Dedicated route handlers in [`Backend/routes/`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Backend/routes/) dispatch requests to specialized business logic controllers in [`Backend/controllers/`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Backend/controllers/).
>   - Controllers execute queries through Mongoose models in [`Backend/models/`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Backend/models/) and return structured JSON responses with appropriate HTTP status codes."

---

### [2:30 – 3:30] 4. API & Database Design
> "The backend exposes clean REST endpoints:
> - Authentication is handled via `/api/auth/register` and `/api/auth/login`.
> - Room inventory is managed through `/api/rooms` supporting `GET` to fetch all listings, `POST` to publish a new room, and `DELETE /api/rooms/:id` to remove a listing.
>
> In the database, we have two primary collections:
> - The **Users** collection stores user identity with unique email constraints and salt-hashed passwords.
> - The **Rooms** collection stores listing details—including `title`, `description`, `rent`, `location`, `contact`, and creation timestamps.
> - We also prototyped a **Subscription** schema to support future monetization models for premium landlord listings."

---

### [3:30 – 4:30] 5. Authentication & Security Implementation
> "For user security, we implemented token-based authentication using **JSON Web Tokens (JWT)** and **bcryptjs**:
> - When a user registers, their raw password is never stored in plaintext. It is hashed using bcrypt with an automated salt generation factor of 10 rounds.
> - Upon login, the controller verifies the bcrypt hash. If valid, it signs a stateless JWT containing the user ID and role, signed with an HMAC-SHA256 secret.
> - We authored an authentication middleware [`Backend/middleware/authMiddleware.js`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Backend/middleware/authMiddleware.js) that validates the Bearer token in the `Authorization` header and decodes the user payload."

---

### [4:30 – 5:30] 6. Deployment Strategy & Testing Reality
> "For deployment, the project was migrated to **Vercel** utilizing **Vercel Services**:
> - A unified [`vercel.json`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/vercel.json) orchestrates both the Vite frontend and Express backend under a single unified domain.
> - Requests to `/api/*` are routed to the Express service, while all web requests route to the Vite frontend, eliminating cross-origin CORS complications in production.
>
> In terms of verification, I conducted comprehensive manual smoke tests and endpoint audits. Automated test suites using Jest or Supertest are currently queued for our next testing sprint."

---

### [5:30 – 6:30] 7. Current Limitations & Future Roadmap
> "To be transparent with the panel regarding current implementation maturity:
> - Currently, the frontend UI displays a static room demonstration while the live backend API endpoints are verified via Postman and cURL. Connecting the React frontend to fetch live data from `/api/rooms` is the immediate next step.
> - Secondly, while the `verifyToken` middleware is implemented, it needs to be attached directly to the `POST` and `DELETE /api/rooms` routes so that only authenticated landlords can mutate listings.
> - In our next release, we plan to implement full-text search by university radius, image uploads via Cloudinary, and student booking requests.
>
> Thank you, and I look forward to your questions."

---

## 💡 Part 2: Technical Defence Q&A (18 Core Questions)

Each question below is evaluated against the **actual repository code**. Every answer includes the verified status:
- `[IMPLEMENTED]` — fully verified in active code.
- `[PARTIALLY IMPLEMENTED]` — logic exists in code but is incomplete or disconnected.
- `[NOT IMPLEMENTED]` — not in codebase (must be stated honestly).

---

### Q1: Why did you choose this architecture?
**Status:** `[IMPLEMENTED]`  
**Answer:**  
"I chose a **decoupled client-server REST architecture** over a monolithic Server-Side Rendered (SSR) pattern (like traditional EJS or Blade). 
1. **Separation of Concerns:** The frontend team can focus purely on UI/UX and client-side responsiveness in React, while the backend team builds stateless REST APIs that adhere to JSON standards.
2. **Multi-client Reusability:** Because the backend exposes REST endpoints (`/api/rooms`, `/api/auth`), the exact same backend service can later power a Flutter or React Native mobile app without changing a single line of backend logic.
3. **Independent Deployment:** The frontend compiles into static HTML/CSS/JS that can be distributed across global CDNs, while the backend scales independently as serverless compute."

---

### Q2: Why React for the frontend?
**Status:** `[IMPLEMENTED]`  
**Answer:**  
"React was selected for three technical reasons:
1. **Component Reusability:** Accommodation cards, navigation bars, and search inputs are highly reusable components. For instance, [`Frontend/client/src/components/RoomCard.jsx`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Frontend/client/src/components/RoomCard.jsx) can be reused across search listings, favorites, and landlord dashboards.
2. **Virtual DOM & Re-rendering Performance:** Real-estate portals involve frequent dynamic filtering (by price range, room type, or location). React's Virtual DOM reconciliation only updates altered listing cards rather than repainting the entire page DOM.
3. **Ecosystem & Modern Tooling:** Pairing React 19 with Vite 6 enables instant ES module bundling and fast developer turnaround times."

---

### Q3: Why Node.js and Express for the backend?
**Status:** `[IMPLEMENTED]`  
**Answer:**  
"Node.js with Express v5 was chosen because:
1. **Asynchronous Non-Blocking I/O:** The Accommodation Finder API is predominantly I/O-bound—fetching rooms from MongoDB, reading auth headers, and sending JSON responses. Node's single-threaded event loop handles high numbers of concurrent read requests without thread-locking overhead.
2. **JavaScript Unification:** Using JavaScript across the entire stack (Node/Express backend and React frontend) reduces context switching and allows shared data models and validation logic.
3. **Minimalist Middleware Pipeline:** Express allows us to construct an explicit request pipeline: CORS $\rightarrow$ JSON parsing $\rightarrow$ Request Logging $\rightarrow$ Route Dispatching $\rightarrow$ Error Handling, as seen in [`Backend/server.js`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Backend/server.js#L10-L21)."

---

### Q4: Why MongoDB over MySQL?
**Status:** `[IMPLEMENTED]`  
**Answer:**  
"While relational databases like MySQL excel at strictly structured transactional records, MongoDB was chosen for specific architectural trade-offs:
1. **Polymorphic Property Schema:** Accommodation listings are naturally heterogeneous. A 1BHK apartment has different attributes (e.g., parking, modular kitchen) than a student PG (e.g., meal plan, sharing occupancy, curfew rules). MongoDB's flexible BSON document model allows storing varied amenity sub-documents without creating dozens of sparsely populated join tables.
2. **Native JSON Serialization:** Documents in MongoDB map 1:1 to JavaScript objects and JSON API payloads. This avoids the object-relational impedance mismatch inherent in ORMs like Hibernate or Sequelize.
3. **Horizontal Scalability:** For read-heavy catalog searches across cities, MongoDB's native replica sets and sharding capabilities provide a straightforward scaling path."

---

### Q5: How does authentication work in this project?
**Status:** `[PARTIALLY IMPLEMENTED]`  
**Answer:**  
"In the codebase:
1. **Registration:** In [`Backend/controllers/authController.js`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Backend/controllers/authController.js#L6-L23), the `register` function checks if the email already exists in MongoDB via `User.findOne({ email })`. If new, it salts and hashes the password using `bcrypt.hash(password, 10)` and persists the new user document.
2. **Login:** The `login` function searches for the user, executes `bcrypt.compare(password, user.password)`, and if matched, signs a JWT using `jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' })`.
3. **Token Verification:** An auth middleware [`Backend/middleware/authMiddleware.js`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Backend/middleware/authMiddleware.js) extracts the `Bearer <token>` from the `Authorization` header and calls `jwt.verify()`.
*Honest Defence Note:* While the controller logic and middleware are written, `verifyToken` is not yet attached to the routes in [`Backend/routes/roomRoutes.js`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Backend/routes/roomRoutes.js), meaning route enforcement is currently an open implementation task."

---

### Q6: How is JWT or OAuth implemented?
**Status:**  
- **JWT:** `[IMPLEMENTED]` in [`Backend/controllers/authController.js`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Backend/controllers/authController.js#L38-L40)  
- **OAuth:** `[NOT IMPLEMENTED]`  
**Answer:**  
"**JWT:** We implemented stateless HMAC-SHA256 tokens using the `jsonwebtoken` npm package. Tokens include a 1-hour expiration timestamp (`expiresIn: '1h'`) and store the user's `id` and `role`.  
**OAuth:** OAuth (e.g., Google or GitHub Sign-In) is **not implemented** in the current codebase. There are no passport strategies, Google OAuth client IDs, or callback redirect routes configured. If third-party OAuth is required, we would implement it using `@react-oauth/google` on the frontend and exchange the authorization code on the Express backend."

---

### Q7: How are protected routes handled?
**Status:** `[PARTIALLY IMPLEMENTED]`  
**Answer:**  
"The verification logic is authored in [`Backend/middleware/authMiddleware.js`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Backend/middleware/authMiddleware.js):
```javascript
const token = req.header("Authorization")?.replace("Bearer ", "");
if (!token) return res.status(401).json({ message: "Access Denied" });
const verified = jwt.verify(token, process.env.JWT_SECRET);
req.user = verified;
next();
```
However, to be fully transparent, this middleware is not currently passed into `roomRoutes.post("/")` or `roomRoutes.delete("/:id")`. To secure them, we simply pass `verifyToken` as the second argument:
```javascript
router.post("/rooms", verifyToken, createRoom);
```
On the frontend, client-side route protection (e.g., React Router `<ProtectedRoute>` checking `localStorage.getItem("token")`) is also pending integration."

---

### Q8: What happens if the authentication token expires?
**Status:** `[IMPLEMENTED]`  
**Answer:**  
"In [`Backend/middleware/authMiddleware.js`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Backend/middleware/authMiddleware.js#L14-L16), when `jwt.verify(token, process.env.JWT_SECRET)` runs on an expired token, the `jsonwebtoken` library throws a `TokenExpiredError`.  
The `catch` block catches this error and immediately terminates the request:
```javascript
res.status(400).json({ message: "Invalid Token" });
```
In an upgraded production flow, we would return a distinct `401 Unauthorized` with `{ code: 'TOKEN_EXPIRED' }` so that the client can trigger an automatic token refresh using a secure httpOnly Refresh Token."

---

### Q9: What happens if authentication fails?
**Status:** `[IMPLEMENTED]`  
**Answer:**  
"In [`Backend/controllers/authController.js`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Backend/controllers/authController.js):
- If the user email does not exist: returns `400 Bad Request` with `{ message: "User not found" }`.
- If the password does not match the bcrypt hash: returns `400 Bad Request` with `{ message: "Invalid credentials" }`.
- If no token is provided in the `Authorization` header: returns `401 Unauthorized` with `{ message: "Access Denied" }`.
- If the token signature is invalid: returns `400 Bad Request` with `{ message: "Invalid Token" }`."

---

### Q10: How does data move from the frontend to the database?
**Status:** `[IMPLEMENTED ARCHITECTURE / MOCKED IN FRONTEND]`  
**Answer:**  
"The end-to-end data lifecycle follows five stages:
1. **User Action:** A user fills out a room listing form on the React frontend.
2. **Network Request:** The frontend triggers `fetch('/api/rooms', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }, body: JSON.stringify(formData) })`.
3. **Vercel Routing:** Vercel's rewrite rule in `vercel.json` detects the `/api/` prefix and routes the request directly to the Express backend service.
4. **Controller & Mongoose:** Express passes the request to `createRoom` in [`roomController.js`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Backend/controllers/roomController.js#L4-L12). The controller instantiates `new Room(req.body)` and calls `await newRoom.save()`.
5. **Database Storage & Response:** Mongoose validates the schema rules and writes the BSON document into the `rooms` collection in MongoDB Atlas. Express responds with `201 Created` and the stored room object."

---

### Q11: Why is this specific API structure used?
**Status:** `[IMPLEMENTED]`  
**Answer:**  
"We adhered to standard **RESTful resource modeling**:
- **Resource Nouns:** Routes are named after plural resources (`/api/rooms`, `/api/users`), avoiding procedural verbs in the URL like `/api/getRooms` or `/api/deleteRoomById`.
- **Standard HTTP Verbs:**
  - `GET /api/rooms` — Retrieves all listings (Safe, Idempotent).
  - `POST /api/rooms` — Creates a new listing (Unsafe, Non-idempotent).
  - `DELETE /api/rooms/:id` — Removes a specific room by unique ObjectId (Idempotent).
- **Controller Separation:** Routing files ([`roomRoutes.js`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Backend/routes/roomRoutes.js)) declare HTTP mapping only, while business and database logic reside inside controllers ([`roomController.js`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Backend/controllers/roomController.js))."

---

### Q12: How do you validate user input?
**Status:** `[PARTIALLY IMPLEMENTED]`  
**Answer:**  
"Input validation is currently handled at the **database model layer via Mongoose schema definitions**:
- In [`Backend/models/User.js`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Backend/models/User.js): `name`, `email`, and `password` are marked `required: true`. `email` has a `unique: true` constraint.
- In [`Backend/models/Room.js`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Backend/models/Room.js): `title`, `description`, `rent`, `location`, and `contact` are all marked `required: true`. `rent` enforces `type: Number`.
*Limitation & Recommended Enhancement:* We currently lack request payload validation middleware (such as `zod` or `joi`). If a client submits malformed data, it hits the database layer before throwing a Mongoose ValidationError. Adding schema validation middleware at the controller entry point would allow rejecting invalid inputs before executing database calls."

---

### Q13: How are errors handled across the stack?
**Status:** `[IMPLEMENTED]`  
**Answer:**  
"1. **Controller Try-Catch Blocks:** Every controller method is wrapped in `try...catch`. For instance, in [`Backend/controllers/roomController.js`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Backend/controllers/roomController.js#L10), caught exceptions return `res.status(500).json({ error: err.message })`.
2. **Global Express Error Middleware:** In [`Backend/server.js`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Backend/server.js#L46-L49), we registered a 4-argument global error middleware:
```javascript
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ error: "Internal Server Error" });
});
```
This guarantees that any unhandled synchronous exception inside route handlers does not crash the Node process."

---

### Q14: What would happen if 10,000 concurrent users used the system?
**Status:** `[THEORETICAL ANALYSIS BASED ON ARCHITECTURE]`  
**Answer:**  
"If 10,000 concurrent users hit the system today:
1. **Frontend:** Would handle the load without breaking because static Vite assets are cached and distributed globally across Vercel's Edge CDN.
2. **Backend API:** On Vercel serverless functions, Express instances would autoscale horizontally. However:
   - **Database Connection Exhaustion:** Each serverless invocation could spawn a new Mongoose connection, quickly hitting the MongoDB Atlas connection pool limit (M0 free cluster caps at 500 concurrent connections).
   - **Unindexed Database Scans:** `GET /api/rooms` performs an unindexed collection scan (`Room.find()`). 10,000 queries would spike MongoDB CPU to 100%.
3. **Required Mitigations:**
   - Implement **connection caching/pooling** across serverless function invocations (`cachedDb`).
   - Add a **Redis caching layer** for read-heavy room listings (`GET /api/rooms`) with a 5-minute TTL.
   - Introduce **pagination** (`limit=20&page=1`) instead of returning the entire collection in one query."

---

### Q15: What happens if MongoDB goes down or loses connectivity?
**Status:** `[VERIFIED IN DEPLOYMENT AUDIT]`  
**Answer:**  
"1. **Connection Catch Block:** When MongoDB is unreachable, the startup connection catch in [`Backend/server.js`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Backend/server.js#L37) logs `❌ MongoDB connection failed: <Error>`.
2. **Request Buffering & Timeout:** By default, Mongoose buffers operations for 10,000ms hoping the connection re-establishes. If it does not, queries fail with `MongooseError: operation buffering timed out after 10000ms`.
3. **Controller Response:** The controller's `catch` block catches the timeout and responds to the client with `500 Internal Server Error`. The server process itself remains online, but all data-dependent routes fail gracefully."

---

### Q16: What are the security risks in the current codebase?
**Status:** `[AUDITED IN TESTING REPORT]`  
**Answer:**  
"Our security audit identified four concrete risks:
1. **Unprotected Routes:** [`Backend/routes/roomRoutes.js`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Backend/routes/roomRoutes.js) does not apply `verifyToken`. Anyone with cURL can `POST` or `DELETE` listings without credentials.
2. **Wildcard CORS:** In [`Backend/server.js`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Backend/server.js#L10), `cors({ origin: "*" })` permits any third-party domain to make cross-origin requests.
3. **Hardcoded Fallbacks & Secrets:** In [`Backend/controllers/authController.js`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Backend/controllers/authController.js#L40), there is a fallback `process.env.JWT_SECRET || "defaultsecret"`. If `.env` is omitted, tokens are signed with a known weak secret.
4. **Missing Rate Limiting:** There is no rate limiter (`express-rate-limit`) on `/api/auth/login`, leaving the authentication endpoint vulnerable to credential stuffing and brute-force attacks."

---

### Q17: What part of the project did you personally implement?
**Status:** `[VERIFIED REPOSITORY CONTRIBUTION]`  
**Answer:**  
"I was responsible for:
1. **System Architecture & Stack Setup:** Bootstrapping the Node/Express backend and Vite/React frontend.
2. **Database Modeling:** Authoring the Mongoose schemas for [`User`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Backend/models/User.js), [`Room`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Backend/models/Room.js), and [`Subscription`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Backend/models/Subscription.js).
3. **Backend Business Logic:** Implementing bcrypt hashing, JWT issuance, and CRUD operations across auth and room controllers.
4. **Frontend Componentry:** Creating modular React components with Tailwind styling including [`Navbar`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Frontend/client/src/components/Navbar.jsx) and [`RoomCard`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Frontend/client/src/components/RoomCard.jsx).
5. **DevOps & Vercel Migration:** Writing the unified [`vercel.json`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/vercel.json) services configuration and troubleshooting MongoDB Atlas networking."

---

### Q18: What would you improve if given 4 more weeks?
**Status:** `[ENGINEERING ROADMAP]`  
**Answer:**  
"With four additional weeks, I would prioritize:
1. **Frontend-to-Backend Integration:** Connect `RoomCard` and listing feeds to real backend API calls with state management (React Query / TanStack Query) for caching and optimistic UI updates.
2. **Security Hardening:** Mount `verifyToken` on all mutating routes, enforce `zod` input validation, restrict CORS to production domain, and remove the hardcoded JWT secret fallback.
3. **Automated Testing Suite:** Write unit tests for auth algorithms using Jest, and integration tests for all REST endpoints using Supertest and `mongodb-memory-server`.
4. **Rich Features:** Implement Cloudinary image uploads for landlords, interactive map integration using Mapbox or Google Maps, and search filtering by price and university proximity."

---

## 📊 Summary Matrix: Feature Verification

| Feature / Topic | Implementation Status in Repo | Source File Reference |
| :--- | :--- | :--- |
| **Decoupled Architecture** | `IMPLEMENTED` | [`Backend/`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Backend) & [`Frontend/client/`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Frontend/client) |
| **React + Vite Frontend** | `IMPLEMENTED` | [`Frontend/client/package.json`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Frontend/client/package.json) |
| **Express REST Endpoints** | `IMPLEMENTED` | [`Backend/routes/`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Backend/routes/) |
| **MongoDB Atlas + Mongoose** | `IMPLEMENTED` | [`Backend/models/`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Backend/models/) |
| **Bcrypt Password Hashing** | `IMPLEMENTED` | [`authController.js:L18`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Backend/controllers/authController.js#L18) |
| **JWT Token Generation** | `IMPLEMENTED` | [`authController.js:L38`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Backend/controllers/authController.js#L38) |
| **JWT Auth Middleware** | `IMPLEMENTED` (Unmounted) | [`authMiddleware.js`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Backend/middleware/authMiddleware.js) |
| **Route Protection Enforcement** | `NOT IMPLEMENTED` | [`roomRoutes.js`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Backend/routes/roomRoutes.js) |
| **OAuth 2.0 (Google/GitHub)** | `NOT IMPLEMENTED` | No OAuth libraries or routes present |
| **Automated Unit/API Tests** | `NOT IMPLEMENTED` | No test runner configured in `package.json` |
| **Vercel Services Deployment** | `IMPLEMENTED` | [`vercel.json`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/vercel.json) |
