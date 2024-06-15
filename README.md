# GymApp

GymApp is a mobile application designed to help users track their workouts and progress. It features user authentication, workout logging, and the ability to view workout history and progress pictures.

## Features

- User registration and login
- Authentication using JWT
- Add and view workout history
- View and upload progress pictures
- Location-based workout logging

## Tech Stack

- **Frontend:** React Native, Expo
- **Backend:** Flask, MongoDB
- **Authentication:** JWT
- **Geolocation:** Expo Location
- **File Storage:** Expo FileSystem

## Installation

### Prerequisites

- Node.js
- Expo CLI
- Python
- MongoDB




   
### Frontend Setup

    Clone the repository:

    
    git clone https://github.com/galinir6/gymapp_frontend.git

1. Install the Expo CLI if you haven't already:

    npm install -g expo-cli
   

2. Navigate to the frontend directory and install the dependencies:

    npm install
    

3. Start the Expo development server:

    npm start
    

## Configuration

### Backend

Update the following configurations in `backend/app.py`:

- `SECRET_KEY` for Flask
- `JWT_SECRET_KEY` for JWT
- MongoDB connection URL

### Frontend

Update the API endpoint URLs in `frontend`:

- Update the backend IP address and port in the axios requests within your React Native components.

## Usage

1. Register a new user via the Register screen.
2. Log in with the registered user credentials.
3. Add workouts with details and your current location.
4. View workout history on the Profile screen.
5. Upload and view progress pictures.


