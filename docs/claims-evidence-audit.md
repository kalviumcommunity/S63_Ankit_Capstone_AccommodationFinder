# Claims vs. Evidence Audit Report

**Project**: Accommodation Finder Capstone (`S63_Ankit_Capstone_AccommodationFinder`)  
**Audit Date**: October 1, 2026  
**Auditor Role**: Senior Evidence Auditor & Technical Quality Auditor  

---

## Executive Summary & Methodology

This audit evaluates all functional, non-functional, business, and quantitative claims made across the repository, including [`README.md`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/README.md), documentation files in [`docs/`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/docs), source code comments, UI components, configuration files, and package manifests.

Each claim is evaluated strictly against empirical evidence in the source code. Claims are classified as:
- **`VERIFIED`**: Full, unambiguous supporting evidence exists in the codebase.
- **`PARTIALLY VERIFIED`**: Underlying code or configuration exists, but is incomplete, unattached, or flawed.
- **`NOT VERIFIED`**: Code contradicts the claim, or the feature fails on execution.
- **`NO EVIDENCE FOUND`**: Zero supporting code, metrics, data, or configuration exist in the repository.

> [!CAUTION]
> Hard rule: Static code comments, hardcoded mock objects, external market assertions, and unattached helper functions are **not** accepted as proof of real-world business impact, active user adoption, or verified functionality.

---

## Repository Audit Table

