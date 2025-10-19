# Quick Start Guide

## Prerequisites

- Docker & Docker Compose
- Node.js 18+ (for local frontend development)
- Python 3.11+ (for local backend development)

## Option 1: Full Docker Setup (Recommended)

1. **Clone and setup**

   ```bash
   cd TripPlanner-v1
   cp .env.example .env
   ```

2. **Start all services**

   ```bash
   docker-compose up -d
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Docs: http://localhost:8000/docs

## Option 2: Local Development

1. **Start database services**

   ```bash
   docker-compose up -d postgres redis
   ```

2. **Backend setup**

   ```bash
   cd backend
   pip install -r requirements.txt
   uvicorn main:app --reload
   ```

3. **Frontend setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## Testing the API

1. **Create a user** (POST /api/v1/users/)
2. **Login** to get JWT token
3. **Create a trip** (POST /api/v1/trips/)
4. **Get recommendations** (GET /api/v1/recommendations/attractions)

## Next Steps (Week 2)

- Implement trip generation logic
- Add itinerary day management
- Integrate with external APIs for attractions
- Add user authentication to frontend
