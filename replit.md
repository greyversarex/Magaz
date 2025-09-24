# Online Store - E-commerce Application

## Overview
This is a full-stack e-commerce application built with React (frontend) and Node.js/Express (backend), using PostgreSQL database. The application allows users to browse products, manage authentication, and includes admin functionality for managing products, brands, and types.

## Project Architecture
- **Frontend**: React 17 with Bootstrap, MobX state management, running on port 5000
- **Backend**: Node.js with Express, Sequelize ORM, running on port 3001  
- **Database**: PostgreSQL with Replit's built-in database integration
- **Authentication**: JWT-based authentication system

## Recent Changes (September 24, 2025)
- Successfully imported from GitHub repository
- Set up PostgreSQL database with all required tables (users, products, baskets, etc.)
- Configured React frontend with legacy OpenSSL provider for Node.js 20 compatibility
- Set up proper environment variables for both development and production
- Configured deployment settings for Replit's autoscale platform
- Both frontend and backend are fully functional and communicating

## Environment Configuration
### Development
- Frontend: React development server on port 5000 with proxy settings
- Backend: Express server on port 3001 with hot reload via nodemon
- Database: PostgreSQL via Replit database integration

### Production  
- Built React app served statically on port 5000
- Express API server on port 3001
- Autoscale deployment configuration ready

## User Preferences
- Uses existing project structure and conventions
- Maintains original Sequelize database models
- Preserves Russian/Cyrillic comments in codebase
- Follows Bootstrap styling patterns established in the project

## Key Features
- Product browsing and search
- User authentication (registration/login)
- Shopping cart functionality  
- Admin panel for product management
- File upload for product images
- Rating system
- Brand and category management

## Database Schema
The application uses the following main entities:
- Users (authentication, roles)
- Devices (products with pricing, images, ratings)
- Types (product categories)
- Brands (product manufacturers)
- Baskets (shopping carts)
- Ratings (user product reviews)
- Device Info (product specifications)

## Status
✅ Project fully set up and functional in Replit environment
✅ Development workflows configured and running
✅ Database connected and synchronized
✅ Frontend-backend communication working
✅ Deployment configuration complete
✅ Ready for development and production use