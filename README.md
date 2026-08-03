# 🎵 Music API

A role-based REST API built with **Node.js**, **Express.js**, **MongoDB**, and **JWT** that allows users to register as either a **User** or an **Artist**. Artists can upload songs to **ImageKit**, create albums, and manage their music, while regular users can browse and listen to uploaded songs.

---

## 🚀 Features

* 👤 User & Artist Registration
* 🔐 JWT Authentication
* 🎭 Role-Based Authorization (User / Artist)
* 🔑 Secure Password Hashing using bcrypt
* 🎵 Artist Song Upload
* 💿 Album Creation & Management
* ☁️ Cloud Storage with ImageKit
* 📂 Songs are stored securely in the cloud (not locally)
* 📜 Browse Uploaded Songs
* ✅ Request Validation
* ⚠️ Error Handling
* 🌐 RESTful API Design

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT (JSON Web Token)
* bcrypt
* express-validator
* multer
* ImageKit
* cookie-parser
* dotenv

---

## ⚙️ Installation

### Clone the repository

```bash
git clone https://github.com/your-username/music-api.git
```

Move into the project folder

```bash
cd music-api
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
PORT=3000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
```

Start the development server

```bash
npm run server
```

---

## 👥 User Roles

### 👤 User

A normal user can:

* Register
* Login
* View all songs
* View albums
* Stream uploaded songs

Users **cannot** upload songs or create albums.

---

### 🎤 Artist

An artist can:

* Register as an Artist
* Login
* Upload songs
* Create albums
* Manage their own uploaded songs
* View their uploaded music

Artists have access to all user features along with music management capabilities.

---

## 📌 API Endpoints

### Authentication

| Method | Endpoint    | Description                |
| ------ | ----------- | -------------------------- |
| POST   | `/register` | Register as User or Artist |
| POST   | `/login`    | Login                      |

### Songs

| Method | Endpoint | Access        |
| ------ | -------- | ------------- |
| GET    | `/songs` | User & Artist |
| POST   | `/songs` | Artist Only   |

### Albums

| Method | Endpoint  | Access        |
| ------ | --------- | ------------- |
| GET    | `/albums` | User & Artist |
| POST   | `/albums` | Artist Only   |

---

## 🔐 Authentication Flow

1. Register as a **User** or **Artist**.
2. Passwords are hashed using **bcrypt**.
3. Login using email and password.
4. A JWT token is generated after successful authentication.
5. Protected routes verify the token.
6. Role-based middleware ensures only artists can upload songs or create albums.

---

## ☁️ File Upload

This project uses **ImageKit** for cloud storage.

* Songs are uploaded directly to ImageKit.
* Audio files are **never stored locally** on the server.
* Only the song metadata and ImageKit file URL are saved in the database.

---

## 🔒 Security Features

* Password hashing with bcrypt
* JWT Authentication
* Role-Based Authorization
* HTTP-only Cookies
* Request Validation
* Environment Variables
* Cloud File Storage

---

## 📦 Dependencies

* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* multer
* ImageKit
* express-validator
* cookie-parser
* dotenv

---

## 📖 Learning Objectives

This project helped me understand:

* REST API development
* JWT Authentication
* Role-Based Authorization
* Password Hashing
* MongoDB & Mongoose
* File Uploads with ImageKit
* Middleware
* API Security
* Cloud Storage Integration

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Krishna**

Engineering Student | MERN Stack Learner

If you found this project helpful, don't forget to ⭐ the repository!
