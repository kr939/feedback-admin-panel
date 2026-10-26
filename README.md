# FeedSpace Admin Panel

## Project Overview
FeedSpace is a MERN stack-based Course Feedback Management Admin Panel that allows administrators to manage course feedback efficiently.

## Features
- View course feedback on the dashboard.
- Add new feedback entries.
- Edit existing feedback.
- Delete feedback entries.
- Store feedback data using MongoDB Atlas.
- Responsive user interface.

## Technologies Used
- **Frontend:** React, Vite, CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **Version Control:** Git and GitHub

## Project Structure
- `frontend/` — React frontend application.
- `backend/` — Node.js and Express backend application.

## Running the Project Locally

### 1. Clone the repository
```bash
git clone https://github.com/kr939/feedback-admin-panel.git
cd feedback-admin-panel
```

### 2. Start the backend
```bash
cd backend
npm install
```

Create a `.env` file in the backend folder with your MongoDB connection string and the port configuration required by the application. Never upload this file to GitHub.

Then start the backend using the start command configured in `backend/package.json`.

### 3. Start the frontend
Open another terminal:
```bash
cd frontend
npm install
npm run dev
```

Open the local address shown in the frontend terminal.

## Note
MongoDB Atlas credentials and other environment secrets must be configured locally and must not be committed to the repository.
