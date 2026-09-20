# Task Tracker

A full-stack Task Tracker application built with **React, Tailwind CSS, Node.js, Express.js, and MongoDB**.

## Features

- Create, edit and delete tasks
- Mark tasks as completed/pending
- Filter by All, Completed and Pending
- Search tasks by title or description
- Task statistics and creation date
- Loading, error and empty states
- Fully responsive UI
- MongoDB persistence
- RESTful API

## Tech Stack

**Frontend**
- React
- Vite
- Tailwind CSS
- Axios
- Lucide React

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose
- CORS
- dotenv

## Project Structure

```text
task-tracker/
├── frontend/
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── services/
│       ├── App.jsx
│       └── index.css
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
│
├── .gitignore
└── README.md
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/tasks` | Get all tasks |
| POST | `/api/tasks` | Create task |
| PUT | `/api/tasks/:id` | Update task |
| PATCH | `/api/tasks/:id/toggle` | Toggle completion |
| DELETE | `/api/tasks/:id` | Delete task |

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/anand16-info/Task-Tracker.git
cd task-tracker
```

### 2. Install dependencies

Frontend:

```bash
cd frontend
npm install
```

Backend:

```bash
cd ../backend
npm install
```

### 3. Configure environment variables

Create `backend/.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

### 4. Run the application

Backend:

```bash
cd backend
npm run dev
```

Frontend:

```bash
cd frontend
npm run dev
```

The frontend and backend will run on their respective local development URLs.

## Author

**Anand Pandey**
