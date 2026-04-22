# 📘 DESIGN ANSWERS

## 1. How did you ensure idempotency?

* For **Create Session**, I used MongoDB `findOneAndUpdate` with `upsert` and `$setOnInsert`. This ensures that repeated requests with the same `sessionId` always return the same session instead of creating duplicates.
* For **Add Event**, I created a **unique index on (sessionId, eventId)**. If the same request is retried, MongoDB prevents duplicate insertion and I return the existing event.
* For **Complete Session**, I used a conditional update (`status != completed`) so that `endedAt` is set only once and repeated calls do not modify the data.

---

## 2. How does your design behave under concurrent requests?

* All critical operations use **atomic MongoDB queries** like `findOneAndUpdate` with `upsert`.
* **Unique indexes** act as a safety layer to prevent duplicate data when multiple requests hit simultaneously.
* In rare race conditions, duplicate key errors are handled gracefully by fetching existing records.
* This ensures the system remains consistent without requiring application-level locks.

---

## 3. What MongoDB indexes did you choose and why?

* `{ sessionId: 1 } (unique)`
  → Ensures only one session exists per `sessionId`.

* `{ sessionId: 1, eventId: 1 } (unique)`
  → Ensures each event is unique within a session and supports idempotency.

* `{ sessionId: 1, timestamp: 1 }`
  → Optimizes querying events in sorted order and improves pagination performance.

---

## 4. How would you scale this system for millions of sessions per day?

* Use **pagination (skip + limit)** to avoid loading large datasets into memory.
* Apply **MongoDB sharding based on sessionId** to distribute data across multiple nodes.
* Use **read replicas** to handle high read traffic.
* Add a **caching layer (e.g., Redis)** for frequently accessed sessions.
* Deploy multiple instances of the service behind a load balancer for horizontal scaling.

---

## 5. What did you intentionally keep out of scope, and why?

* **Authentication & Authorization** → Not required for this assignment’s core functionality.
* **Rate limiting** → Can be handled at API gateway level if needed.
* **Real-time communication (WebSockets)** → Not necessary for current requirements.
* **Message queues (Kafka, RabbitMQ)** → Avoided to keep the system simple and focused on core APIs.
