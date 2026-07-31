from sqlalchemy.orm import Session

from app.models.audiogram import Audiogram
from app.schemas.audiogram import AudiogramCreate
from app.models.patient import Patient


def create_audiogram(db: Session, audiogram: AudiogramCreate):
    new_audiogram = Audiogram(
        patient_id=audiogram.patient_id,
        test_date=audiogram.test_date,

        right_250=audiogram.right_250,
        right_500=audiogram.right_500,
        right_1000=audiogram.right_1000,
        right_2000=audiogram.right_2000,
        right_4000=audiogram.right_4000,
        right_8000=audiogram.right_8000,

        left_250=audiogram.left_250,
        left_500=audiogram.left_500,
        left_1000=audiogram.left_1000,
        left_2000=audiogram.left_2000,
        left_4000=audiogram.left_4000,
        left_8000=audiogram.left_8000,
    )

    db.add(new_audiogram)
    db.commit()
    db.refresh(new_audiogram)

    return new_audiogram


def get_audiograms(db: Session):
    results = (
        db.query(Audiogram, Patient)
        .join(Patient, Audiogram.patient_id == Patient.id)
        .all()
    )

    reports = []

    for audiogram, patient in results:
        reports.append({
            "id": audiogram.id,
            "patient_id": patient.id,
            "patient_name": patient.name,
            "test_date": audiogram.test_date
        })

    return reports


def get_audiogram_by_id(db: Session, audiogram_id: int):
    return (
        db.query(Audiogram)
        .filter(Audiogram.id == audiogram_id)
        .first()
    )

def delete_audiogram(db: Session, audiogram_id: int):
    audiogram = (
        db.query(Audiogram)
        .filter(Audiogram.id == audiogram_id)
        .first()
    )

    if audiogram is None:
        return False

    db.delete(audiogram)
    db.commit()

    return True