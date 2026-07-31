from sqlalchemy.orm import Session

from app.models.patient import Patient
from app.schemas.patient import PatientCreate


def create_patient(db: Session, patient: PatientCreate):
    new_patient = Patient(
        name=patient.name,
        age=patient.age,
        gender=patient.gender,
        phone=patient.phone,
        email=patient.email,
    )

    db.add(new_patient)
    db.commit()
    db.refresh(new_patient)

    return new_patient


def get_patients(db: Session):
    return db.query(Patient).all()


def get_patient_by_id(db: Session, patient_id: int):
    return db.query(Patient).filter(Patient.id == patient_id).first()


def update_patient(db: Session, patient_id: int, patient: PatientCreate):
    existing_patient = get_patient_by_id(db, patient_id)

    if not existing_patient:
        return None

    existing_patient.name = patient.name
    existing_patient.age = patient.age
    existing_patient.gender = patient.gender
    existing_patient.phone = patient.phone
    existing_patient.email = patient.email

    db.commit()
    db.refresh(existing_patient)

    return existing_patient
def delete_patient(db: Session, patient_id: int):
    patient = get_patient_by_id(db, patient_id)

    if not patient:
        return None

    db.delete(patient)
    db.commit()

    return patient    