# CleanUp

## Overview

CleanUp is a comprehensive platform designed to manage community cleanup reports and tasks. It features user authentication, report submission, task management, route optimization, and real-time notifications. The platform utilizes Firebase as the backend and Next.js for the frontend.

The application allows residents to report issues in their community, officials to manage these reports and assign tasks to workers, and workers to complete assigned tasks efficiently with route optimization.

## Features

### User Authentication
- Email/password and Google sign-in
- Secure authentication flow

### Role-Based Access Control
- **Residents**: Can submit and track reports
- **Workers**: Can view and complete assigned tasks
- **Officials**: Can manage reports, tasks, and users

### Report Management
- Submit reports with location and images
- Track report status (pending, in progress, resolved)
- Filter and search reports

### Task Assignment
- Create tasks from reports
- Assign tasks to workers
- Set priority and due dates
- Track task progress

### Route Optimization
- Optimize routes for workers using Google Maps API
- Calculate the most efficient path between multiple locations
- View optimized routes on a map

### Real-Time Notifications
- Instant updates on report status changes
- Task assignment notifications
- Task completion notifications

### Responsive UI
- Works on desktop and mobile devices
- Intuitive user interface
- Accessible design

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or later)
- **npm** or **yarn**
- **Firebase account**
- **Google Maps API key**
- **Git**

## Project Setup

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/CleanUp.git
cd CleanUp
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Firebase Setup
- Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
- Set up Firebase Authentication
- Set up Firestore Database
- Set up Firebase Storage
- Register a Web App in Firebase

### 4. Set Up Environment Variables
- Create a `.env.local` file in the root directory.
- Add your Firebase configuration details:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

### 5. Deploy Firebase Security Rules
```bash
npm install -g firebase-tools
firebase login
firebase init
firebase deploy --only firestore:rules, storage:rules
```

### 6. Deploy Firebase Functions (If Using Cloud Functions)
```bash
firebase deploy --only functions
```

### 7. Run the Development Server
```bash
npm run dev
# or
yarn dev
```

### 8. Open the Application
- Open [http://localhost:3000](http://localhost:3000) in your browser to see the application in action.

## Deployment

You can deploy CleanUp using Vercel, Firebase Hosting, or any other hosting provider of your choice. If deploying to **Vercel**, run:
```bash
vercel
```
Follow the prompts to complete the deployment process.

## Contributing

Contributions are welcome! If you'd like to contribute:
- Fork the repository
- Create a new branch (`git checkout -b feature-branch`)
- Make your changes and commit them (`git commit -m 'Added new feature'`)
- Push the changes (`git push origin feature-branch`)
- Create a pull request

## License

This project is licensed under the **MIT License**.

## Contact
For any questions or suggestions, feel free to open an issue or contact j.nformi1@alustudent.com.

Happy coding! 🚀

