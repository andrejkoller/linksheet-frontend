## Short description

A modern link-in-bio application that allows users to create customizable landing pages with multiple links – perfect for social media profiles, portfolios, and personal branding.

This is the frontend part of the application, built with React and TypeScript, connecting to a REST API backend.

## ✨ Features

- 🎨 Clean & Responsive UI - Beautiful interface that works on all devices
- 🔗 Link Management - Create, organize, and manage multiple links
- 🎯 Link Spaces - Group your links into different categories
- 👤 User Profiles - Customizable personal profile pages
- 🎭 Appearance Customization - Personalize your link page
- 🔐 Authentication - Secure user registration and login

## 🛠️ Technologies Used

- React 19 - Modern React with latest features
- TypeScript - Type-safe development
- Vite - Fast build tool and development server
- Chakra UI - Component library for consistent UI
- React Router - Client-side routing
- Axios - HTTP client for API calls
- React Toastify - Beautiful notifications
- React Icons - Icon library

## 📋 Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn
- Backend API running (default: `https://localhost:7187/api`)

## 📦 Installation

1. Clone the repository

```bash
git clone https://github.com/andrejkoller/linksheet-frontend.git
cd linksheet-frontend
```

2. Install dependencies

```bash
npm install
```

3. Configure API endpoint

Update the API base URL in `src/services/axios-instance.ts` if your backend runs on a different address:

```typescript
baseURL: "https://localhost:7187/api"; // Change this to your backend URL
```

4. Start development server

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

## 🔌 API Integration

The application communicates with a backend API through the axios instance configured in `src/services/axios-instance.ts`.

Key Features:

- Automatic JWT token injection from localStorage
- Automatic redirect to login on 401 (Unauthorized)
- Centralized error handling

Services:

- `auth-service.ts` - Authentication (login, register)
- `user-service.ts` - User management
- `link-service.ts` - Link CRUD operations
- `link-space-service.ts` - Link space management
- `faq-service.ts` - FAQ content

## 🌐 Routes

- `/` - Home page
- `/login` - User login
- `/register` - User registration
- `/templates` - Template gallery
- `/discover` - Discover other users
- `/learn` - Learning resources
- `/dashboard` - User dashboard (protected)
  - `/dashboard/` - Manage links
  - `/dashboard/appearance` - Customize appearance
  - `/dashboard/account` - Account settings
- `/dashboard/:username` - Public profile page

## 🔐 Authentication

The app uses JWT-based authentication:

1. User logs in via `/login`
2. JWT token is stored in localStorage
3. Token is automatically included in API requests
4. Protected routes redirect to login if token is missing/invalid

## 🔗 Related

- Backend Repository: [Linksheet API](https://github.com/andrejkoller/LinksheetAPI)

## 📸 Screenshots

<img width="1920" height="1080" alt="Screenshot 1" src="https://github.com/user-attachments/assets/137895fe-3069-4f86-b8f6-cfe40e5cbc47" />
<img width="1920" height="1080" alt="Screenshot 2" src="https://github.com/user-attachments/assets/e9ab962d-02be-42d7-abf8-78248e7f3103" />
<img width="1920" height="1080" alt="Screenshot 3" src="https://github.com/user-attachments/assets/01c10e18-d0ea-442d-a7a5-0528af6b4488" />
<img width="1920" height="1080" alt="Screenshot 4" src="https://github.com/user-attachments/assets/207beece-d22a-4b04-aaef-350a36aea516" />
<img width="1920" height="1080" alt="Screenshot 5" src="https://github.com/user-attachments/assets/d1163d7d-50d7-4afc-970b-36898ec64167" />
<img width="1920" height="1080" alt="Screenshot 6" src="https://github.com/user-attachments/assets/b79bed7a-2fe4-4ab3-89ec-820d50e0c30d" />
<img width="1920" height="1080" alt="Screenshot 7" src="https://github.com/user-attachments/assets/63588eb8-11b1-48d3-891b-261f95dfbba2" />
<img width="1920" height="1080" alt="Screenshot 8" src="https://github.com/user-attachments/assets/7c647b94-2072-44ae-b87f-1c3747a9a441" />
<img width="1920" height="1080" alt="Screenshot 9" src="https://github.com/user-attachments/assets/82598bb2-dab8-4aec-96c3-7ef66df5c36b" />
<img width="1920" height="1080" alt="Screenshot 10" src="https://github.com/user-attachments/assets/767b342d-1e03-455a-a8d8-73b74524a1f9" />
<img width="1920" height="1080" alt="Screenshot 11" src="https://github.com/user-attachments/assets/b8b8bab2-cad5-4c37-8a1f-9eefa78781af" />
<img width="1920" height="1080" alt="Screenshot 12" src="https://github.com/user-attachments/assets/c5985dfc-7179-4d4e-bae7-58fa1b3588a8" />
