# TaskBooking Frontend

A modern React application for room booking management, built with Vite, Redux Toolkit, and Tailwind CSS.

## Tech Stack

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **ESLint** - Code linting

## Features

- User authentication (login/register)
- Room browsing and booking
- Booking management (view, update, cancel)
- Responsive design with Tailwind CSS
- Protected routes
- API integration with backend

## Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository and navigate to the frontend directory:
   ```bash
   git clone https://github.com/avansingh085/TaskBooking.git
   cd frontend

   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Environment Setup

Create a `.env` file in the frontend root directory:

```env
VITE_BACKEND_ENDPOINT=http://localhost:5000/api
```

This sets the base URL for API calls. If running with Docker, use:
```env
VITE_BACKEND_ENDPOINT=http://backend:5000/api
```

## Development

### Running Locally

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Running with Docker

From the project root directory:

```bash
docker-compose up frontend
```

The frontend will be available at [http://localhost:5173](http://localhost:5173).

## Building for Production

1. Build the application:
   ```bash
   npm run build
   ```

2. Preview the production build:
   ```bash
   npm run preview
   ```

The built files will be in the `dist` directory.

## Code Quality

Run ESLint to check for code issues:
```bash
npm run lint
```

## Project Structure

```
src/
├── api/           # API client and service functions
├── app/           # Redux store configuration
├── components/    # Reusable UI components
├── features/      # Redux slices and feature-specific logic
├── pages/         # Page components
├── utils/         # Utility functions
└── main.jsx       # Application entry point
```

## API Integration

The frontend communicates with the backend via REST API endpoints:
- Authentication: `/auth`
- Bookings: `/booking`
- Rooms: `/room`
- Users: `/user`

All API calls are handled through the `apiClient` configured in `src/api/apiClient.js`.

## Contributing

1. Follow the existing code style
2. Run linting before committing
3. Test your changes thoroughly
4. Update documentation as needed
