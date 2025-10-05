# To-Do App

A minimalist **To-Do application** that allows you to add, edit, delete, and mark tasks as completed.  
It features a clean, responsive interface with persistent storage.

---

## Features

- Add, edit, delete, and mark tasks as done
- Persistent storage with a database
- RESTful API for backend operations
- Modern React frontend
- Production-ready static build for frontend

---

## Project Structure

backend/
├─ src/ # Backend source code
└─ index.js # Backend entry point
frontend/
├─ dist/ # Production build output from frontend


---

## Tech Stack

- **Frontend:** React, Tailwind CSS, Vite  
- **Backend:** Node.js, Express  
- **Database:** MongoDB  
- **Tools:** Nodemon, Concurrently  

---

## Getting Started

### Prerequisites

- Node.js >= 18
- npm >= 9
- MongoDB database (local or cloud)

---

### Installation

Clone the repository:

```bash
git clone <your-repo-url>
cd to_do

Install all dependencies:

npm run install-all

Running in Development

Make sure you have development scripts in backend and frontend:

    Backend (backend/package.json):

"scripts": {
  "dev": "nodemon src/index.js"
}

    Frontend (frontend/package.json):

"scripts": {
  "dev": "vite"
}

Run both frontend and backend concurrently:

npm run dev

Building for Production

npm run build

This will create a production-ready frontend build in frontend/dist/.
Running in Production

Make sure NODE_ENV=production:

npm start

The backend serves the frontend automatically.
Environment Variables

Create a .env file in the backend with:

MONGO_URI=<your-database-connection-string>
PORT=3000
NODE_ENV=development

License

This project is licensed under the ISC License.


---

### 2️⃣ Alternative: Download as a file

If you want, I can **generate a ready-to-download `README.md` file** for you, so you don’t have to copy-paste at all.  

Do you want me to do that?
