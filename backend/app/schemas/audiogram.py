from datetime import date
from pydantic import BaseModel


class AudiogramBase(BaseModel):
    patient_id: int
    test_date: date

    right_250: float
    right_500: float
    right_1000: float
    right_2000: float
    right_4000: float
    right_8000: float

    left_250: float
    left_500: float
    left_1000: float
    left_2000: float
    left_4000: float
    left_8000: float


class AudiogramCreate(AudiogramBase):
    pass


class AudiogramResponse(AudiogramBase):
    id: int

    class Config:
        from_attributes = True

class AudiogramReportResponse(BaseModel):
    id: int
    patient_id: int
    patient_name: str
    test_date: date

    class Config:
        from_attributes = True