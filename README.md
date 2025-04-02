## Overview

CleanUp is a comprehensive platform designed to manage community cleanup reports and tasks. It features user authentication, report submission, task management, route optimization, and real-time notifications. This project uses Firebase as the backend and Next.js for the frontend.

The application allows residents to report issues in their community, officials to manage these reports and assign tasks to workers, and workers to complete assigned tasks efficiently with route optimization.

## Features

- **User Authentication**: 
  - Email/password and Google sign-in
  - Secure authentication flow
  
- **Role-based Access Control**: 
  - Residents: Can submit and track reports
  - Workers: Can view and complete assigned tasks
  - Officials: Can manage reports, tasks, and users
  
- **Report Management**: 
  - Submit reports with location and images
  - Track report status (pending, in progress, resolved)
  - Filter and search reports
  
- **Task Assignment**: 
  - Create tasks from reports
  - Assign tasks to workers
  - Set priority and due dates
  - Track task progress
  
- **Route Optimization**: 
  - Optimize routes for workers using Google Maps API
  - Calculate the most efficient path between multiple locations
  - View optimized routes on a map
  
- **Real-time Notifications**: 
  - Instant updates on report status changes
  - Task assignment notifications
  - Task completion notifications
  
- **Responsive UI**: 
  - Works on desktop and mobile devices
  - Intuitive user interface
  - Accessible design

## Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Firebase account
- Google Maps API key
- Git

## Project Setup

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/CleanUp.git
cd CleanUp

### 2. Install Dependencies
npm install
# or
yarn install

### 3. FireBase Setup
- Create a FireBase project
- Set up Firebase authentication
- Set up Firestore Database
- Set up Firebase storage
- Register Web App

### 4. Set Up environmental variables with your firebase configuration
- create a env file and put your firebase configuration in it

### 5. Deploy Firebase Security rules
npm install -g firebase-tools
firebase login
firebase init
firebase deploy --only firestore:rules, storage:rules

### 6. Deploy Firebase Functions
firebase deploy --only functions

### 7. Run the Development Server
npm run dev 
# or
yarn dev

### Open localhost in your browser to see the application