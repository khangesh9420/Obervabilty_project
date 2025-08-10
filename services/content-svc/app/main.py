from fastapi import FastAPI, Depends
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import sessionmaker, declarative_base, Session
import os

DATABASE_URL = (
    f"postgresql://{os.getenv('POSTGRES_USER')}:{os.getenv('POSTGRES_PASSWORD')}@"
    f"{os.getenv('POSTGRES_HOST')}/{os.getenv('POSTGRES_DB')}"
)

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()

class Project(Base):
    __tablename__ = 'projects'
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    description = Column(String)
    tech = Column(String)

class Skill(Base):
    __tablename__ = 'skills'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    category = Column(String)

class Experience(Base):
    __tablename__ = 'experience'
    id = Column(Integer, primary_key=True, index=True)
    role = Column(String)
    company = Column(String)
    years = Column(String)

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

@app.get("/projects")
def get_projects(db: Session = Depends(get_db)):
    return db.query(Project).all()

@app.get("/skills")
def get_skills(db: Session = Depends(get_db)):
    return db.query(Skill).all()

@app.get("/experience")
def get_experience(db: Session = Depends(get_db)):
    return db.query(Experience).all()
