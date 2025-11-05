# 🍽️ Guestara Upsell — Menu Management Backend

A **Node.js + Express.js** backend for managing restaurant menus — including **Categories**, **Subcategories**, and **Items** — with full CRUD operations, item search, and tax logic.

> 🧑‍💻 Developed as part of an internship assignment for menu management functionality.

---

## 🚀 Features

### 🧩 Category
- Create, Get (all/by ID or name), and Edit categories  
- Attributes: **name**, **image**, **description**, **tax applicability**, **tax amount**, and **tax type**

### 🪶 Subcategory
- Create, Get (all/by ID or name/by category), and Edit subcategories  
- Inherits **tax applicability** and **tax** from the parent category by default  

### 🍔 Item
- Create, Get (all/by ID or name/by subcategory/by category), and Edit items  
- Automatically calculates `totalAmount = baseAmount - discount`  
- Search for items by name across all levels — Category, Subcategory, or Item  

---

## 🛠️ Tech Stack

| Tool / Library | Purpose |
|-----------------|----------|
| **Node.js** | Runtime environment |
| **Express.js (v5)** | Web server framework |
| **MongoDB** | NoSQL database |
| **Mongoose** | ODM for MongoDB |
| **express-validator** | Input validation |
| **winston** | Logging |
| **dotenv** | Environment variable management |
| **nodemon** | Development utility |

---

## 📂 Project Structure


guestara_upsell/
│
├── src/
│ ├── server.js # Entry point
│ ├── config/ # Database and environment setup
│ ├── models/ # Mongoose schemas (Category, SubCategory, Item)
│ ├── controllers/ # Route logic for CRUD and search
│ ├── routes/ # Express routers
│ ├── services/ # Database service layer
│ ├── utils/ # Custom helpers & logger
│ └── middlewares/ # Validators, error handlers, etc.
│
├── logs/ # Winston log files
├── .env # Environment variables
├── .gitignore
├── package.json
└── README.md



---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/ShadowAdi/guestara_upsell.git
cd guestara_upsell
```


2️⃣ Install Dependencies

```bash
yarn install
```

3️⃣ Setup Environment Variables

Create a .env file in the root directory:
PORT=5000
MONGO_URI=mongodb+srv://<your-connection-string>


4️⃣ Start the Server


```bash
Development mode (auto-reload with nodemon):

yarn run dev


Production mode:

yarn start


```


📘 Documentation

🎥 Loom Video Walkthrough:
Demonstrates key API endpoints, CRUD operations, and project structure.

⚠️ Note: Due to ongoing university exams, I wasn’t able to record every single API demo in the Loom video.
I’ll be happy to re-record a full video and share deployment updates by Tuesday if needed.
All APIs are implemented, tested, and functional locally.


💭 Assignment Questions
🧩 Which database did you choose and why?

I chose MongoDB for its flexibility, schema-less design, and strong handling of hierarchical data — perfect for managing categories, subcategories, and items that don’t always follow a fixed structure.

📚 3 Things I Learned

Structuring multi-level data models using Mongoose relationships

Implementing validation and consistent error handling in Express

Designing RESTful APIs that support both ID and name-based querying

🧗‍♂️ Most Difficult Part

Maintaining clear relationships between Category → Subcategory → Item, while enabling flexible search queries across all three levels.

🧠 What I Would Do Differently (Given More Time)

Add pagination and sorting for all GET endpoints

Integrate Swagger/OpenAPI documentation

Implement JWT-based authentication for Admin/Editor roles

Write test for every endpoint



🧑‍💻 Author

Aditya Shukla
BCA Student Fifth Sem @ Maharishi University
GitHub: @ShadowAdi