from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    # Database
    database_url: str = "postgresql://tripplanner:tripplanner_dev@localhost:5432/tripplanner"
    
    # Redis
    redis_url: str = "redis://localhost:6379"
    
    # JWT
    secret_key: str = "your-secret-key-change-in-production"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    
    # External APIs
    openai_api_key: Optional[str] = None
    google_maps_api_key: Optional[str] = None
    
    # App settings
    app_name: str = "TripPlanner"
    debug: bool = True
    
    class Config:
        env_file = ".env"

settings = Settings()