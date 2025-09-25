# Overview

This is a full-stack e-commerce web application for an online store, built with React for the frontend and Node.js/Express for the backend. The application allows users to browse devices, view product details, register/login, and includes an admin panel for managing products, brands, and device types. The system supports product categorization, pagination, image uploads, and user authentication with role-based access control.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 17 with Create React App
- **State Management**: MobX for reactive state management with two main stores (UserStore for authentication, DeviceStore for product data)
- **Routing**: React Router DOM for client-side navigation
- **UI Framework**: React Bootstrap for responsive design and pre-built components
- **HTTP Client**: Axios for API communication with interceptors for authentication
- **Authentication**: JWT token-based authentication stored in localStorage

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Database ORM**: Sequelize for PostgreSQL database operations
- **Authentication**: JWT tokens with bcrypt for password hashing
- **File Handling**: express-fileupload for image uploads with UUID-based file naming
- **API Structure**: RESTful API with modular route organization (users, devices, brands, types)
- **Error Handling**: Centralized error handling middleware with custom ApiError class
- **Authorization**: Role-based middleware for admin-only operations

## Database Design
- **ORM**: Sequelize with PostgreSQL
- **Key Models**: User, Device, Brand, Type, Basket, Rating, DeviceInfo
- **Relationships**: Many-to-many between types/brands, one-to-many for device associations
- **Authentication**: SSL-enabled PostgreSQL connection for production deployment

## Security & Authorization
- **Password Security**: bcrypt hashing with salt rounds
- **JWT Authentication**: 24-hour token expiration with role-based claims
- **Role-based Access**: Admin/User roles with middleware protection for admin routes
- **CORS**: Configured for cross-origin requests between client and server

# External Dependencies

## Frontend Dependencies
- **React Ecosystem**: react, react-dom, react-router-dom, react-bootstrap
- **State Management**: mobx, mobx-react-lite for reactive state management
- **HTTP Client**: axios for API requests
- **Authentication**: jwt-decode for token parsing
- **UI/Styling**: bootstrap, react-bootstrap for responsive components

## Backend Dependencies
- **Core Framework**: express for web server functionality
- **Database**: pg, pg-hstore, sequelize for PostgreSQL operations
- **Authentication**: bcrypt, jsonwebtoken for security
- **File Processing**: express-fileupload, uuid for image handling
- **Environment**: dotenv for configuration management
- **Development**: nodemon for development server auto-restart
- **Middleware**: cors for cross-origin requests

## External Services
- **Database**: PostgreSQL with SSL connection (likely cloud-hosted)
- **File Storage**: Local file system for uploaded device images
- **CDN/Static Assets**: Bootstrap CSS from MaxCDN for styling