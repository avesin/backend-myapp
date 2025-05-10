
# 📨 YouApp Backend — Messaging API with RabbitMQ + MongoDB + JWT Auth

This is a NestJS-based backend application for a messaging app (YouApp) that follows an event-driven, scalable architecture using **RabbitMQ**, **MongoDB**, and **WebSockets**.

---

## 📦 Features

- ✅ Register, Login, JWT Auth
- ✅ Profile Update
- ✅ Interest Tagging
- ✅ Username Availability Check
- ✅ Message Queue (send via RabbitMQ)
- ✅ Message Storage (MongoDB, from Consumer)
- ✅ Real-Time via WebSocket Gateway

---

## 📁 .env Configuration

Create a `.env` file in the root folder:

```env
# Server
PORT=3001
APP_ENV=development

# MongoDB
MONGO_URI=mongodb://admin:adminpassword@localhost:27017/youappdb?authSource=admin

# RabbitMQ
RABBITMQ_URL=amqp://admin:adminpassword@localhost:5672

# JWT
JWT_SECRET=your_super_secret_key
JWT_ACCESS_TTL=5m
JWT_REFRESH_TTL=30d
```

---

## 🧠 Architecture Overview

```text
Client → [REST API: /sendMessage]
      → [RabbitMQ]
          → [Consumer]
               → Save to MongoDB
               → Emit via WebSocket
```

- All messages are published to RabbitMQ
- A consumer handles saving to the database
- Messages are then pushed in real-time to the receiver via WebSocket

---

## 🔐 Auth APIs

### POST `/api/auth/register`
Register a new user
```json
{
  "username": "aditya",
  "email": "aditya@example.com",
  "password": "secure123"
}
```

### POST `/api/auth/login`
Login and get access/refresh token
```json
{
  "email": "aditya@example.com",
  "password": "secure123"
}
```

### GET `/api/auth/check-username?username=aditya`
Check if a username is available

---

## 👤 Profile APIs

### PATCH `/api/profile`
Update your profile (requires JWT)
```json
{
  "name": "Aditya Mahendra",
  "bio": "Mobile dev & tech enthusiast"
}
```

### PATCH `/api/profile/interests`
Update user's interests
```json
{
  "interests": ["coding", "startups", "flutter"]
}
```

---

## 📨 Messaging API

### POST `/api/sendMessage`
Sends a message — this only **publishes to RabbitMQ**

```json
{
  "receiverId": "abc123",
  "content": "Hello there!"
}
```

- The message will be processed by a **RabbitMQ consumer**
- Then stored in MongoDB
- Then pushed to the receiver via WebSocket

---

## 🚀 Run the App

```bash
npm install
npm run start:dev
```

Make sure MongoDB and RabbitMQ are running.

---

## 🧠 Tech Stack

- NestJS
- MongoDB (Mongoose)
- RabbitMQ
- Socket.IO (WebSocket)
- JWT Auth
- dotenv + ConfigService
