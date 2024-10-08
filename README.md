# Exploding Kitten

## Overview

Exploding Kitten is an engaging online single-player card game where players navigate through various challenges using four unique card types: Cat cards, Defuse cards, Shuffle cards, and Exploding Kitten cards. Players can create usernames, compete for high scores, and view their performance on a leaderboard.

### Deployed Application

You can play the game at: [Exploding Kitten](https://exploding-kitten-pearl.vercel.app/)

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Running the Project Locally](#running-the-project-locally)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)

## Features

- **User Authentication**: Users can create and log in with unique usernames.
- **Card Mechanics**: Four different types of cards for diverse gameplay.
- **Leaderboard**: View high scores and track player performance.
- **Responsive Design**: Works on various devices for accessibility.

## Technologies Used

- **Frontend**: React, Redux
- **Backend**: Go
- **Database**: Redis
- **Deployment**: Vercel

## Installation

### Prerequisites

Before running the project locally, ensure you have the following installed:

- **Node.js** (version 14 or higher)
- **Go** (version 1.20 or higher)
- **Redis** (for local testing)

### Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/arnab7070/exploding-kitten.git
   cd exploding-kitten
   ```

2. **Navigate to Frontend**

   ```bash
   cd frontend
   ```

3. **Install Dependencies**

   Using npm:

   ```bash
   npm install
   ```

   Or using yarn:

   ```bash
   yarn install
   ```

4. **Set Up Environment Variables**

   Create a `.env` file in the backend directory and set the required environment variables:

   ```plaintext
   REDIS_URI=your_redis_uri
   APP_PORT=8080
   ```

5. **Start the Backend Server**

   Navigate to the backend directory and run:

   ```bash
   cd backend
   go run api/index.go
   ```

6. **Start the Frontend Application**

   Navigate back to the frontend directory and run:

   ```bash
   cd frontend
   npm start
   ```

   The application should now be running on `http://localhost:3000`.

## Running the Project Locally

To run the project locally, ensure both the backend and frontend servers are running as described above. Access the game by navigating to `http://localhost:3000` in your web browser.

## API Documentation

The backend API provides the following endpoints:

1. **GET /api/leaderboard**
   - Retrieves the current leaderboard entries.

2. **POST /api/score**
   - Updates the score for a user.
   - Request Body: 
     ```json
     {
       "username": "user1",
       "points": 100
     }
     ```

3. **POST /api/save**
   - Saves the current game state for a user.
   - Request Body:
     ```json
     {
       "username": "user1",
       "gameState": { ... }
     }
     ```

4. **GET /api/load**
   - Loads the saved game state for a user.
   - Query Parameter: `username`

5. **GET /api/health**
   - Checks the health status of the backend server.

## Contributing

Contributions are welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and push them to your branch.
4. Submit a pull request for review.


---

Feel free to customize any sections to better fit your project's specifics or personal preferences!