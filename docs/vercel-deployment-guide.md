# Vercel Deployment Guide

This guide provides step-by-step instructions to deploy the **Accommodation Finder Capstone** project (Backend REST API & Frontend React SPA) on **Vercel**.

---

## 🏗️ Architecture & Deployment Strategy

The application is structured into two separate services:
1. **Backend Server (`Backend/`)**: Express v5 REST API configured to run as a **Vercel Serverless Function** via [`Backend/vercel.json`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Backend/vercel.json).
2. **Frontend Client (`Frontend/client/`)**: React 19 + Vite 6 Single Page Application deployed as a static web project via [`Frontend/client/vercel.json`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Frontend/client/vercel.json).

---

## 🛠️ Prerequisites Before Deploying

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com) using your GitHub account.
2. **MongoDB Atlas Database**: Ensure your MongoDB connection URI (`mongodb+srv://...`) is active.
3. **MongoDB Network Whitelist**:
   > [!IMPORTANT]
   > Vercel Serverless Functions use dynamic IP addresses. You **MUST** whitelist `0.0.0.0/0` (Allow Access from Anywhere) in **MongoDB Atlas** $\rightarrow$ **Network Access** $\rightarrow$ **Add IP Address**. Otherwise, database queries will time out (`buffering timed out after 10000ms`).

---

## 🚀 Step 1: Deploy Backend REST API on Vercel

### Method A: Via Vercel Web Dashboard (Recommended)

1. Go to [vercel.com/new](https://vercel.com/new).
2. Import your GitHub repository: `kalviumcommunity/S63_Ankit_Capstone_AccommodationFinder`.
3. Configure Project Settings:
   - **Project Name**: `accommodation-finder-backend`
   - **Framework Preset**: Select **Other** (or Node.js)
   - **Root Directory**: Click **Edit** and set to `Backend`
4. Expand **Environment Variables** and add:
   - `MONGO_URI`: `mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>?retryWrites=true&w=majority`
   - `JWT_SECRET`: `your_secure_jwt_secret_key_here`
   - `PORT`: `5001`
5. Click **Deploy**.
6. Once deployment completes, copy your live **Backend Production URL** (e.g. `https://accommodation-finder-backend.vercel.app`).

### Method B: Via Vercel CLI

```bash
cd Backend
npm install -g vercel  # Optional if CLI not installed
vercel
```
Follow the prompts, set Root Directory to `Backend`, and add environment variables when prompted.

---

## 🚀 Step 2: Deploy Frontend React SPA on Vercel

### Method A: Via Vercel Web Dashboard (Recommended)

1. Go to [vercel.com/new](https://vercel.com/new).
2. Import the same GitHub repository: `kalviumcommunity/S63_Ankit_Capstone_AccommodationFinder`.
3. Configure Project Settings:
   - **Project Name**: `accommodation-finder-frontend`
   - **Framework Preset**: **Vite**
   - **Root Directory**: Click **Edit** and set to `Frontend/client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Expand **Environment Variables** and add:
   - `VITE_API_BASE_URL`: `https://accommodation-finder-backend.vercel.app` (Your Backend Vercel URL from Step 1)
5. Click **Deploy**.
6. Your React client will be live at a URL like `https://accommodation-finder-frontend.vercel.app`.

---

## 🔍 Step 3: Verification & Health Checks

After completing deployment, verify your live endpoints:

1. **Backend Health Check**:
   ```bash
   curl -i https://accommodation-finder-backend.vercel.app/
   ```
   *Expected Response*: `200 OK` $\rightarrow$ `"🚀 Server is running and connected to MongoDB"`

2. **Backend API Endpoint Check**:
   ```bash
   curl -i https://accommodation-finder-backend.vercel.app/api/rooms
   ```
   *Expected Response*: `200 OK` $\rightarrow$ `[]` (Array of room listings).

3. **Frontend Browser Check**:
   Open `https://accommodation-finder-frontend.vercel.app` in your web browser and verify the UI renders without console errors.

---

## 📋 Vercel Files Configured in Repository

- [`Backend/server.js`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Backend/server.js): Exports `app` for Vercel serverless function compatibility while retaining local `app.listen()` support.
- [`Backend/vercel.json`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Backend/vercel.json): Configures `@vercel/node` builder and routes all `/api` traffic to `server.js`.
- [`Frontend/client/vercel.json`](file:///Users/manghnaniankit/Desktop/S63_Ankit_Capstone_AccommodationFinder/Frontend/client/vercel.json): Configures SPA client-side route fallback to `index.html`.
