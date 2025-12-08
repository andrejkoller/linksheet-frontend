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
