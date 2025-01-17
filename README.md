# GreenCircuit: E-Waste Management System

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction
GreenCircuit is an innovative e-waste management system designed to promote sustainable handling, recycling, and disposal of electronic waste. This project aims to streamline the e-waste management process by connecting individuals, recycling centers, and companies in an organized and efficient way.

## Features
- **User Registration and Authentication**: Secure registration and login for users.
- **E-Waste Listings**: Users can add, view, and manage e-waste items for disposal or recycling.
- **Recycling Center Integration**: Seamless communication with certified recycling centers.
- **Real-Time Updates**: Track the status of submitted e-waste items.
- **Analytics Dashboard**: Insights into e-waste contributions and environmental impact.
- **Multi-Language Support**: Accessible to users across different regions.

## Technologies Used
- **Frontend**: React.js, Tailwind CSS
- **Database**: Appwrite
- **Authentication**: JWT (JSON Web Tokens)

## Installation
To run the project locally, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yogeshgosavii/GreenCircuit.git
   cd GreenCircuit
   ```

2. **Install Dependencies**:
   Navigate to both the backend and frontend directories to install required packages:
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the backend directory and add the necessary configuration:
   ```
   PORT=5000
   APPWRITE_ENDPOINT=your_appwrite_endpoint
   APPWRITE_PROJECT_ID=your_project_id
   APPWRITE_API_KEY=your_api_key
   JWT_SECRET=your_secret_key
   ```

4. **Run the Project**:
   Start the backend and frontend servers:
   ```bash
   # Start backend server
   cd backend
   npm start

   # Start frontend server
   cd ../frontend
   npm start
   ```

5. **Access the Application**:
   Open your browser and navigate to `http://localhost:3000` for the frontend interface.

## Usage
1. **Sign Up**: Create a new account or log in with your existing credentials.
2. **List E-Waste**: Add electronic items you wish to recycle or dispose of.
3. **Track Status**: Monitor the progress of your submissions.
4. **View History**: Check your contribution towards reducing e-waste.

## Contributing
Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Create a Pull Request.



