# Deployment Verification & Infrastructure Assessment Report

**Project**: Accommodation Finder Capstone (`S63_Ankit_Capstone_AccommodationFinder`)  
**Assessment Date**: October 1, 2026  
**Auditor Role**: Senior DevOps / Infrastructure Engineer  

---

## Executive Summary

This report evaluates the deployment architecture, build/start configurations, environment dependencies, network health, and live service endpoints for the Accommodation Finder project. Live endpoint testing was executed against the URLs referenced in the project repository.

---

## 1. Frontend Deployment Configuration

| Attribute | Details |
| :--- | :--- |
| **Hosting Platform** | Netlify |
| **Live Deployment URL** | [`https://capstone-accommodationfinder.netlify.app/`](https://capstone-accommodationfinder.netlify.app/) |
| **Build Framework** | Vite v6.2.0 + React v19.0.0 |
| **Build Directory** | `dist/` (Standard Vite output) |
| **In-Repo Configuration File** | **None** (`netlify.toml` is not present in the repository) |
| **Routing Strategy** | Single-Page Application (SPA) static bundle serving |

### Observations:
- Netlify serves the static HTML/JS/CSS bundle.
- Build parameters are configured directly within Netlify's web dashboard rather than via a repository config file.

---

## 2. Backend Deployment Configuration

| Attribute | Details |
| :--- | :--- |
| **Hosting Platform** | Render (Web Service) |
| **Live Deployment URL** | [`https://s63-ankit-capstone-accommodationfinder.onrender.com`](https://s63-ankit-capstone-accommodationfinder.onrender.com) |
| **Runtime Environment** | Node.js (Express v5.1.0) |
| **Main Process Entrypoint** | `server.js` |
| **In-Repo Configuration File** | **None** (`render.yaml`, `Procfile`, or `Dockerfile` missing in repo) |
| **Listener Port** | Defaults to `process.env.PORT` or `5001` |

### Observations:
- Render hosts the Express web server process.
- Operational commands (`node server.js`) are configured in the Render service control panel.

---

## 3. Production Environment Requirements

The following environment variables must be defined in hosting environments:

| Environment Variable | Target System | Requirement & Purpose | Security Classification |
| :--- | :--- | :--- | :--- |
| `PORT` | Backend (Render) | Port for Express server listener (Render dynamically assigns this). | Non-Sensitive |
| `MONGO_URI` | Backend (Render) | MongoDB Atlas connection string (`mongodb+srv://...`). | **CRITICAL SECRET** |
| `JWT_SECRET` | Backend (Render) | Secret key for signing and verifying JSON Web Tokens. | **CRITICAL SECRET** |

> [!WARNING]
> No `.env` files are tracked in source control (correctly excluded by `.gitignore`). Environment variables must be set manually in Render's dashboard.

---

## 4. Build Process

### Frontend Build Process
- **Repository Location**: `Frontend/client`
- **Build Command**: `npm run build` (`vite build`)
- **Output Artifact**: Compiled static assets placed in `Frontend/client/dist/`
- **Prerequisites**: Node.js 18+ and `npm install` inside `Frontend/client/`

### Backend Build Process
- **Repository Location**: `Backend`
- **Build Command**: `npm install` (No transpilation step; native Node.js ES/CommonJS execution)
- **Output Artifact**: Direct execution of source files

---

## 5. Start Process

| Service | Environment | Execution Command | File Source |
| :--- | :--- | :--- | :--- |
| **Backend (Production)** | Render | `npm start` (`node server.js`) | [`Backend/package.json:8`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Backend/package.json#L8) |
| **Backend (Development)** | Local | `npm run dev` (`nodemon server.js`) | [`Backend/package.json:7`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Backend/package.json#L7) |
| **Frontend (Production)** | Netlify | `npm run build` $\rightarrow$ Static Web Server | [`Frontend/client/package.json:8`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Frontend/client/package.json#L8) |
| **Frontend (Development)** | Local | `npm run dev` (`vite`) | [`Frontend/client/package.json:7`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Frontend/client/package.json#L7) |

---

## 6. API Base URL Configuration & Frontend-to-Backend Connection

- **Backend Base URL**: `https://s63-ankit-capstone-accommodationfinder.onrender.com`
- **Frontend Disconnection Gap**:
  - Code audit of [`Frontend/client/src/App.jsx`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Frontend/client/src/App.jsx) reveals **zero** API requests (`fetch` / `axios`).
  - The React client does not configure `VITE_API_BASE_URL` or environment variables to communicate with the Render backend.
  - The live Netlify deployment renders local static mock data (`dummyRoom`) and does not interact with the live Render API.

---

## 7. CORS Configuration

Backend CORS configuration defined in [`Backend/server.js:10-14`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Backend/server.js#L10-L14):

```javascript
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
```

### Assessment:
- **Permissive Wildcard (`*`)**: Allows any client domain (including Netlify) to make cross-origin HTTP requests.
- **Production Risk**: Wildcard origin should be restricted in production to authorized origins (e.g. `https://capstone-accommodationfinder.netlify.app`).

---

## 8. Database Connection Requirements

- **Engine**: MongoDB Atlas (Cloud Managed Database Cluster).
- **Mongoose Connection**: Initialized in [`Backend/server.js:34-39`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Backend/server.js#L34-L39):
  ```javascript
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  ```
- **Network Access Requirement**: MongoDB Atlas IP Access List must whitelist Render outbound IP addresses (`0.0.0.0/0` for dynamic cloud hosting).

---

## 9. Empirical Live Deployment Verification Results

Live network verification was executed against production URLs. The results are recorded below:

| Target Endpoint / URL | HTTP Status | Response Payload / Behavior | Audit Classification | Diagnosis / Details |
| :--- | :---: | :--- | :---: | :--- |
| **Frontend Root**<br>`https://capstone-accommodationfinder.netlify.app/` | `200 OK` | HTML bundle containing `<div id="root"></div>` and asset scripts. | **ONLINE (Static UI)** | Netlify static hosting is operational. Renders static mock card. |
| **Backend Health Check**<br>`https://s63-ankit-capstone-accommodationfinder.onrender.com/` | `200 OK` | `🚀 Server is running and connected to MongoDB` | **ONLINE (Express Server)** | Render Node.js process is active and responds to HTTP GET. |
| **Backend Public API**<br>`https://s63-ankit-capstone-accommodationfinder.onrender.com/api/rooms` | `500 Error` | `{"message":"Operation \`rooms.find()\` buffering timed out after 10000ms"}` | **DEGRADED / DATABASE DISCONNECTED** | Render web process cannot complete MongoDB queries. Mongoose query buffering times out after 10s. |
| **Backend Auth API**<br>`https://s63-ankit-capstone-accommodationfinder.onrender.com/api/auth/login` | `500 Error` | `{"message":"Operation \`users.findOne()\` buffering timed out after 10000ms"}` | **DEGRADED / DATABASE DISCONNECTED** | Database connection buffers and times out when attempting `users.findOne()`. |

> [!CAUTION]
> **Production Defect Discovered**: While the backend server process on Render is running and returns HTTP 200 for static route `/`, **all database-backed API endpoints fail with HTTP 500** due to Mongoose query buffering timeouts (`buffering timed out after 10000ms`).

---

## 10. Known Deployment Risks

1. **MongoDB Connection Failure on Render**:
   - Database operations buffer for 10 seconds and time out.
   - **Root Cause**: `MONGO_URI` environment variable on Render is either missing, incorrect, points to a paused cluster, or MongoDB Atlas IP Access List blocks Render server IPs.
2. **Disconnected Frontend Client**:
   - React app on Netlify does not call the Render API. UI is isolated from backend database state.
3. **Missing In-Repo Infrastructure Specifications**:
   - Absence of `netlify.toml` and `render.yaml` makes deployment settings non-reproducible from source control alone.
4. **Unrestricted Wildcard CORS (`*`)**:
   - Allows arbitrary third-party websites to access backend API endpoints.
5. **Hardcoded Fallback JWT Secret**:
   - Secret defaults to `"your_jwt_secret"` if `process.env.JWT_SECRET` is unset on Render.

---

## 11. Manual Verification Checklist

Use this checklist for manual verification in browser / dev tools:

- [ ] **1. Netlify Frontend Browser Check**:
  - Open `https://capstone-accommodationfinder.netlify.app/` in Chrome/Firefox.
  - Verify page loads with title `Vite + React`.
  - Inspect Developer Tools Network tab: Confirm zero outgoing requests to `onrender.com`.

- [ ] **2. Render Backend Health Check**:
  - Open `https://s63-ankit-capstone-accommodationfinder.onrender.com/` in browser.
  - Confirm text: `"🚀 Server is running and connected to MongoDB"`.

- [ ] **3. Render Database Timeout Verification**:
  - Open `https://s63-ankit-capstone-accommodationfinder.onrender.com/api/rooms` in browser or cURL.
  - Observe 10-second delay followed by `500 Internal Server Error` with message `"Operation \`rooms.find()\` buffering timed out after 10000ms"`.

- [ ] **4. Remediation Verification (After fixing MongoDB Atlas IP Whitelist / MONGO_URI on Render)**:
  - Re-query `GET /api/rooms` and confirm `200 OK` status with room array payload.
