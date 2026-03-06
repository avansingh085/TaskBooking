# TaskBooking Backend

A Node.js backend API for a room booking system built with Express.js, MySQL, and JWT authentication.

## Features

- User registration and authentication
- Room management
- Booking system with availability checking
- JWT-based authentication with HTTP-only cookies

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt

## Prerequisites

- Node.js (v14 or higher)
- MySQL (v8 or higher)
- npm or yarn

## Local Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd TaskBooking/backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

```env
MYSQL_HOST_LOCAL=localhost
MYSQL_USER=your_mysql_username
MYSQL_PASS=your_mysql_password
MYSQL_DATABASE=taskbooking
JWT_SECRET=your_jwt_secret_key
```

### 4. Set Up MySQL Database

#### Option A: Using Docker (Recommended)

1. Ensure Docker and Docker Compose are installed.
2. From the root directory (TaskBooking), run:

```bash
docker-compose up 
```

This will start a MySQL container with the database initialized using `mysql-init/init.sql`.

#### Option B: Local MySQL Installation

1. Install MySQL on your system.
2. Create a database named `RoomBooking`.
3. Run the initialization script:

```sql
-- Run the contents of mysql-init/init.sql in your MySQL client
```

### 5. Run the Server

```bash
node server.js
```

The server will start on `http://localhost:5000`.

## API Documentation

Base URL: `http://localhost:5000/api`

### Authentication

Most endpoints require authentication. Include the JWT token in cookies (automatically handled by the frontend).

### Response Format

All responses follow this structure:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... } // or null
}
```

Error responses:

```json
{
  "success": false,
  "message": "Error message"
}
```

## Auth Endpoints

### POST /auth/register

Register a new user.

**Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "userId": 1
  }
}
```

### POST /auth/login

Login with email and password.

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful"
}
```

**Note:** Sets HTTP-only cookie with JWT token.

### POST /auth/logout

Logout the current user.

**Response:**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

**Note:** Clears the JWT cookie.

## User Endpoints

All user endpoints require authentication.

### GET /user/

Get current user information.

**Response:**
```json
{
  "success": true,
  "message": "User fetched successfully",
  "data": {
    "id": 1,
    "name": "string",
    "email": "string"
  }
}
```

### GET /user/:id

Get user information by ID.

**Parameters:**
- `id` (number): User ID

**Response:**
```json
{
  "success": true,
  "message": "User fetched successfully",
  "data": {
    "id": 1,
    "name": "string",
    "email": "string"
  }
}
```

### PUT /user/:id

Update user information.

**Parameters:**
- `id` (number): User ID

**Request Body:**
```json
{
  "name": "string",
  "email": "string"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User updated successfully"
}
```

### DELETE /user/:id

Delete a user.

**Parameters:**
- `id` (number): User ID

**Response:**
```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

## Room Endpoints

### POST /room/

Create a new room. Requires authentication.

**Request Body:**
```json
{
  "name": "string",
  "price_per_night": number
}
```

**Response:**
```json
{
  "success": true,
  "message": "Room created successfully",
  "data": {
    "roomId": 1
  }
}
```

### GET /room/

Get all rooms. No authentication required.

**Response:**
```json
{
  "success": true,
  "message": "Rooms fetched successfully",
  "data": [
    {
      "id": 1,
      "name": "string",
      "price_per_night": 100,
      "created_at": "2023-01-01T00:00:00.000Z"
    }
  ]
}
```

### GET /room/:id

Get room by ID. No authentication required.

**Parameters:**
- `id` (number): Room ID

**Response:**
```json
{
  "success": true,
  "message": "Room fetched successfully",
  "data": {
    "id": 1,
    "name": "string",
    "price_per_night": 100,
    "created_at": "2023-01-01T00:00:00.000Z"
  }
}
```

### PUT /room/:id

Update room. Requires authentication.

**Parameters:**
- `id` (number): Room ID

**Request Body:**
```json
{
  "name": "string",
  "price_per_night": number
}
```

**Response:**
```json
{
  "success": true,
  "message": "Room updated successfully"
}
```

### DELETE /room/:id

Delete room. Requires authentication.

**Parameters:**
- `id` (number): Room ID

**Response:**
```json
{
  "success": true,
  "message": "Room deleted successfully"
}
```

## Booking Endpoints

All booking endpoints require authentication.

### POST /booking/

Create a new booking.

**Request Body:**
```json
{
  "room_id": number,
  "start_date": "YYYY-MM-DD",
  "end_date": "YYYY-MM-DD"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Booking created successfully",
  "data": {
    "bookingId": 1
  }
}
```

### GET /booking/

Get all bookings for the current user.

**Response:**
```json
{
  "success": true,
  "message": "Bookings fetched successfully",
  "data": [
    {
      "id": 1,
      "user_id": 1,
      "room_id": 1,
      "start_date": "2023-01-01",
      "end_date": "2023-01-03",
      "created_at": "2023-01-01T00:00:00.000Z",
      "room_name": "string",
      "price": 100
    }
  ]
}
```

### GET /booking/check

Check room availability.

**Query Parameters:**
- `room_id` (number): Room ID
- `start_date` (string): Start date (YYYY-MM-DD)
- `end_date` (string): End date (YYYY-MM-DD)

**Response:**
```json
{
  "success": true,
  "message": "available" // or "unavailable"
}
```

### GET /booking/:id

Get booking by ID.

**Parameters:**
- `id` (number): Booking ID

**Response:**
```json
{
  "success": true,
  "message": "Booking fetched successfully",
  "data": {
    "id": 1,
    "user_id": 1,
    "room_id": 1,
    "start_date": "2023-01-01",
    "end_date": "2023-01-03",
    "created_at": "2023-01-01T00:00:00.000Z"
  }
}
```

### PUT /booking/:id

Update booking.

**Parameters:**
- `id` (number): Booking ID

**Request Body:**
```json
{
  "start_date": "YYYY-MM-DD",
  "end_date": "YYYY-MM-DD"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Booking updated successfully"
}
```

### DELETE /booking/:id

Delete booking.

**Parameters:**
- `id` (number): Booking ID

**Response:**
```json
{
  "success": true,
  "message": "Booking deleted successfully"
}
```

## Error Handling

The API uses consistent error responses. Common HTTP status codes:

- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `404`: Not Found
- `500`: Internal Server Error

## Development



## Docker

To run the entire stack with Docker:

```bash
docker-compose up
```
