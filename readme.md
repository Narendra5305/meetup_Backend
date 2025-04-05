


# meetup Management API (Node.js + Express)

This backend service provides user authentication, group management, and event handling functionality using Node.js, Express.js, MongoDB, and Passport.js for Google OAuth.

---



## 📦 Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT, Google OAuth via Passport.js
- **Security:** bcrypt for password hashing
- **Middleware:** Custom auth middleware

---

## 🚀 Features

- User Sign-up / Sign-in
- Google OAuth Authentication
- Group Creation, Joining, Updating, Deleting
- Event Creation, Joining, Updating, Deleting (with group association)
- Auth-protected routes using JWT tokens

---

## 📂 Folder Structure (Relevant)

```
- /routes
    - userRouter.js
    - groupRouter.js
    - eventRouter.js
- /controllers
    - userController.js
    - groupController.js
    - eventController.js
- /middleware
    - auth.js
- /models
    - userModel.js
    - groupModel.js
    - eventModel.js
- /config
    - passport.js
```

---

## 🛡️ Authentication

All protected routes require a JWT token in the `Authorization` header:

```
Authorization: Bearer <token>
```

---

## 📘 API Documentation

### 👤 User Routes

| Method | Endpoint             | Description                     | Auth |
|--------|----------------------|---------------------------------|------|
| GET    | /google              | Google OAuth login              | No   |
| GET    | /google/callback     | Google OAuth callback           | No   |
| POST   | /signin              | Login using email & password    | No   |
| POST   | /signup              | Register a new user             | No   |

---

### 👥 Group Routes

| Method | Endpoint            | Description                        | Auth |
|--------|---------------------|------------------------------------|------|
| GET    | /group/             | Get all groups                     | No   |
| GET    | /group/:id          | Get group details by ID            | Yes  |
| POST   | /group/             | Create a new group                 | Yes  |
| PATCH  | /group/join/:id     | Join a group by ID                 | Yes  |
| PATCH  | /group/:id          | Update group (only by organizer)  | Yes  |
| DELETE | /group/:id          | Delete group (only by organizer)  | Yes  |

---

### 📅 Event Routes

| Method | Endpoint               | Description                        | Auth |
|--------|------------------------|------------------------------------|------|
| GET    | /event/                | Get all events                     | No   |
| GET    | /event/:id             | Get event details by ID            | Yes  |
| POST   | /event/:id             | Add event under a group ID         | Yes  |
| POST   | /event/joinAttendees/:id | Join attendees of event          | Yes  |
| PATCH  | /event/:id             | Update event (only by organizer)   | Yes  |
| PATCH  | /event/:id             | Delete event (only by organizer)   | Yes  |

---

## 🔐 JWT Payload

```json
{
  "id": "user_id"
}
```

---

## ⚙️ Environment Variables (.env)

```env
PORT=5000
JWT_SECRET=your_jwt_secret_key
MONGO_URI=your_mongodb_uri
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

---

## 🧪 Sample Request Headers

```http
Authorization: Bearer <your_jwt_token>
Content-Type: application/json
```

---

## 🍪 Google OAuth Login

Redirects to:

```
http://localhost:5173/
```

after successful login via Google.

---

## 📌 Notes

- Ensure MongoDB is connected before starting the server.
- The `/event/:id` POST route creates an event under the specified group.
- The user making requests must be authenticated and authorized (e.g., only group organizer can update/delete).

---

## 📃 License

This project is open-source and available under the [MIT License](LICENSE).

