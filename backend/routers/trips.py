from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from datetime import timedelta
import uuid

from database import get_db
from models import User, Trip, ItineraryDay
from schemas import Trip as TripSchema, TripCreate, TripUpdate, ItineraryDay as ItineraryDaySchema
from auth import get_current_user

router = APIRouter()

@router.post("/", response_model=TripSchema)
def create_trip(
    trip: TripCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    db_trip = Trip(
        **trip.dict(),
        owner_id=current_user.id,
        share_token=str(uuid.uuid4())
    )
    db.add(db_trip)
    db.commit()
    db.refresh(db_trip)
    return db_trip

@router.get("/", response_model=List[TripSchema])
def read_trips(
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    trips = db.query(Trip).filter(Trip.owner_id == current_user.id).offset(skip).limit(limit).all()
    return trips

@router.get("/{trip_id}", response_model=TripSchema)
def read_trip(
    trip_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    trip = db.query(Trip).filter(Trip.id == trip_id, Trip.owner_id == current_user.id).first()
    if trip is None:
        raise HTTPException(status_code=404, detail="Trip not found")
    return trip

@router.put("/{trip_id}", response_model=TripSchema)
def update_trip(
    trip_id: int,
    trip_update: TripUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    trip = db.query(Trip).filter(Trip.id == trip_id, Trip.owner_id == current_user.id).first()
    if trip is None:
        raise HTTPException(status_code=404, detail="Trip not found")
    
    for field, value in trip_update.dict(exclude_unset=True).items():
        setattr(trip, field, value)
    
    db.commit()
    db.refresh(trip)
    return trip

@router.delete("/{trip_id}")
def delete_trip(
    trip_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    trip = db.query(Trip).filter(Trip.id == trip_id, Trip.owner_id == current_user.id).first()
    if trip is None:
        raise HTTPException(status_code=404, detail="Trip not found")
    
    db.delete(trip)
    db.commit()
    return {"message": "Trip deleted successfully"}

@router.get("/{trip_id}/itinerary", response_model=List[ItineraryDaySchema])
def get_trip_itinerary(
    trip_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    trip = db.query(Trip).filter(Trip.id == trip_id, Trip.owner_id == current_user.id).first()
    if trip is None:
        raise HTTPException(status_code=404, detail="Trip not found")
    
    itinerary = db.query(ItineraryDay).filter(ItineraryDay.trip_id == trip_id).order_by(ItineraryDay.day_number).all()
    return itinerary

@router.post("/{trip_id}/generate")
def generate_itinerary(
    trip_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    trip = db.query(Trip).filter(Trip.id == trip_id, Trip.owner_id == current_user.id).first()
    if trip is None:
        raise HTTPException(status_code=404, detail="Trip not found")
    
    # Clear existing itinerary
    db.query(ItineraryDay).filter(ItineraryDay.trip_id == trip_id).delete()
    
    # Generate basic itinerary based on trip duration
    start_date = trip.start_date
    end_date = trip.end_date
    duration = (end_date - start_date).days
    
    # Create sample itinerary days
    for day_num in range(1, duration + 1):
        current_date = start_date + timedelta(days=day_num - 1)
        
        # Generate basic activities based on interests
        activities = generate_daily_activities(trip.interests, trip.destination, day_num)
        
        itinerary_day = ItineraryDay(
            trip_id=trip_id,
            day_number=day_num,
            date=current_date,
            title=f"Day {day_num} in {trip.destination}",
            description=f"Explore {trip.destination} - Day {day_num}",
            activities=activities,
            estimated_cost=trip.budget / duration if trip.budget else 100
        )
        
        db.add(itinerary_day)
    
    # Update trip status
    trip.status = "planning"
    db.commit()
    
    return {"message": "Itinerary generated successfully", "trip_id": trip_id, "days": duration}

def generate_daily_activities(interests: list, destination: str, day_number: int):
    """Generate sample activities based on interests and destination"""
    
    # Sample activity templates
    activity_templates = {
        'culture': [
            {"name": f"Visit {destination} Museum", "type": "museum", "duration": "2-3 hours"},
            {"name": f"Historical {destination} Walking Tour", "type": "tour", "duration": "3 hours"},
            {"name": f"Local Cultural Center", "type": "cultural", "duration": "1-2 hours"}
        ],
        'food': [
            {"name": f"Traditional {destination} Breakfast", "type": "dining", "duration": "1 hour"},
            {"name": f"Local Market Food Tour", "type": "food_tour", "duration": "2 hours"},
            {"name": f"Cooking Class", "type": "activity", "duration": "3 hours"}
        ],
        'nature': [
            {"name": f"{destination} Park Visit", "type": "outdoor", "duration": "2-3 hours"},
            {"name": f"Nature Walk", "type": "outdoor", "duration": "1-2 hours"},
            {"name": f"Scenic Viewpoint", "type": "sightseeing", "duration": "1 hour"}
        ],
        'art': [
            {"name": f"{destination} Art Gallery", "type": "gallery", "duration": "2 hours"},
            {"name": f"Street Art Tour", "type": "tour", "duration": "2 hours"},
            {"name": f"Local Artist Workshop", "type": "workshop", "duration": "3 hours"}
        ]
    }
    
    # Default activities for any destination
    default_activities = [
        {"name": f"Explore {destination} City Center", "type": "sightseeing", "duration": "2-3 hours"},
        {"name": f"Local Restaurant Lunch", "type": "dining", "duration": "1 hour"},
        {"name": f"{destination} Shopping District", "type": "shopping", "duration": "1-2 hours"}
    ]
    
    # Select activities based on interests
    daily_activities = []
    
    # Add interest-based activities
    for interest in interests[:2]:  # Limit to 2 interests per day
        if interest in activity_templates:
            templates = activity_templates[interest]
            if templates:
                activity = templates[(day_number - 1) % len(templates)].copy()
                daily_activities.append(activity)
    
    # Fill with default activities if needed
    while len(daily_activities) < 3:
        default_activity = default_activities[(len(daily_activities)) % len(default_activities)].copy()
        daily_activities.append(default_activity)
    
    return daily_activities