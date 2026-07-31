from sqlalchemy.orm import Session

from app.models.patient import Patient
from app.models.audiogram import Audiogram
from app.models.report import Report

from app.services.analysis_service import analyze_audiogram
from app.ml.report_generator import generate_pdf_report


def generate_report(db: Session, audiogram_id: int):
    """
    Generate AI Clinical Report and save report statistics.
    """

    audiogram = (
        db.query(Audiogram)
        .filter(Audiogram.id == audiogram_id)
        .first()
    )

    if audiogram is None:
        return None

    patient = (
        db.query(Patient)
        .filter(Patient.id == audiogram.patient_id)
        .first()
    )

    if patient is None:
        return None

    analysis = analyze_audiogram(audiogram)

    # Prevent duplicate report entries
    existing = (
        db.query(Report)
        .filter(Report.audiogram_id == audiogram.id)
        .first()
    )

    if existing is None:
        report = Report(
            patient_id=patient.id,
            audiogram_id=audiogram.id,
            diagnosis=analysis["validated_prediction"],
            confidence=analysis["ai_confidence"],
            right_pta=analysis["right_pta"],
            left_pta=analysis["left_pta"],
            disability=analysis["disability_percentage"],
        )

        db.add(report)
        db.commit()

    pdf_path = generate_pdf_report(
        patient,
        audiogram,
        analysis,
    )

    return pdf_path