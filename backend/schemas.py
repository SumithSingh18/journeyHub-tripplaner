from pydantic import BaseModel, EmailStr
from typing import Optional, List, Dict, Any
from datetime import datetime

# User schemas
class UserBase(BaseModel):
    email: EmailStr
    username: str
    full_name: Optional[str] = None

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    preferences: Optional[Dict[str, Any]] = None

class User(UserBase):
    id: int
    is_active: bool
    preferences: Dict[str, Any]
    created_at: datetime
    
    class Config:
        from_attributes = True

# Trip schemas
class TripBase(BaseModel):
    title: str
    description: Optional[str] = None
    destination: str
    start_date: datetime
    end_date: datetime
    budget: Optional[float] = None
    interests: List[str] = []

class TripCreate(TripBase):
    pass

class TripUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    budget: Optional[float] = None
    interests: Optional[List[str]] = None
    status: Optional[str] = None

class Trip(TripBase):
    id: int
    status: str
    is_public: bool
    share_token: Optional[str] = None
    owner_id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

# Itinerary schemas
class ItineraryDayBase(BaseModel):
    day_number: int
    date: datetime
    title: Optional[str] = None
    description: Optional[str] = None
    activities: List[Dict[str, Any]] = []
    accommodation: Optional[Dict[str, Any]] = None
    transport: Optional[Dict[str, Any]] = None
    estimated_cost: Optional[float] = None

class ItineraryDayCreate(ItineraryDayBase):
    trip_id: int

class ItineraryDay(ItineraryDayBase):
    id: int
    trip_id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

# Attraction schemas
class AttractionBase(BaseModel):
    name: str
    description: Optional[str] = None
    category: Optional[str] = None
    city: str
    country: str
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    rating: Optional[float] = None
    price_level: Optional[int] = None
    tags: List[str] = []

class AttractionCreate(AttractionBase):
    pass

class Attraction(AttractionBase):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

# Authentication schemas
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None