from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.dependencies.database import get_db
from app.schemas.audiogram import (
    AudiogramCreate,
    AudiogramResponse,
)
from app.services.audiogram_service import (
    create_audiogram,
    get_audiograms,
)

from app.schemas.audiogram import (
    AudiogramCreate,
    AudiogramResponse,
    AudiogramReportResponse,
)

from fastapi import HTTPException
from app.services.audiogram_service import delete_audiogram

router = APIRouter(
    prefix="/audiograms",
    tags=["Audiograms"],
)

@router.get("/", response_model=List[AudiogramReportResponse])
def list_audiograms(db: Session = Depends(get_db)):
    return get_audiograms(db)


@router.post("/", response_model=AudiogramResponse)
def add_audiogram(
    audiogram: AudiogramCreate,
    db: Session = Depends(get_db),
):
    return create_audiogram(db, audiogram)


@router.delete("/{audiogram_id}")
def remove_audiogram(
    audiogram_id: int,
    db: Session = Depends(get_db),
):
    success = delete_audiogram(db, audiogram_id)

    if not success:
        raise HTTPException(
            status_code=404,
            detail="Report not found"
        )

    return {"message": "Report deleted successfully"}
    