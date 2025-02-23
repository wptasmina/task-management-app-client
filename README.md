# Task Management Application

![Task_management](https://github.com/user-attachments/assets/a9ec146e-386d-4f5e-8c7d-4e8a2425e257)


# Task Management Application

## 📌 Overview
This Task Management Application allows users to add, edit, delete, and reorder tasks using a **drag-and-drop interface**. Tasks are categorized into three sections: **To-Do, In Progress, and Done**. Changes are saved instantly in the database to maintain persistence. The app features **real-time synchronization**, **authentication with Firebase**, and a **responsive, modern UI**.


## Live Demo
🔗 [Live Application](https://tesk-management-app-client.vercel.app) 

### GitHub Repository Link:

GitHub frontend:    https://github.com/wptasmina/task-management-app-client

GitHub backend: https://github.com/wptasmina/tasks-management-app-server

```

## Features
- **Authentication:**
  - Users must sign in with Google via Firebase Authentication.
  - User details (ID, email, and display name) are stored in the database upon first login.
- **Task Management:**
  - Create, edit, delete, and reorder tasks.
  - Drag-and-drop tasks between categories.
  - Reorder tasks within the same category.
  - Tasks include:
    - Title (max 50 characters, required)
    - Description (max 200 characters, optional)
    - Timestamp (auto-generated upon creation)
    - Category (To-Do, In Progress, Done)
- **Database & Real-Time Syncing:**
  - Uses MongoDB for persistent task storage.
  - Updates are reflected instantly in the database.
  - Implements real-time synchronization via WebSockets/MongoDB Change Streams.
- **Frontend:**
  - Built with **Vite.js + React**.
  - Modern and responsive UI using a maximum of four colors.
  - Drag-and-drop functionality powered by `react-beautiful-dnd`.
- **Responsiveness:**
  - Fully functional on both desktop and mobile devices.
  - Smooth mobile-friendly drag-and-drop experience.
- **Backend:**
  - Built with **Express.js & MongoDB**.
  - RESTful API with the following endpoints:
    - `POST /tasks` – Add a new task
    - `GET /tasks` – Retrieve all tasks for the logged-in user
    - `PUT /tasks/:id` – Update task details (title, description, category)
    - `DELETE /tasks/:id` – Delete a task
- **Bonus Features (Optional but Recommended):**
  - Dark mode toggle.
  - Task due dates with color indicators (e.g., overdue tasks appear in red).
  - Simple activity log to track task changes (e.g., "Task moved to Done").

## Technologies Used
### Frontend:
- **Vite.js + React**
- **Firebase Authentication**
- **Tailwind CSS**
- **React Beautiful DnD** (drag-and-drop functionality)
- **Toastify** (notifications)

### Backend:
- **Node.js + Express.js**
- **MongoDB**
- **WebSockets / MongoDB Change Streams** (real-time updates)
- **CORS & dotenv** (security & configuration)

## Installation & Setup
### Prerequisites:
- Node.js & npm installed
- MongoDB database (local or cloud instance)
- Firebase project setup with Google Authentication

### Clone the Repository:
```sh
git clone https://github.com/wptasmina/task-management-app.git
cd task-management-app
```

### Backend Setup:
```sh
cd backend
npm install
```
#### Create a `.env` file in the `backend` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```
#### Start the Backend Server:
```sh
npm start
```

### Frontend Setup:
```sh
cd ../frontend
npm install
```
#### Create a `.env` file in the `frontend` directory:
```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_API_BASE_URL=http://localhost:5000
```
#### Start the Frontend:
```sh
npm run dev
```

## Folder Structure
```
/task-management-app
│── frontend/      # React frontend with Vite.js
│── backend/       # Express.js backend with MongoDB
│── README.md      # Project documentation
```

## Deployment
- **Frontend:** Deploy using Vercel, Vercel, or Firebase Hosting.
- **Backend:** Deploy using Render, Heroku, or AWS.
- **Database:** Use MongoDB Atlas for cloud storage.

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss.

## License
This project is licensed under the MIT License.

