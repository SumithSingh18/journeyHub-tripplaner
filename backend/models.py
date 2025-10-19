from sqlalchemy import Column, Integer, String, DateTime, Text, ForeignKey, Boolean, Float, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from database import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    username = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String)
    is_active = Column(Boolean, default=True)
    preferences = Column(JSON, default={})
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    trips = relationship("Trip", back_populates="owner")

class Trip(Base):
    __tablename__ = "trips"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text)
    destination = Column(String, nullable=False)
    start_date = Column(DateTime, nullable=False)
    end_date = Column(DateTime, nullable=False)
    budget = Column(Float)
    interests = Column(JSON, default=[])
    status = Column(String, default="draft")  # draft, planning, confirmed, completed
    is_public = Column(Boolean, default=False)
    share_token = Column(String, unique=True, index=True)
    owner_id = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    owner = relationship("User", back_populates="trips")
    itinerary_days = relationship("ItineraryDay", back_populates="trip")

class ItineraryDay(Base):
    __tablename__ = "itinerary_days"
    
    id = Column(Integer, primary_key=True, index=True)
    trip_id = Column(Integer, ForeignKey("trips.id"))
    day_number = Column(Integer, nullable=False)
    date = Column(DateTime, nullable=False)
    title = Column(String)
    description = Column(Text)
    activities = Column(JSON, default=[])
    accommodation = Column(JSON)
    transport = Column(JSON)
    estimated_cost = Column(Float)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    trip = relationship("Trip", back_populates="itinerary_days")

class Attraction(Base):
    __tablename__ = "attractions"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(Text)
    category = Column(String)  # museum, restaurant, landmark, etc.
    city = Column(String, nullable=False)
    country = Column(String, nullable=False)
    latitude = Column(Float)
    longitude = Column(Float)
    rating = Column(Float)
    price_level = Column(Integer)  # 1-4 scale
    opening_hours = Column(JSON)
    tags = Column(JSON, default=[])
    external_id = Column(String)  # For API references
    created_at = Column(DateTime(timezone=True), server_default=func.now())