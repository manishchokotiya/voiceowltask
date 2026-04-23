# 📘 Conversation Service API

## 🚀 Overview

This is a backend service built using **NestJS + MongoDB** to manage conversation sessions and their events.

The system is designed to be:

* Idempotent
* Concurrent-safe
* Scalable
* Cleanly structured

---

## 🛠️ Tech Stack

* **Framework:** NestJS (TypeScript)
* **Database:** MongoDB (Mongoose)
* **Validation:** class-validator
* **Documentation:** Swagger
* **Config:** @nestjs/config (.env)

---

## 📁 Project Structure

```
src/
 ├── modules/
 │    ├── session/
 │    │    ├── controller
 │    │    ├── service
 │    │    ├── repository
 │    │    ├── dto
 │    │
 │    ├── event/
 │         ├── schema
```

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```
git clone https://github.com/manishchokotiya/voiceowltask
cd voiceowltask
```

---

### 2. Install dependencies

```
npm install
```

---

### 3. Setup environment variables

Create a `.env` file in root:

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/conversation

```

---

### 4. Run the application

```
npm run start:dev
```

---

## 📚 API Documentation (Swagger)

Open in browser:

```
http://localhost:3000/api
```

---

## 📌 API Endpoints

---

### 🔹 1. Create / Get Session

**POST /sessions**

* Creates a session if it does not exist
* Returns existing session if already present

#### Example Request:

```json
{
  "sessionId": "abc123",
  "status": "initiated",
  "language": "en"
}
```

---

### 🔹 2. Add Event

**POST /sessions/:sessionId/events**

* Adds an event to a session
* Ensures event uniqueness

#### Example Request:

```json
{
  "eventId": "e1",
  "type": "user_speech",
  "payload": {
    "text": "Hello"
  }
}
```

---

### 🔹 3. Get Session with Events

**GET /sessions/:sessionId?page=1&limit=10**

* Returns session details
* Returns paginated events sorted by timestamp

---

### 🔹 4. Complete Session

**POST /sessions/:sessionId/complete**

* Marks session as completed
* Sets `endedAt`
* Idempotent operation

---

## 🔁 Key Features

### ✅ Idempotency

* Upsert for session creation
* Unique index for events
* Conditional update for completion

---

### ⚡ Concurrency Safety

* Atomic MongoDB operations
* Unique indexes prevent duplicates

---

### 📊 Pagination

* Implemented using `skip + limit`
* Returns total count and metadata

---

### 📌 Indexing

* `sessionId` → unique
* `(sessionId + eventId)` → unique
* `(sessionId + timestamp)` → optimized queries

---

## ⚠️ Assumptions

* No authentication required
* Events are immutable
* Single MongoDB instance used

---

## 🚫 Out of Scope

* Authentication & Authorization
* Rate limiting
* Real-time communication
* Message queues

---

## 📈 Future Improvements

* Add Redis caching
* MongoDB sharding
* Read replicas
* Cursor-based pagination

---

## 👨‍💻 Author

Manish

---