| Claim | Evidence Found | Evidence Location | Verifiable? | Action |
| :--- | :--- | :--- | :---: | :--- |
| **"Connect students with room listings & manage flatmate preferences"** | Room CRUD API exists in backend; **zero** code, schema fields, or UI components exist for flatmate preferences. | [`README.md:20`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/README.md#L20), [`User.js`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Backend/models/User.js), [`Room.js`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Backend/models/Room.js) | **NOT VERIFIED** | **Rewrite**: Remove "flatmate preferences". Replace with "Manage room listings and owner document associations." |
| **"Structured user registration & authentication for verified student profiles"** | `POST /api/auth/register` exists, but there is no student verification, email domain validation (`.edu`), or verification flag in schema. | [`README.md:60`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/README.md#L60), [`User.js:3-22`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Backend/models/User.js#L3-L22), [`authController.js:5-21`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Backend/controllers/authController.js#L5-L21) | **NOT VERIFIED** | **Rewrite**: Replace with "User registration and login using email and hashed passwords (student profile verification not implemented)." |
| **"Netlify Frontend Live Deployment (`https://capstone-accommodationfinder.netlify.app/`)"** | Netlify badge and link present in README; no `netlify.toml`, build automation scripts, or deployment logs exist in repo. | [`README.md:16,318`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/README.md#L16) | **PARTIALLY VERIFIED** | **Retain with Disclaimer**: Keep live URL badge but clarify build settings and CI/CD pipelines are managed externally. |
| **"Render Backend Live Deployment (`https://s63-ankit-capstone-accommodationfinder.onrender.com`)"** | Render badge and link present in README; no `render.yaml` or container build configuration exists in repo. | [`README.md:17,317`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/README.md#L17) | **PARTIALLY VERIFIED** | **Retain with Disclaimer**: Keep live URL badge but note infrastructure configuration is external to repo. |
| **"Hostel Deficit & Market Problem Statement (Off-campus housing demand metrics)"** | Market problem statement prose in README; **zero** survey data, university statistics, or analytical data exist in repo. | [`README.md:50-54`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/README.md#L50-L54) | **NO EVIDENCE FOUND** | **Rewrite**: Reframe as project rationale/motivation rather than an empirically measured quantitative fact. |
| **"Financial Burden Reduction (Elevated rental expenses from vacant rooms)"** | Economic claim in README; no financial calculators, expense splitting, or rental analytics code exist in repo. | [`README.md:53`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/README.md#L53) | **NO EVIDENCE FOUND** | **Rewrite**: Remove claims of financial burden reduction; state that platform allows owners to list vacant room prices. |
| **"User Growth / Active User Base / Usage Statistics / Feedback Increase"** | **Zero** analytics trackers, telemetry scripts, database usage metrics, or active user logs exist in repo. | Entire Repository | **NO EVIDENCE FOUND** | **Remove**: Completely eliminate any implied user adoption, feedback growth, or active user statistics. |
| **"React 19 + Vite 6 Single Page Application Frontend"** | `package.json` specifies `"react": "^19.0.0"` and `"vite": "^6.2.0"`. `main.jsx` mounts `App.jsx`. | [`Frontend/client/package.json:16,33`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Frontend/client/package.json#L16), [`src/main.jsx:1-10`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Frontend/client/src/main.jsx#L1-L10) | **VERIFIED** | **Maintain**: Claim is fully accurate and supported by codebase. |
| **"Tailwind CSS v4 & Radix UI Avatar Styling"** | `package.json` contains `@radix-ui/react-avatar` and `tailwindcss`. `index.css` imports `@import "tailwindcss";`. | [`Frontend/client/package.json:13,32`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Frontend/client/package.json#L13), [`src/index.css:1`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Frontend/client/src/index.css#L1) | **VERIFIED** | **Maintain**: Claim is fully accurate. |
| **"Node.js & Express v5 REST API Backend Server"** | `package.json` contains `"express": "^5.1.0"`. `server.js` initializes Express server and routes. | [`Backend/package.json:19`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Backend/package.json#L19), [`Backend/server.js:1-15`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Backend/server.js#L1-L15) | **VERIFIED** | **Maintain**: Claim is fully accurate. |
| **"MongoDB & Mongoose v8 Document Database & ODM"** | `package.json` specifies `"mongoose": "^8.13.2"`. Mongoose schemas defined in `User.js` and `Room.js`. | [`Backend/package.json:21`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Backend/package.json#L21), [`Backend/models/User.js`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Backend/models/User.js) | **VERIFIED** | **Maintain**: Claim is fully accurate. |
| **"JWT & Bcrypt Security Layer (`jsonwebtoken`, `bcrypt`)"** | `authController.js` uses `bcrypt.hash()` and `jwt.sign()`. However, `verifyToken` middleware is **unattached** to room routes. | [`Backend/controllers/authController.js:12,33`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Backend/controllers/authController.js#L12), [`Backend/middleware/authMiddleware.js`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Backend/middleware/authMiddleware.js) | **PARTIALLY VERIFIED** | **Rewrite**: State that password hashing and JWT token issuance are implemented, but route-level middleware protection is unattached. |
| **"ESLint Code Quality & Linting (`npm run lint`)"** | `eslint.config.js` exists in `Frontend/client`. However, running `npm run lint` fails with code 127 (`eslint: command not found`). | [`Frontend/client/package.json:9`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Frontend/client/package.json#L9), [`eslint.config.js`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Frontend/client/eslint.config.js) | **PARTIALLY VERIFIED** | **Rewrite**: State that ESLint configuration exists, but dependencies must be installed (`npm install`) prior to execution. |
| **"Room Ownership Association & Relational Data Linking"** | `roomRoutes.js` links rooms to users via `user.roomsOwned.push()` on creation and `$pull` cleanup on deletion. | [`Backend/routes/roomRoutes.js:39,81`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Backend/routes/roomRoutes.js#L39) | **VERIFIED** | **Maintain**: Technical claim is fully supported by code. |
| **"Dynamic Accommodation Discovery UI & Listing Display"** | Frontend `App.jsx` renders `<RoomCard room={dummyRoom} />` using local static object; no `fetch`/`axios` calls exist; `AccommodationList.jsx` is 0 bytes. | [`Frontend/client/src/App.jsx:6-19`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Frontend/client/src/App.jsx#L6-L19), `AccommodationList.jsx` | **NOT VERIFIED** | **Rewrite**: Clarify that the React UI renders a single static prototype card (`RoomCard`) with local mock data, and live API fetch integration is pending. |

---

## Detailed Audit Findings & Factual Replacements

### 1. Claim: "Manage flatmate preferences" ([`README.md:20`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/README.md#L20))
- **Audit Findings**: The repository contains no data models, schema fields, UI inputs, or API endpoints for flatmate preferences (e.g. cleanliness, sleep schedules, dietary habits, gender preferences).
- **Verifiable Status**: `NO EVIDENCE FOUND`
- **Factual Replacement**:  
  > *"A full-stack web application designed to allow property owners to publish room listings and link them to user profiles."*

---

### 2. Claim: "Verified student profiles" ([`README.md:60`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/README.md#L60))
- **Audit Findings**: The `User` Mongoose schema ([`Backend/models/User.js`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Backend/models/User.js)) contains fields for `name`, `email`, `password`, and `roomsOwned`. There are no verification status flags, student ID document uploads, or university email domain restrictions anywhere in the registration pipeline ([`authController.js`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Backend/controllers/authController.js)).
- **Verifiable Status**: `NOT VERIFIED`
- **Factual Replacement**:  
  > *"User registration and authentication system handling standard name, email, and password credentials."*

---

### 3. Claim: "Dynamic Accommodation Discovery UI" ([`README.md:135-138`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/README.md#L135-L138))
- **Audit Findings**: `Frontend/client/src/App.jsx` hardcodes a single local object (`const dummyRoom = { title: 'Cozy 1BHK in Jagatpura', ... }`). Zero `fetch()` or `axios` HTTP requests exist in the frontend codebase. Furthermore, [`AccommodationList.jsx`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Frontend/client/src/components/AccommodationList.jsx) and [`Header.jsx`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Frontend/client/src/components/Header.jsx) are empty 0-byte files.
- **Verifiable Status**: `NOT VERIFIED`
- **Factual Replacement**:  
  > *"Frontend component prototype rendering a static RoomCard component with local sample data. Integration with live backend API endpoints is pending."*

---

### 4. Claim: "JWT Authentication & Protected Endpoints" ([`README.md:12,304`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/README.md#L12))
- **Audit Findings**: While `authController.js` successfully issues JWT tokens upon login, the `verifyToken` middleware ([`Backend/middleware/authMiddleware.js`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Backend/middleware/authMiddleware.js)) is never attached to any route in [`roomRoutes.js`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Backend/routes/roomRoutes.js). All CRUD operations (`POST`, `PUT`, `DELETE`) can be executed by unauthenticated clients. Additionally, the JWT secret is hardcoded to `"your_jwt_secret"`.
- **Verifiable Status**: `PARTIALLY VERIFIED`
- **Factual Replacement**:  
  > *"Backend authentication issues JWT tokens during login. Middleware logic exists in code but is currently unattached to room management endpoints."*

---

## Claims to Remove or Rewrite (Action Summary List)

The following 6 claims must be removed or rewritten because the codebase cannot substantiate them:

1. **REMOVE**: Claims alleging "flatmate preferences management" (No flatmate preference code exists).
2. **REWRITE**: Claims stating "verified student profiles" $\rightarrow$ Rewrite to "Standard email/password registration system."
3. **REMOVE**: Quantitative market claims regarding "hostel deficits" and "financial burden reduction" $\rightarrow$ Reframe as conceptual project motivation.
4. **REWRITE**: Claims asserting "live API-driven room browsing in React UI" $\rightarrow$ Rewrite to "Static React UI component prototype displaying sample data."
5. **REWRITE**: Claims declaring "secured API routes via JWT middleware" $\rightarrow$ Rewrite to "JWT token generation implemented; route-level middleware protection unattached."
6. **REMOVE**: Any implied metrics regarding user growth, active adoption, or feedback statistics (Zero telemetry or user analytics data exists).
