# Virtual Event Management Platform

## Overview
This is a Node.js backend project for a Virtual Event Management Platform. The platform allows users to register, log in, and manage event registrations. It includes features for user authentication, event creation, and registration using in-memory data structures as well as MongoDB. The platform also supports secure user authentication via JWT, password hashing using bcrypt, and email notifications using nodemailer.

## Features
- **User Registration and Login**: Users can register, log in, and receive JWT for authentication.
- **Event Management**: Admin users can create, update, delete, and list events.
- **Event Registration**: Registered users can register for events, and both users and admins can view registrations.
- **Email Notification**: Users receive an email upon successful registration for an event.

## Project Structure
The project is organized into several key files:
- `app.js`: The entry point that sets up the application and connects to MongoDB.
- `routes/user.js`: Handles user registration, login, and retrieving registered events.
- `routes/event-management.js`: Handles event creation, updating, fetching, and deletion by admin users.
- `routes/participant-management.js`: Handles event registration for users.
- `models/user.js`: Mongoose schema for user data.
- `models/event.js`: Mongoose schema for event data.
- `middleware/validateJWT.js`: Middleware for validating JWTs for protected routes.

## Installation and Setup

### Prerequisites
- Node.js (v12 or later)
- MongoDB Atlas or local MongoDB
- npm

### Steps to Run the Project
1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd virtual-event-management
   ```
2. **Install Dependencies**
   ```bash
   npm install
   ```
3. **Environment Variables**
   Create a `.env` file in the root directory with the following variables:
   ```env
   PORT=3000
   MONGO=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<database>
   JWT_SECRET=your_jwt_secret
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_password
   ```
4. **Run the Server**
   ```bash
   npm start
   ```
   Or to use `nodemon` for development:
   ```bash
   npm run dev
   ```

## API Endpoints

### User Routes (`/api/v1/user`)
1. **POST `/register`**: Register a new user.
   - Request Body: `{ name, email, password, role }`
2. **POST `/login`**: Log in a user.
   - Request Body: `{ email, password }`
3. **GET `/events`**: Get all registered events for the logged-in user.
   - Protected route, requires JWT.

### Event Management Routes (`/api/v1/events`)
1. **POST `/create`**: Create a new event (admin only).
   - Request Body: `{ name, date, time, location, description }`
2. **PUT `/:id`**: Update an existing event by ID (admin only).
3. **GET `/`**: Fetch all events.
4. **DELETE `/:id`**: Delete an event by ID (admin only).

### Event Registration Routes (`/api/v1/user/event`)
1. **POST `/register/:id`**: Register a user for an event by event ID.
   - Sends an email notification upon successful registration.

## Middleware
- **validateJWT**: Ensures that the user is authenticated before accessing protected routes.
- **logger**: Logs incoming requests for easier debugging.
- **errorHandler**: Handles errors across the application.

## Models
### User Model (`user.js`)
- **Fields**:
  - `name`: User's name.
  - `email`: User's email (must be unique).
  - `password`: Hashed password.
  - `role`: Role of the user (`admin` or `user`).
  - `registeredEvents`: List of events the user is registered for.

### Event Model (`event.js`)
- **Fields**:
  - `name`: Event name.
  - `date`: Event date.
  - `time`: Event time.
  - `location`: Event location.
  - `description`: Description of the event.
  - `attendees`: List of users who have registered for the event.

## How to Use
- **Admins** can create, update, delete, and view all events.
- **Users** can register for events, view registered events, and receive email notifications.

## Technologies Used
- **Node.js & Express**: For building the RESTful API.
- **MongoDB & Mongoose**: For data storage and modeling.
- **bcrypt**: For hashing user passwords.
- **jsonwebtoken (JWT)**: For user authentication.
- **nodemailer**: For sending email notifications.

## Contact
For more information or questions, please contact:
- **Email**: abhishekmohan7171@gmail.com

