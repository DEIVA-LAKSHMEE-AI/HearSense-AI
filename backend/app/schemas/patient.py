from pydantic import BaseModel, EmailStr
from typing import Optional


class PatientCreate(BaseModel):
    name: str
    age: int
    gender: str
    phone: str
    email: Optional[EmailStr] = None


class PatientResponse(BaseModel):
    id: int
    name: str
    age: int
    gender: str
    phone: str
    email: Optional[EmailStr] = None

    class Config:
        from_attributes = True