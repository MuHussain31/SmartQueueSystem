# Smart Queue Management System

## 1. Project Overview
This is a full-stack web application designed to manage queues efficiently. It allows users to join a queue, track their status in real-time, and helps administrators manage service flow.

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

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   npm install
   npm run dev
   ```

   ### Frontend Setup

2. **Navigate to the frontend directory:**
   Open a new terminal window (keep the backend running) and run:
   ```bash
   cd frontend
   npm install
   npm start
```
## 3. Docker Setup (Easy Deployment)

Since this project is containerized, you can run the entire stack (Frontend, Backend, and Database) with a single command.

1. **Ensure Docker Desktop is running** on your machine.

2. **Run Docker Compose:**
   ```bash
   docker-compose up --build
```
 3. **Access the Application:**
   * **Frontend:** http://localhost:3000
   * **Backend API:** http://localhost:5000
   * **MongoDB:** mongodb://localhost:27017

4. **Stop the Containers:**
   To stop the application, press `Ctrl + C` in the terminal or run:
   ```bash
   docker-compose down

## 3. Project Structure

```text
/
├── backend/                # Node.js & Express Server
│   ├── models/             # Mongoose Models (Database Schema)
│   ├── routes/             # API Routes
│   ├── .env                # Environment variables
│   └── server.js           # Entry point for Backend
│
├── frontend/               # React Application
│   ├── public/             # Static assets
│   ├── src/                # React source code
│   └── package.json        # Frontend dependencies
│
├── docker-compose.yml      # Docker configuration for multi-container setup
└── README.md               # Project Documentation
```


   
