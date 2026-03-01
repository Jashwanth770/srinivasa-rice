import datetime
import os
import jwt
import asyncio
from fastapi import FastAPI, HTTPException, Depends, status, File, UploadFile, Form
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from contextlib import asynccontextmanager
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from typing import Optional
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from sqlalchemy import text

from database import engine, Base, get_db
from models import RicePrice

SECRET_KEY = os.getenv("SECRET_KEY", "super_secret_key_change_in_production")
ALGORITHM = "HS256"

# Security scheme
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/admin/login")

def init_db():
    Base.metadata.create_all(bind=engine)
    
    # Migrate DB to add new columns if they don't exist
    from database import SessionLocal
    db = SessionLocal()
    
    try:
        try:
            db.execute(text("ALTER TABLE rice_prices ADD COLUMN moisture VARCHAR DEFAULT '12-14% Max'"))
            db.commit()
        except Exception:
            db.rollback()
            
        try:
            db.execute(text("ALTER TABLE rice_prices ADD COLUMN processing VARCHAR DEFAULT '100% Sortexed'"))
            db.commit()
        except Exception:
            db.rollback()

        if db.query(RicePrice).count() == 0:
            seed_data = [
                ("Sona Masuri Steam", 850.0, 840.0, 1.19, "up"),
                ("Sona Masuri Raw", 830.0, 830.0, 0.0, "neutral"),
                ("Sona Masuri Parboiled", 800.0, 810.0, -1.23, "down"),
                ("Swarna", 650.0, 645.0, 0.78, "up"),
                ("IR64 5% Broken", 550.0, 560.0, -1.79, "down"),
                ("IR64 25% Broken", 510.0, 510.0, 0.0, "neutral"),
                ("BPT 5204", 720.0, 715.0, 0.70, "up"),
                ("1121 Basmati Sella", 1200.0, 1180.0, 1.69, "up"),
                ("1121 Basmati Steam", 1250.0, 1260.0, -0.79, "down"),
                ("1509 Basmati", 1100.0, 1100.0, 0.0, "neutral"),
            ]
            
            current_time = datetime.datetime.now().isoformat()
            
            for item in seed_data:
                new_rice = RicePrice(
                    variety_name=item[0],
                    current_price_mt=item[1],
                    previous_price_mt=item[2],
                    percentage_change=item[3],
                    trend=item[4],
                    last_updated=current_time
                )
                db.add(new_rice)
                
            db.commit()
    finally:
        db.close()

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Run database migration in a background thread so Uvicorn can bind to PORT instantly
    asyncio.create_task(asyncio.to_thread(init_db))
    yield
    # Run at shutdown

app = FastAPI(title="Rice Exporters B2B API", lifespan=lifespan)

# Configure Static file serving for uploads
os.makedirs("uploads", exist_ok=True)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# Configure CORS for local React development and Production
origins = [
    "http://localhost:5173", # Local dev default
    "https://srinivasa-rice.vercel.app", # Production Vercel URL
]

# Add production URL if provided via environment
frontend_url = os.getenv("FRONTEND_URL")
if frontend_url:
    origins.append(frontend_url)

app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=os.getenv("FRONTEND_URL_REGEX", r"https://.*\.vercel\.app|https://.*\.com|https://.*\.in|https://.*\.net|https://.*\.org|http://localhost:5173"),
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Dependencies & Auth ---
async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None or username != "manocha1973@gmail.com":
            raise credentials_exception
    except jwt.PyJWTError:
        raise credentials_exception
    return username

# --- Models ---
class ContactForm(BaseModel):
    name: str
    company: str
    whatsapp: str
    inquiry: str

class ProductAdd(BaseModel):
    name: str
    initial_price: float

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    new_price_mt: float
    moisture: Optional[str] = None
    processing: Optional[str] = None

# --- Routes ---

@app.post("/api/admin/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    username = form_data.username.strip().lower()
    password = form_data.password.strip()
    
    if username == "manocha1973@gmail.com" and password in ["Manocha", "Manocha"]:
        access_token = jwt.encode({"sub": "manocha1973@gmail.com"}, SECRET_KEY, algorithm=ALGORITHM)
        return {"access_token": access_token, "token_type": "bearer"}
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Incorrect username or password",
        headers={"WWW-Authenticate": "Bearer"},
    )

@app.get("/api/products")
async def get_products(db: Session = Depends(get_db)):
    """Alias for getting all products"""
    products = db.query(RicePrice).order_by(RicePrice.id.asc()).all()
    return products

