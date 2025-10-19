from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional

from database import get_db
from models import User, Attraction
from schemas import Attraction as AttractionSchema
from auth import get_current_user

router = APIRouter()

@router.get("/attractions", response_model=List[AttractionSchema])
def get_attractions(
    city: str,
    category: Optional[str] = None,
    limit: int = 20,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    query = db.query(Attraction).filter(Attraction.city.ilike(f"%{city}%"))
    
    if category:
        query = query.filter(Attraction.category == category)
    
    attractions = query.limit(limit).all()
    return attractions

@router.get("/attractions/categories")
def get_attraction_categories(
    city: Optional[str] = None,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    query = db.query(Attraction.category).distinct()
    
    if city:
        query = query.filter(Attraction.city.ilike(f"%{city}%"))
    
    categories = [cat[0] for cat in query.all() if cat[0]]
    return {"categories": categories}

@router.post("/attractions/suggest")
def suggest_attractions(
    destination: str,
    interests: List[str],
    budget: Optional[float] = None,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # TODO: Implement AI-powered recommendation logic
    # This will be expanded in Week 4 with actual ML/AI integration
    
    # For now, return basic filtered results
    query = db.query(Attraction).filter(Attraction.city.ilike(f"%{destination}%"))
    
    if budget:
        # Simple budget filtering (1-4 price levels)
        max_price_level = min(4, max(1, int(budget / 50)))
        query = query.filter(Attraction.price_level <= max_price_level)
    
    attractions = query.limit(10).all()
    
    return {
        "destination": destination,
        "interests": interests,
        "suggested_attractions": attractions,
        "message": "Basic suggestions - AI enhancement coming in Week 4"
    }