from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from app.dependencies.database import get_db
from app.services.report_service import generate_report

router = APIRouter(
    prefix="/report",
    tags=["Clinical Report"],
)


@router.get("/{audiogram_id}")
def download_report(
    audiogram_id: int,
    db: Session = Depends(get_db),
):

    pdf_path = generate_report(db, audiogram_id)

    if pdf_path is None:
        raise HTTPException(
            status_code=404,
            detail="Audiogram not found",
        )

    return FileResponse(
        pdf_path,
        media_type="application/pdf",
        filename="HearSense_AI_Report.pdf",
    )