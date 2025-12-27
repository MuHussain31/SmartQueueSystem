# Smart Queue Management System

## 1. Project Overview
This is a full-stack web application designed to manage queues efficiently. Built using the **MERN Stack (MongoDB, Express, React, Node.js)**, this system allows users to join queues virtually and allows administrators to manage customer flow in real-time.

The application is fully containerized using **Docker** for easy deployment.

### Tech Stack
* **Frontend:** React.js, Tailwind CSS
* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **DevOps:** Docker, Docker Compose

---

## 2. Setup Instructions (Local Development)

If you wish to run the project without Docker, follow these steps:

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   npm install
   npm start

   ### Frontend Setup
   1. Navigate to the frontend directory:
   cd frontend
   npm install
   npm start

   Docker Run Commands (Recommended)
To run the complete application (Frontend + Backend + Database) using Docker, ensure Docker Desktop is running and execute the following command in the root directory:

Build and run:
docker-compose up --build

Stop the Application:
docker-compose down

Once running, access the application at:

Frontend: http://localhost:3000

Backend API: http://localhost:5000



   
