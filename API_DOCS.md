# API Documentation

## Base URL
`/api`

## Authentication

### `POST /api/auth/register`
Register a new user (admin or standard user).
- **Body:** `{ name, email, password, role }`

### `POST /api/auth/login`
Authenticate a user and get a JWT.
- **Body:** `{ email, password }`

### `GET /api/auth/me`
Get current logged in user details.
- **Headers:** `Authorization: Bearer <token>`

---

## Services

### `GET /api/services`
Get all services. (Public)

### `GET /api/services/:id`
Get a single service by ID. (Public)

### `POST /api/services`
Create a new service. (Private)
- **Headers:** `Authorization: Bearer <token>`
- **Body:** `{ title, description, features, benefits, icon }`

### `PUT /api/services/:id`
Update an existing service. (Private)
- **Headers:** `Authorization: Bearer <token>`

### `DELETE /api/services/:id`
Delete a service. (Private)
- **Headers:** `Authorization: Bearer <token>`

*(Note: Similar CRUD endpoints exist for Portfolio, Blogs, Careers, and Contact if fully implemented in the routes directory based on the provided Mongoose Models.)*
