# ShopSphere E-Commerce

Professional full-stack MERN-style e-commerce project.

## Features
- React + Vite storefront
- Product catalog
- Shopping cart with local persistence
- User registration and login with JWT
- Checkout and order creation
- MongoDB models
- Admin API routes and dashboard page
- Responsive professional UI
- Sample products automatically seeded

## Tech Stack
**Frontend:** React, Vite, React Router  
**Backend:** Node.js, Express  
**Database:** MongoDB / Mongoose  
**Authentication:** JWT + bcryptjs

## Run locally

### 1. Backend
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Set your MongoDB connection in `.env`.

### 2. Frontend
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Open the local Vite URL shown in the terminal.

## Important
This repository contains environment templates only. Never commit real passwords, JWT secrets, database credentials, or payment keys.

## Project Structure
```
ShopSphere-Ecommerce/
├── frontend/
│   └── src/
├── backend/
│   ├── models/
│   ├── routes/
│   └── middleware/
├── README.md
└── .gitignore
```
