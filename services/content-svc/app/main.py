from fastapi import FastAPI, Depends
from sqlalchemy import create_engine, Column, Integer, String, text
from sqlalchemy.orm import sessionmaker, declarative_base, Session
import os

# ---- DB setup ---------------------------------------------------------------
DATABASE_URL = (
    f"postgresql://{os.getenv('POSTGRES_USER')}:{os.getenv('POSTGRES_PASSWORD')}@"
    f"{os.getenv('POSTGRES_HOST')}/{os.getenv('POSTGRES_DB')}"
)

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# ---- Models -----------------------------------------------------------------
class Project(Base):
    __tablename__ = "projects"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    description = Column(String)
    tech = Column(String)

class Skill(Base):
    __tablename__ = "skills"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    category = Column(String)

class Experience(Base):
    __tablename__ = "experience"
    id = Column(Integer, primary_key=True, index=True)
    role = Column(String)
    company = Column(String)
    location = Column(String)
    # The actual table uses start and "end", not a single "dates" column
    start = Column(String)                 # e.g., "Jun 2022"
    end = Column("end", String)            # quoted to map to column named "end"
    highlights = Column(String)

class Achievement(Base):
    __tablename__ = "achievements"
    id = Column(Integer, primary_key=True, index=True)
    description = Column(String)

class Education(Base):
    __tablename__ = "education"
    id = Column(Integer, primary_key=True, index=True)
    degree = Column(String)
    institution = Column(String)
    years = Column(String)

# Create tables if missing and patch legacy schemas
Base.metadata.create_all(bind=engine)
with engine.begin() as conn:
    # Ensure columns exist even if an older seed created a different layout
    conn.execute(text("ALTER TABLE experience ADD COLUMN IF NOT EXISTS location TEXT NOT NULL DEFAULT ''"))
    conn.execute(text("ALTER TABLE experience ADD COLUMN IF NOT EXISTS start TEXT"))
    conn.execute(text('ALTER TABLE experience ADD COLUMN IF NOT EXISTS "end" TEXT'))
    conn.execute(text("ALTER TABLE experience ADD COLUMN IF NOT EXISTS highlights TEXT"))
    # (Optional) keep old "dates" if it exists; we no longer rely on it.

# ---- App & DI ----------------------------------------------------------------
app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ---- Endpoints ---------------------------------------------------------------
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
    rows = db.query(Experience).all()
    # Compose a friendly "dates" field for the frontend while keeping start/end too
    return [
        {
            "id": r.id,
            "role": r.role,
            "company": r.company,
            "location": r.location or "",
            "start": r.start,
            "end": r.end,
            "dates": f"{r.start or ''} – {r.end or 'Present'}",
            "highlights": r.highlights,
        }
        for r in rows
    ]

@app.get("/achievements")
def get_achievements(db: Session = Depends(get_db)):
    return db.query(Achievement).all()

@app.get("/education")
def get_education(db: Session = Depends(get_db)):
    return db.query(Education).all()
