from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
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
    
    # TODO: Implement itinerary generation logic
    # This will be expanded in Week 2-3 with actual AI/recommendation logic
    
    return {"message": "Itinerary generation started", "trip_id": trip_id}