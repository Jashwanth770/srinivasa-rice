import os
from sqlalchemy import text
from database import engine

def run_migration():
    with engine.connect() as conn:
        try:
            conn.execute(text("ALTER TABLE rice_prices ADD COLUMN moisture VARCHAR DEFAULT '12-14% Max'"))
            conn.commit()
            print("Added moisture column")
        except Exception as e:
            print("moisture column may already exist:", e)
            
        try:
            conn.execute(text("ALTER TABLE rice_prices ADD COLUMN processing VARCHAR DEFAULT '100% Sortexed'"))
            conn.commit()
            print("Added processing column")
        except Exception as e:
            print("processing column may already exist:", e)

if __name__ == "__main__":
    run_migration()
