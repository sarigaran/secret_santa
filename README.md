Secret Santa Web Service & Client

Technologies Used

Web Service (Backend)

Node.js

Express.js

MongoDB

Mongoose

Client (Frontend)

React.js (using Vite for fast development)

Packages Required

Backend

cors - Enables Cross-Origin Resource Sharing

dotenv - Loads environment variables from a .env file

express - Web framework for Node.js

mongoose - ODM (Object Data Modeling) for MongoDB

multer - Middleware for handling file uploads

nodemon - Automatically restarts the server during development

papaparse - Parses CSV files efficiently

Frontend

antd - UI components for React

axios - HTTP client for making API requests

papaparse - Parses CSV files efficiently

Installation & Running the Services

Backend (Web Service)

Install dependencies:

npm i

Start the development server:

npm run dev

Frontend (Client Service)

Navigate to the client directory:

cd client

Install dependencies:

npm i

Start the development server:

npm run dev

API Endpoints

1. Upload Employees CSV

Endpoint: POST /upload

Accepts a CSV file containing employee details

Stores employees in MongoDB

2. Assign Secret Santa

Endpoint: GET /assign

Randomly assigns a Secret Santa to each employee

Project Structure

📂 SecretSantaProject
├── 📁 backend          # Web service (Node.js & Express)
│   ├── 📁 uploads      # Stores uploaded CSV files
│   ├── 📄 server.js    # Main server file
│   ├── 📄 .env         # Environment variables
│   ├── 📄 package.json # Backend dependencies
│
├── 📁 client           # Frontend (React.js using Vite)
│   ├── 📄 src/         # React app source code
│   ├── 📄 vite.config.js # Vite configuration
│   ├── 📄 package.json # Frontend dependencies
│
└── 📄 README.md        # Project documentation

Notes

Ensure MongoDB is running before starting the backend service.

Uploaded CSV must have Employee_Name and Employee_EmailID columns.

The service prevents assigning the same Secret Santa as last year.

The frontend must be configured to communicate with the backend API.