from sqlalchemy import Column, Integer, String, Float
from database import Base

class RicePrice(Base):
    __tablename__ = "rice_prices"

    id = Column(Integer, primary_key=True, index=True)
    variety_name = Column(String, unique=True, index=True, nullable=False)
    current_price_mt = Column(Float, nullable=False)
    previous_price_mt = Column(Float, nullable=True)
    percentage_change = Column(Float, nullable=True)
    trend = Column(String, nullable=True)
    last_updated = Column(String, nullable=True)
    image_url = Column(String, nullable=True)
