from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database import SessionLocal
from app.models.patient import Patient
from app.models.report import Report

router = APIRouter(
    prefix="/analytics",
    tags=["Analytics"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/")
def analytics_dashboard(db: Session = Depends(get_db)):

    # -------------------------
    # Cards
    # -------------------------

    total_patients = db.query(Patient).count()

    reports_generated = db.query(Report).count()

    avg_right = db.query(func.avg(Report.right_pta)).scalar() or 0

    avg_left = db.query(func.avg(Report.left_pta)).scalar() or 0

    average_pta = round((avg_right + avg_left) / 2, 2)

    average_ai_confidence = (
        db.query(func.avg(Report.confidence)).scalar() or 0
    )

    # -------------------------
    # Hearing Loss Distribution
    # -------------------------

    distribution = (
        db.query(
            Report.diagnosis,
            func.count(Report.id)
        )
        .group_by(Report.diagnosis)
        .all()
    )

    hearing_loss_distribution = [
        {
            "name": diagnosis,
            "value": count
        }
        for diagnosis, count in distribution
    ]

    # -------------------------
    # Age Groups
    # -------------------------

    patients = db.query(Patient).all()

    age_groups = {
        "0-18": 0,
        "19-35": 0,
        "36-50": 0,
        "51-65": 0,
        "65+": 0,
    }

    for patient in patients:

        if patient.age is None:
            continue

        if patient.age <= 18:
            age_groups["0-18"] += 1

        elif patient.age <= 35:
            age_groups["19-35"] += 1

        elif patient.age <= 50:
            age_groups["36-50"] += 1

        elif patient.age <= 65:
            age_groups["51-65"] += 1

        else:
            age_groups["65+"] += 1

    age_chart = [
        {
            "group": key,
            "count": value
        }
        for key, value in age_groups.items()
    ]

    # -------------------------
    # Recent Reports
    # -------------------------

    recent_reports = (
        db.query(Report)
        .order_by(Report.created_at.desc())
        .limit(5)
        .all()
    )

    recent = []

    for report in recent_reports:

        patient = (
            db.query(Patient)
            .filter(Patient.id == report.patient_id)
            .first()
        )

        recent.append(
            {
                "patient": patient.name if patient else "Unknown",
                "diagnosis": report.diagnosis,
                "confidence": round(report.confidence, 2),
            }
        )

    # -------------------------
    # Response
    # -------------------------

    return {

        "summary": {
            "patientsAnalyzed": reports_generated,
            "reportsGenerated": reports_generated,
            "averageAIConfidence": round(
                average_ai_confidence,
                2
            ),
        },

        "cards": {
            "totalPatients": total_patients,
            "reportsGenerated": reports_generated,
            "averagePTA": average_pta,
            "aiAccuracy": round(
                average_ai_confidence,
                2
            ),
        },

        "distribution": hearing_loss_distribution,

        "ageGroups": age_chart,

        "recentReports": recent,
    }