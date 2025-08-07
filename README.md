# Awesome Shop – Web Development Final Project

Awesome Shop is a modern e-commerce web application built with React and TypeScript. It demonstrates a complete shopping experience, including authentication, product browsing, cart management, and admin features. This project is designed as a comprehensive showcase of web development skills.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Screenshots](#screenshots)
- [Credits](#credits)

---

## Overview

Awesome Shop allows users to browse products, add them to a cart, manage their profile, and (for admins) manage the product catalog. The app uses React Context for state management, SCSS for styling, and includes responsive design for all devices.

---

## Features

### Authentication
- Users can register and log in.
- Authentication state is managed globally.
- Displays clear messages for login success or failure.
- Authentication is implemented via sessionStorage so that closing browser tab will log user out but refreshing is fine. (The Shop is really secure :) ) 

### Product Catalog
- Browse a list of products with prices and sale indicators.
- View detailed information for each product, including stock and description.
- Clear visual indecator for products that are out of stok.
- Users can brows the shop but need to login to be able to add products to cart and this flow will be prompted to user via tooltips and other visual indecators.

### Shopping Cart
- Add products to the cart from the product list or detail page.
- Edit product quantities or remove items directly from the cart.
- Cart total is calculated automatically and updates in real time.

### Order Finalization
- Users can proceed to finalize their order (currently navigates to a "Coming Soon" page).

### Profile Management
- Users can view and update their profile information.
- Address management is available for users.

### Admin Panel
- Admin users can add, edit, or delete products.
- Admin-only routes are protected and hidden from regular users.

### Protected Routes
- Certain pages (profile, admin) are only accessible to logged-in users.

### Responsive Design
- The application is fully responsive and works well on mobile, tablet, and desktop devices.

### Notifications
- Success and error notifications are displayed using `react-toastify` for a better user experience.

---

## Tech Stack

- **Frontend:** React, TypeScript, SCSS
- **Routing:** React Router
- **State Management:** React Context API
- **API Calls:** Fetch/Axios
- **Icons:** React Icons
- **Notifications:** react-toastify
- **Build Tool:** Vite

---

## Project Structure

```
src/
  components/         # Reusable UI components (AuthCard, ProductCard, etc.)
  contexts/           # Context providers (AuthContext, etc.)
  models/             # TypeScript models and types
  pages/              # Main page components (CartPage, AuthPage, etc.)
  styles/             # SCSS stylesheets
  assets/             # Static assets (images, data)
  main.tsx            # App entry point
  App.tsx             # Main app component
```

---

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open in your browser:**
   Visit [http://localhost:3000](http://localhost:3000) (or the port shown in your terminal).

> **Note:** Ensure your backend API is running and accessible at the expected endpoints.


---

## Credits

- Developed by AmirHossein
- For educational purposes

---

## License

This project is for educational purposes
