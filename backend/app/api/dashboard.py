from fastapi import APIRouter
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models.patient import Patient
from app.models.audiogram import Audiogram

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/summary")
def get_dashboard_summary():

    db: Session = SessionLocal()

    try:

        total_patients = db.query(Patient).count()

        total_audiograms = db.query(Audiogram).count()

        latest_audiogram = (
            db.query(Audiogram)
            .order_by(Audiogram.created_at.desc())
            .first()
        )

        return {
            "patients": total_patients,
            "audiograms": total_audiograms,
            "latest_audiogram_id":
                latest_audiogram.id if latest_audiogram else None,
        }

    finally:
        db.close()