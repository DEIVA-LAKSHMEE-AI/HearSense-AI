from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.dependencies.database import get_db
from app.models.audiogram import Audiogram
from app.services.analysis_service import analyze_audiogram as analyze_service

router = APIRouter(
    prefix="/analysis",
    tags=["AI Analysis"],
)


@router.get("/{audiogram_id}")
def analyze_audiogram(
    audiogram_id: int,
    db: Session = Depends(get_db),
):
    audiogram = (
        db.query(Audiogram)
        .filter(Audiogram.id == audiogram_id)
        .first()
    )

    if not audiogram:
        raise HTTPException(
            status_code=404,
            detail="Audiogram not found",
        )

    result = analyze_service(audiogram)

    return {
        "patient_id": audiogram.patient_id,
        "audiogram_id": audiogram.id,
        **result,
    }