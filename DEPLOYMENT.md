# Deployment Guide

This guide covers deploying the MERN stack software house website.

## Using Docker Compose (Recommended for VPS like DigitalOcean/AWS EC2)

1. **Prerequisites:** Make sure Docker and Docker Compose are installed on your server.
2. **Clone the repository:** Clone this code to your server.
3. **Environment Variables:**
   - Create a `.env` file in the `backend` directory with your production variables.
   - Example:
     ```
     NODE_ENV=production
     PORT=5000
     MONGO_URI=mongodb://mongo:27017/softwarehouse
     JWT_SECRET=your_super_secure_secret
     JWT_EXPIRE=30d
     ```
4. **Run Docker Compose:**
   Run the following command from the root directory (where `docker-compose.yml` is located):
   ```bash
   docker-compose up -d --build
   ```
   This will build the frontend and backend images and start the MongoDB container. The frontend will be available on port 3000 and the backend on port 5000.

## Manual Deployment (e.g., Vercel for Frontend, Render/Heroku for Backend)

### Frontend (Vercel)
1. Push your code to GitHub.
2. Import the project in Vercel.
3. Set the Root Directory to `frontend`.
4. Vercel will automatically detect Vite and configure the build settings.

### Backend (Render/Heroku)
1. Set the Root Directory to `backend` or deploy the backend folder as a separate repo.
2. Ensure you have your `MONGO_URI` set to a cloud database like **MongoDB Atlas**.
3. Add your Environment Variables in the platform's dashboard.
4. Set the Start Command to `node server.js`.

### MongoDB
Use **MongoDB Atlas** for a managed database solution in production instead of a local instance. Update the `MONGO_URI` in your backend `.env` file to point to the Atlas connection string.
