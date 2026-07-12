# Software House Website Boilerplate (MERN Stack)

A production-ready boilerplate for building a premium software house or IT services website using the MERN stack.

## Tech Stack

**Frontend:**
- React (Vite)
- React Router DOM
- Tailwind CSS v4
- Framer Motion (Animations)
- Lucide React (Icons)

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose
- JWT (JSON Web Tokens)
- bcrypt (Password Hashing)

## Quick Start

### 1. Backend Setup
1. Navigate to the `backend` folder: `cd backend`
2. Install dependencies: `npm install`
3. Configure environment variables in `backend/.env`.
4. Start the development server: `npm run dev` (Requires nodemon) or `node server.js`

### 2. Frontend Setup
1. Navigate to the `frontend` folder: `cd frontend`
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`

## Features Included
- **RESTful API** with Express and MongoDB.
- **Authentication system** (Login, Register, Protect middleware).
- **Mongoose Models** for Services, Portfolios, Blogs, Careers, and Contact messages.
- **Global Error Handling** middleware.
- **Frontend Routing** using React Router.
- **Tailwind v4** pre-configured.
- **Docker & Docker Compose** ready for easy deployment.

## Next Steps
- Complete the React components for the Admin Dashboard.
- Wire up the frontend forms to call the backend APIs.
- Add image upload functionality (e.g., AWS S3 or Cloudinary).
