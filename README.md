🍽️ Guestara Upsell - Menu Management Backend

A Node.js + Express.js backend for managing restaurant menus — including Categories, Subcategories, and Items — with full CRUD operations, item search, and tax logic.
This project was created as part of an internship assignment for menu management functionality.

🚀 Features
🧩 Category

Create, Get (all/by ID or name), and Edit categories

Includes attributes like name, image, description, and tax details

🪶 Subcategory

Create, Get (all/by ID or name/by category), and Edit subcategories

Subcategories inherit category tax applicability and tax by default

🍔 Item

Create, Get (all/by ID or name/by subcategory/by category), and Edit items

Automatically calculates total amount = base - discount

Supports item search by name across category, subcategory, and item levels

🛠️ Tech Stack

Node.js – Runtime environment

Express.js (v5) – Server framework

MongoDB – NoSQL database

Mongoose – Object Data Modeling (ODM) for MongoDB

express-validator – Input validation

winston – Logging

dotenv – Environment variable management

nodemon – Development utility

📂 Project Structure
guestara_upsell/
│
├── src/
│   ├── server.js              # Entry point
│   ├── config/                # Database and environment setup
│   ├── models/                # Mongoose schemas (Category, SubCategory, Item)
│   ├── controllers/           # Route logic for CRUD and search
│   ├── routes/                # Express routers
│   ├── services/              # Database service layer
│   ├── utils/                 # Custom helpers & logger
│   └── middlewares/           # Validators, error handlers, etc.
│
├── logs/                      # Winston log files
├── .env                       # Environment variables
├── .gitignore
├── package.json
└── README.md

⚙️ Setup Instructions
1️⃣ Clone the Repository
git clone https://github.com/ShadowAdi/guestara_upsell.git
cd guestara_upsell

2️⃣ Install Dependencies
npm install

3️⃣ Setup Environment Variables

Create a .env file in the root directory and include:

PORT=5000
MONGO_URI=mongodb+srv://<your-connection-string>

4️⃣ Start the Server

Development mode (auto-reload with nodemon):

npm run dev


Production mode:

npm start


Server will start at:
👉 http://localhost:8080

## 🚀 Deployment

This project is ready for deployment on Vercel. See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ShadowAdi/guestara_upsell)

**Required Environment Variables:**
- `MONGODB_URL` - Your MongoDB connection string
- `NODE_ENV=production`

📘 Documentation

A short Loom walkthrough video shows:

Few API calls

Working Of API

Note:
I sincerely apologize — in my Loom video, I wasn’t able to show the demo for every single API. and showcase my project structure and to explain in details,
My university exams are ongoing and will conclude by Monday, making it slightly difficult to manage both at once.
However, please rest assured that I have implemented all the required functionalities in the code and verified their working locally.

💭 Assignment Questions
🧩 Which database have you chosen and why?

I chose MongoDB because it offers flexible schemas, fast querying, and excellent support for hierarchical data — perfect for managing categories, subcategories, and items that may not always exist in a fixed relational structure.

📚 3 things I learned from this assignment:

Structuring a multi-level data model using Mongoose relationships.

Implementing validation and consistent error handling in Express.

Designing RESTful APIs that support both ID and name-based querying.

🧗‍♂️ Most difficult part:

Maintaining clear relationships between Category → Subcategory → Item while supporting flexible search queries across all three.

🧠 What I would have done differently with more time:

Add pagination and sorting to all GET endpoints.

Implement Swagger documentation.

Add JWT-based authentication for role-based access (Admin/Editor).
 


🧑‍💻 Author

Aditya Shukla
BCA Student @ Maharishi University

📄 License

This project is licensed under the ISC License.