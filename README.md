# AI Flow Builder (MERN + React Flow + OpenRouter)

A full-stack MERN application that allows users to input a prompt, generate an AI response using OpenRouter, visualize it using React Flow, and save the data to MongoDB.

---

## 🧠 Features

-  Interactive flow UI using React Flow  
-  AI response generation via OpenRouter API  
-  Backend API built with Node.js & Express  
-  MongoDB database integration  
-  Save prompt + response functionality  
-  Responsive UI with Tailwind CSS  

---

## 🛠️ Tech Stack

- **Frontend:** React, React Flow, Tailwind CSS  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Mongoose)  
- **API:** OpenRouter (LLM integration)  

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone 
cd mern-ai-flow-app
```

### 2️⃣ Setup Backend

```bash
cd server
npm install
```

### Create a .env file inside /server

```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
OPENROUTER_API_KEY=your_api_key
```

### Start backend

```bash
npm run dev
```

### 3️⃣ Setup Frontend

Open a new terminal:

```bash
cd client
npm install
npm start
```

