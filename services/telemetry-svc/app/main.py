from fastapi import FastAPI, Depends
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String, DateTime
from sqlalchemy.orm import sessionmaker, declarative_base, Session
from datetime import datetime
import os

DATABASE_URL = (
    f"postgresql://{os.getenv('POSTGRES_USER')}:{os.getenv('POSTGRES_PASSWORD')}@"
    f"{os.getenv('POSTGRES_HOST')}/{os.getenv('POSTGRES_DB')}"
)

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()

class Event(Base):
    __tablename__ = 'events'
    id = Column(Integer, primary_key=True, index=True)
    path = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

class PageView(BaseModel):
    path: str

app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/healthz")
def healthz():
    return {"status": "ok"}

@app.post("/pageview")
def add_pageview(pv: PageView, db: Session = Depends(get_db)):
    event = Event(path=pv.path)
    db.add(event)
    db.commit()
    return {"status": "logged"}

@app.get("/events")
def get_events(db: Session = Depends(get_db)):
    return db.query(Event).all()
