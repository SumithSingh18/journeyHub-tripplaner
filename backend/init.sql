-- Initialize database with sample data

-- Sample attractions for testing
INSERT INTO attractions (name, description, category, city, country, latitude, longitude, rating, price_level, tags) VALUES
('Eiffel Tower', 'Iconic iron lattice tower and symbol of Paris', 'landmark', 'Paris', 'France', 48.8584, 2.2945, 4.6, 2, '["landmark", "tower", "iconic", "romantic"]'),
('Louvre Museum', 'World''s largest art museum and historic monument', 'museum', 'Paris', 'France', 48.8606, 2.3376, 4.5, 3, '["museum", "art", "history", "culture"]'),
('Notre-Dame Cathedral', 'Medieval Catholic cathedral with Gothic architecture', 'religious', 'Paris', 'France', 48.8530, 2.3499, 4.4, 1, '["cathedral", "gothic", "religious", "architecture"]'),
('Central Park', 'Large public park in Manhattan', 'park', 'New York', 'USA', 40.7829, -73.9654, 4.3, 1, '["park", "nature", "recreation", "urban"]'),
('Times Square', 'Major commercial intersection and tourist destination', 'landmark', 'New York', 'USA', 40.7580, -73.9855, 4.0, 2, '["landmark", "commercial", "entertainment", "lights"]'),
('Statue of Liberty', 'Neoclassical sculpture and symbol of freedom', 'landmark', 'New York', 'USA', 40.6892, -74.0445, 4.5, 2, '["landmark", "statue", "freedom", "historic"]'),
('Tokyo Tower', 'Communications and observation tower', 'landmark', 'Tokyo', 'Japan', 35.6586, 139.7454, 4.1, 2, '["tower", "observation", "landmark", "modern"]'),
('Senso-ji Temple', 'Ancient Buddhist temple', 'religious', 'Tokyo', 'Japan', 35.7148, 139.7967, 4.3, 1, '["temple", "buddhist", "ancient", "spiritual"]'),
('Shibuya Crossing', 'Famous pedestrian scramble crossing', 'landmark', 'Tokyo', 'Japan', 35.6598, 139.7006, 4.2, 1, '["crossing", "urban", "busy", "iconic"]');

-- Sample users (passwords are hashed for 'password123')
INSERT INTO users (email, username, full_name, hashed_password, preferences) VALUES
('demo@tripplanner.com', 'demo_user', 'Demo User', '$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', '{"budget_preference": "medium", "travel_style": "cultural", "interests": ["museums", "landmarks", "food"]}'),
('test@example.com', 'test_user', 'Test User', '$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', '{"budget_preference": "budget", "travel_style": "adventure", "interests": ["nature", "hiking", "photography"]}');