from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pathlib import Path
from fastapi.middleware.cors import CORSMiddleware
from app.api.audiogram_routes import router as audiogram_router
from app.api.patient_routes import router as patient_router
from app.database import Base, engine
from app.api.analysis_routes import router as analysis_router
from app.api.report_routes import router as report_router
from app.api.image_analysis import router as image_analysis_router
from app.api.dashboard import router as dashboard_router
from app.api.analytics_routes import router as analytics_router


# Import models so SQLAlchemy knows about them
from app.models import patient  # noqa: F401
from app.models import audiogram
from app.models import report  # noqa: F401

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="HearSense AI API",
    description="AI Clinical Decision Support Platform for Pure Tone Audiometry",
    version="1.0.0",
)

# ✅ Register Patient Routes
app.include_router(patient_router)
app.include_router(audiogram_router)
app.include_router(analysis_router)
app.include_router(report_router)
app.include_router(dashboard_router)
app.include_router(image_analysis_router)
app.include_router(analytics_router)

BASE_DIR = Path(__file__).resolve().parent.parent

UPLOAD_DIR = BASE_DIR / "uploads"

UPLOAD_DIR.mkdir(exist_ok=True)

app.mount(
    "/uploads",
    StaticFiles(directory=str(UPLOAD_DIR)),
    name="uploads"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://hearsenseai.vercel.app",
        "https://www.hearsenseai.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "message": "Welcome to HearSense AI API",
        "status": "running",
        "version": "1.0.0",
    }


@app.get("/health")
def health():
    return {
        "status": "healthy",
        "backend": "FastAPI",
        "service": "HearSense AI",
    }
