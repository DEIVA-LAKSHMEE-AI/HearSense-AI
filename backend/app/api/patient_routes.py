from typing import List


from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.dependencies.database import get_db
from app.schemas.patient import PatientCreate, PatientResponse
from app.services.patient_service import (
    create_patient,
    get_patients,
    update_patient,
    delete_patient,
)

router = APIRouter(
    prefix="/patients",
    tags=["Patients"],
)


@router.get("/", response_model=List[PatientResponse])
def list_patients(db: Session = Depends(get_db)):
    return get_patients(db)


@router.post("/", response_model=PatientResponse)
def add_patient(
    patient: PatientCreate,
    db: Session = Depends(get_db),
):
    return create_patient(db, patient)


@router.put("/{patient_id}", response_model=PatientResponse)
def edit_patient(
    patient_id: int,
    patient: PatientCreate,
    db: Session = Depends(get_db),
):
    updated = update_patient(db, patient_id, patient)

    if not updated:
        raise HTTPException(status_code=404, detail="Patient not found")

    return updated
@router.delete("/{patient_id}")
def remove_patient(
    patient_id: int,
    db: Session = Depends(get_db),
):
    deleted = delete_patient(db, patient_id)

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Patient not found",
        )

    return {"message": "Patient deleted successfully"}    