# Keep /api/prices backward compatibility for now
@app.get("/api/prices")
async def get_prices(db: Session = Depends(get_db)):
    return await get_products(db)

@app.post("/api/products/add")
async def add_product(
    name: str = Form(...),
    initial_price: float = Form(...),
    moisture: str = Form("12-14% Max"),
    processing: str = Form("100% Sortexed"),
    image: Optional[UploadFile] = File(None),
    current_user: str = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    current_time = datetime.datetime.now().isoformat()
    image_url = None
    
    if image:
        file_extension = os.path.splitext(image.filename)[1]
        timestamp = datetime.datetime.now().strftime("%Y%md%H%M%S")
        safe_name = "".join([c if c.isalnum() else "_" for c in name]).lower()
        new_filename = f"{safe_name}_{timestamp}{file_extension}"
        file_path = os.path.join("uploads", new_filename)
        
        with open(file_path, "wb") as buffer:
            buffer.write(await image.read())
        image_url = f"uploads/{new_filename}"

    try:
        new_rice = RicePrice(
            variety_name=name,
            current_price_mt=initial_price,
            previous_price_mt=initial_price,
            percentage_change=0.0,
            trend="neutral",
            last_updated=current_time,
            image_url=image_url,
            moisture=moisture,
            processing=processing
        )
        db.add(new_rice)
        db.commit()
        db.refresh(new_rice)
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="Variety already exists")
    
    return new_rice

@app.post("/api/products/{id}/image")
async def upload_product_image(
    id: int, 
    image: UploadFile = File(...), 
    current_user: str = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    row = db.query(RicePrice).filter(RicePrice.id == id).first()
    if not row:
        raise HTTPException(status_code=404, detail="Variety not found")

    file_extension = os.path.splitext(image.filename)[1]
    timestamp = datetime.datetime.now().strftime("%Y%md%H%M%S")
    safe_name = "".join([c if c.isalnum() else "_" for c in row.variety_name]).lower()
    new_filename = f"{safe_name}_{timestamp}{file_extension}"
    file_path = os.path.join("uploads", new_filename)
    
    with open(file_path, "wb") as buffer:
        buffer.write(await image.read())
    
    image_url = f"uploads/{new_filename}"
    
    # Optionally delete old image if exists
    old_image_url = row.image_url
    if old_image_url and os.path.exists(old_image_url):
        try:
            os.remove(old_image_url)
        except Exception:
            pass

    row.image_url = image_url
    db.commit()
    db.refresh(row)
    
    return row

@app.put("/api/products/update/{id}")
async def update_product(
    id: int, 
    product: ProductUpdate, 
    current_user: str = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    row = db.query(RicePrice).filter(RicePrice.id == id).first()
    
    if not row:
        raise HTTPException(status_code=404, detail="Variety not found")
        
    previous_price = row.current_price_mt
    current_price = product.new_price_mt
    variety_name = product.name if product.name else row.variety_name
    
    if previous_price > 0:
        percentage_change = ((current_price - previous_price) / previous_price) * 100
    else:
        percentage_change = 0.0
        
    if current_price > previous_price:
        trend = "up"
    elif current_price < previous_price:
        trend = "down"
    else:
        trend = "neutral"
        
    current_time = datetime.datetime.now().isoformat()
    
    try:
        row.variety_name = variety_name
        row.current_price_mt = current_price
        row.previous_price_mt = previous_price
        row.percentage_change = round(percentage_change, 2)
        row.trend = trend
        row.last_updated = current_time
        
        if product.moisture is not None:
            row.moisture = product.moisture
        if product.processing is not None:
            row.processing = product.processing
            
        
        db.commit()
        db.refresh(row)
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="Variety name already exists")
    
    return row

@app.delete("/api/products/delete/{id}")
async def delete_product(
    id: int, 
    current_user: str = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    row = db.query(RicePrice).filter(RicePrice.id == id).first()
    if not row:
        raise HTTPException(status_code=404, detail="Variety not found")
        
    db.delete(row)
    db.commit()
    return {"message": "Variety deleted successfully"}


@app.post("/api/contact")
async def handle_contact(form_data: ContactForm):
    print(f"Received inquiry from {form_data.name} at {form_data.company}")
    print(f"WhatsApp: {form_data.whatsapp}")
    print(f"Details: {form_data.inquiry}")
    return {"message": "Inquiry received successfully. Our team will contact you shortly via WhatsApp."}

@app.get("/")
async def root():
    return {"message": "B2B Website API is running"}
if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=False)
