# Vercel Deployment Guide

This guide provides step-by-step instructions to deploy the **Accommodation Finder Capstone** project on **Vercel**.

---

## 🌟 Recommended: Unified Single-Project Deployment (Frontend + Backend Together)

Thanks to the root [`vercel.json`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/vercel.json), you can deploy **both the React frontend and Express backend together in a single Vercel project** under one domain!

### Advantages:
- **Single URL**: Both frontend and backend share the exact same domain (e.g., `https://accommodation-finder.vercel.app`).
- **No CORS Issues**: Frontend can make requests directly to `/api/...` without cross-origin blocks.
- **One-click Deploy**: Only one Vercel project to configure and monitor.

---

### Step-by-Step Instructions:

1. **Go to Vercel**:
   - Open [vercel.com/new](https://vercel.com/new) and log in with GitHub.
2. **Import Repository**:
   - Find and import `kalviumcommunity/S63_Ankit_Capstone_AccommodationFinder`.
3. **Configure Project**:
   - **Root Directory**: Leave as `./` (Root directory of the repo — do NOT change it).
   - **Framework Preset**: Leave as **Other**.
4. **Add Environment Variables**:
   - `MONGO_URI`: Your MongoDB Atlas URI (e.g., `mongodb+srv://<username>:<password>@cluster0.abc.mongodb.net/<dbname>?retryWrites=true&w=majority`)
   - `JWT_SECRET`: Your secure secret key
   - `PORT`: `5001`
5. **Click Deploy**:
   - Vercel will automatically build the React Vite client using `@vercel/static-build` and compile the Express backend using `@vercel/node`.
6. **How Routes Work**:
   - `https://your-app.vercel.app/` $\rightarrow$ React SPA
   - `https://your-app.vercel.app/api/rooms` $\rightarrow$ Express Room API
   - `https://your-app.vercel.app/api/auth/*` $\rightarrow$ Express Auth API
   - `https://your-app.vercel.app/assets/*` $\rightarrow$ Bundled JS/CSS static assets

---

## 🛠️ Critical Prerequisite: MongoDB Atlas IP Access

> [!IMPORTANT]
> Because Vercel functions run in a serverless environment with dynamic IP addresses, you **must whitelist `0.0.0.0/0`**:
> 1. Log in to [MongoDB Atlas](https://cloud.mongodb.com/).
> 2. Go to **Security** $\rightarrow$ **Network Access**.
> 3. Click **Add IP Address**.
> 4. Click **Allow Access from Anywhere** (`0.0.0.0/0`).
> 5. Click **Confirm**.

---

## 🔍 Verification Checklist

After deployment completes:

1. **Test Frontend**:
   - Visit `https://<your-project>.vercel.app/` in your browser.
   - The UI should display the Navbar, RoomCard, and Footer.

2. **Test Backend API**:
   ```bash
   curl -i https://<your-project>.vercel.app/api/rooms
   ```
   *Expected Response*: `200 OK` with JSON array `[]`.

3. **Test Auth Route**:
   ```bash
   curl -i -X POST https://<your-project>.vercel.app/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"name":"Test User","email":"test@example.com","password":"testpassword123"}'
   ```

---

## 📁 Repository Configuration Files

- [`vercel.json`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/vercel.json): Unified configuration that orchestrates both Frontend (`@vercel/static-build`) and Backend (`@vercel/node`) in a single project.
- [`Backend/server.js`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Backend/server.js): Express server exported as a serverless function handler.
- [`.gitignore`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/.gitignore): Excludes `node_modules`, `.env`, and build outputs from Git tracking.
