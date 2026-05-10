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
    moisture = Column(String, default="12-14% Max", nullable=True)
    processing = Column(String, default="100% Sortexed", nullable=True)

class Lead(Base):
    __tablename__ = "leads"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    company = Column(String, nullable=False)
    whatsapp = Column(String, nullable=False)
    inquiry_text = Column(String, nullable=False)
    created_at = Column(String, nullable=True)
