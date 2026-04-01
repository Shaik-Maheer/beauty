# Stylistar - Premium Beauty E-Commerce

Stylistar is a full-stack, Nykaa-inspired luxury beauty e-commerce application. It features a modern, ultra-premium UI, robust shopping cart functionality, wishlist capabilities, and secure user authentication.

## 🛠 Tech Stack
-   **Frontend:** React 19 (Vite), Tailwind CSS v4, Framer Motion, AOS (Animate on Scroll), React Router v7
-   **Backend:** Node.js, Express.js
-   **Database:** MongoDB via Mongoose
-   **Authentication:** JWT (JSON Web Tokens), bcrypt for password hashing
-   **Email Services:** Nodemailer (For "Forgot Password" flow)

## ✨ Features
-   **Luxurious UI/UX:** Built with Tailwind CSS, featuring glassmorphism, smooth animations, hover state scaling, and a unified `#ff3f6c` pink brand scheme.
-   **Catalog & Shopping:** Interactive product cards with quick-add functionality, wishlisting, and detailed product views.
-   **User Authentication:** Secure login, registration, and password recovery via email.
-   **Cart & Wishlist Logic:** Cloud-synced cart that handles quantity incrementing and duplicate prevention.
-   **Fully Responsive:** Beautifully structured mobile-first dropdown menus, and grid structures.

## 🚀 Local Development Setup

### 1. Clone & Install Dependencies
First, clone the repository and install the Node modules for both the frontend and the backend.

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../stylistar
npm install
```

### 2. Environment Configuration
The application requires an environment file to connect to your MongoDB database and email service.

1. Navigate to the `backend` directory.
2. Create a file named `.env` and copy the configuration from `.env.example`.
3. Fill in your personal MongoDB URI and Gmail App Passwords. **(Never commit real `.env` files!)**

### 3. Run the Servers
You will need two terminal windows to run both ends locally.

**Terminal 1 (Backend):**
```bash
cd backend
node server.js
# The backend runs on http://localhost:5000
```

**Terminal 2 (Frontend):**
```bash
cd stylistar
npm run dev
# The frontend runs on http://localhost:5173
```
